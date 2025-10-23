import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '@/types/chat';
import { trpcClient } from '@/lib/trpc';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  uvIndex?: number;
  airQuality?: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  suggestedQuestions: string[];
  weatherData: WeatherData | null;
  addMessage: (text: string, isUser: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
  setSuggestedQuestions: (questions: string[]) => void;
  setWeatherData: (weather: WeatherData | null) => void;
  getWeatherBasedRecommendations: (weather: WeatherData, location?: any) => string;
}

const STORAGE_KEY = 'women-health-chat-messages';

async function tryPersistToBackend(message: Message) {
  try {
    await trpcClient.chats.add.mutate({ message });
  } catch (e) {
    console.log('chats.add failed (likely unauthenticated)', e);
  }
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  suggestedQuestions: [],
  weatherData: null,

  addMessage: (text, isUser) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: Date.now(),
    };

    set((state) => {
      const updatedMessages = [...state.messages, newMessage];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
      return { messages: updatedMessages };
    });

    void tryPersistToBackend(newMessage);
  },

  sendMessage: async (text) => {
    get().addMessage(text, true);
    set({ isLoading: true });
    
    try {
      const isLocationQuery = text.toLowerCase().includes('clinic') || 
                             text.toLowerCase().includes('doctor') || 
                             text.toLowerCase().includes('provider') ||
                             text.toLowerCase().includes('near me') ||
                             text.toLowerCase().includes('find') ||
                             text.toLowerCase().includes('recommend');
      
      const isWeatherQuery = text.toLowerCase().includes('weather') ||
                            text.toLowerCase().includes('temperature') ||
                            text.toLowerCase().includes('climate') ||
                            text.toLowerCase().includes('seasonal') ||
                            text.toLowerCase().includes('cold') ||
                            text.toLowerCase().includes('hot') ||
                            text.toLowerCase().includes('humid') ||
                            text.toLowerCase().includes('dry');

      let systemPrompt = 'You are a helpful women\'s health assistant. Provide accurate, supportive information about women\'s health topics including nutrition, puberty, reproductive health, and mental wellbeing. Keep responses concise, informative, and empathetic. Use a friendly, warm tone like you\'re talking to a close friend. IMPORTANT: Never use hashtags (#), dashes (-) for lists, or asterisks (*) for emphasis. Instead, use circular bullet points (•) or cute emojis for lists, and use natural language for emphasis. Format your responses to be visually appealing with proper spacing and friendly language. If you don\'t know something or if it\'s a medical emergency, advise consulting a healthcare professional.';
      
      const { weatherData } = get();
      if (isWeatherQuery && weatherData) {
        const weatherRecommendations = get().getWeatherBasedRecommendations(weatherData);
        systemPrompt += ` Current weather context: ${weatherRecommendations}`;
      }

      if (isLocationQuery) {
        systemPrompt += ' If the user is asking for healthcare provider recommendations or clinics, provide general guidance on finding healthcare providers and suggest they use the healthcare resources section in the app. You can mention resources like Planned Parenthood, telehealth platforms like Maven Clinic or Nurx, and suggest using provider directories from ACOG (American College of Obstetricians and Gynecologists). Always recommend they consult with their primary care provider or use their insurance provider directory for local options. For local health events and resources, suggest checking community health centers, local hospitals, women\'s health clinics, and public health departments.';
      }

      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: text },
          ],
        }),
      });
      
      const data = await response.json();
      
      let cleanedResponse = String(data.completion ?? '')
        .replace(/#{1,6}\s*/g, '')
        .replace(/^\s*[-*]\s+/gm, '• ')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .trim();
      
      get().addMessage(cleanedResponse, false);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      get().addMessage('Sorry, I encountered an error. Please try again later.', false);
    } finally {
      set({ isLoading: false });
    }
  },

  clearMessages: () => {
    set({ messages: [], suggestedQuestions: [] });
    AsyncStorage.removeItem(STORAGE_KEY);
  },

  setSuggestedQuestions: (questions) => {
    set({ suggestedQuestions: questions });
  },

  setWeatherData: (weather) => {
    set({ weatherData: weather });
  },

  getWeatherBasedRecommendations: (weather: WeatherData, location?: any) => {
    let recommendations = '';
    
    if (weather.temperature > 85) {
      recommendations += 'Hot weather detected. Stay hydrated, wear light clothing, and avoid intense outdoor exercise during peak hours. ';
    } else if (weather.temperature < 40) {
      recommendations += 'Cold weather detected. Keep warm, maintain vitamin D levels, and be mindful of seasonal mood changes. ';
    }
    
    if (weather.humidity > 70) {
      recommendations += 'High humidity may affect skin and hair health. Use lightweight moisturizers and consider anti-frizz hair products. ';
    } else if (weather.humidity < 30) {
      recommendations += 'Low humidity can cause dry skin and respiratory issues. Use a humidifier and apply extra moisturizer. ';
    }
    
    if (weather.uvIndex && weather.uvIndex > 6) {
      recommendations += 'High UV index detected. Use broad-spectrum SPF 30+ sunscreen and wear protective clothing. ';
    }
    
    if (weather.condition.toLowerCase().includes('rain') || weather.condition.toLowerCase().includes('storm')) {
      recommendations += 'Rainy weather may affect mood and joint pain. Consider indoor exercises and mood-boosting activities. ';
    }
    
    return recommendations;
  },
}));

const generateSuggestedQuestions = (userQuestion: string, aiResponse: string): string[] => {
  const lowerUserQuestion = userQuestion.toLowerCase();
  const questionSuggestions: { [key: string]: string[] } = {
    nutrition: [
      "What foods should I avoid during pregnancy?",
      "How can I get enough iron in my diet?",
      "What are the best supplements for women?",
      "How does nutrition affect my menstrual cycle?"
    ],
    pregnancy: [
      "What exercises are safe during pregnancy?",
      "How much weight should I gain during pregnancy?",
      "What are early signs of pregnancy?",
      "How can I manage morning sickness?"
    ],
    menstrual: [
      "How can I track my menstrual cycle?",
      "What causes irregular periods?",
      "How can I reduce menstrual cramps?",
      "When should I see a doctor about my period?"
    ],
    mental: [
      "How can I manage stress better?",
      "What are signs of postpartum depression?",
      "How does exercise affect mental health?",
      "What relaxation techniques work best?"
    ],
    reproductive: [
      "What birth control options are available?",
      "How can I improve my fertility?",
      "What are symptoms of PCOS?",
      "When should I get a Pap smear?"
    ],
    fitness: [
      "What's the best workout routine for women?",
      "How often should I exercise?",
      "What are good exercises for core strength?",
      "How can I stay motivated to exercise?"
    ],
    skin: [
      "What skincare routine is best for my age?",
      "How can I prevent acne breakouts?",
      "What ingredients should I avoid in skincare?",
      "How important is sunscreen daily?"
    ],
    sleep: [
      "How many hours of sleep do I need?",
      "What can help me fall asleep faster?",
      "How does sleep affect my hormones?",
      "What's causing my insomnia?"
    ],
    weather: [
      "How does hot weather affect my menstrual cycle?",
      "What skincare routine is best for humid weather?",
      "How can I stay hydrated in hot weather?",
      "What exercises are safe in cold weather?"
    ],
    heart: [
      "What are heart disease risk factors for women?",
      "How can I lower my blood pressure naturally?",
      "What heart-healthy foods should I eat?",
      "How does menopause affect heart health?"
    ]
  };
  
  let relevantQuestions: string[] = [];
  
  if (lowerUserQuestion.includes('nutrition') || lowerUserQuestion.includes('diet') || lowerUserQuestion.includes('food') || lowerUserQuestion.includes('vitamin')) {
    relevantQuestions = questionSuggestions.nutrition;
  } else if (lowerUserQuestion.includes('pregnant') || lowerUserQuestion.includes('pregnancy') || lowerUserQuestion.includes('expecting')) {
    relevantQuestions = questionSuggestions.pregnancy;
  } else if (lowerUserQuestion.includes('period') || lowerUserQuestion.includes('menstrual') || lowerUserQuestion.includes('cycle') || lowerUserQuestion.includes('pms')) {
    relevantQuestions = questionSuggestions.menstrual;
  } else if (lowerUserQuestion.includes('stress') || lowerUserQuestion.includes('anxiety') || lowerUserQuestion.includes('depression') || lowerUserQuestion.includes('mental')) {
    relevantQuestions = questionSuggestions.mental;
  } else if (lowerUserQuestion.includes('birth control') || lowerUserQuestion.includes('fertility') || lowerUserQuestion.includes('pcos') || lowerUserQuestion.includes('reproductive')) {
    relevantQuestions = questionSuggestions.reproductive;
  } else if (lowerUserQuestion.includes('exercise') || lowerUserQuestion.includes('workout') || lowerUserQuestion.includes('fitness') || lowerUserQuestion.includes('gym')) {
    relevantQuestions = questionSuggestions.fitness;
  } else if (lowerUserQuestion.includes('skin') || lowerUserQuestion.includes('acne') || lowerUserQuestion.includes('skincare') || lowerUserQuestion.includes('beauty')) {
    relevantQuestions = questionSuggestions.skin;
  } else if (lowerUserQuestion.includes('sleep') || lowerUserQuestion.includes('insomnia') || lowerUserQuestion.includes('tired') || lowerUserQuestion.includes('rest')) {
    relevantQuestions = questionSuggestions.sleep;
  } else if (lowerUserQuestion.includes('heart') || lowerUserQuestion.includes('cardiovascular') || lowerUserQuestion.includes('blood pressure') || lowerUserQuestion.includes('cholesterol')) {
    relevantQuestions = questionSuggestions.heart;
  } else if (lowerUserQuestion.includes('weather') || lowerUserQuestion.includes('temperature') || lowerUserQuestion.includes('climate') || lowerUserQuestion.includes('seasonal') || lowerUserQuestion.includes('cold') || lowerUserQuestion.includes('hot') || lowerUserQuestion.includes('humid')) {
    relevantQuestions = questionSuggestions.weather;
  } else {
    relevantQuestions = [
      "What are the most important health screenings for women?",
      "How can I maintain a healthy lifestyle?",
      "What should I discuss with my doctor at my annual checkup?"
    ];
  }
  
  const shuffled = [...relevantQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export const loadStoredMessages = async () => {
  try {
    try {
      const remote = await trpcClient.chats.list.query({ limit: 100 });
      if (Array.isArray(remote.items)) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(remote.items));
        useChatStore.setState({ messages: remote.items });
        return;
      }
    } catch (e) {
      console.log('chats.list failed (likely unauthenticated), falling back to local');
    }
    const storedMessages = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      useChatStore.setState({ messages: JSON.parse(storedMessages) });
    }
  } catch (error) {
    console.error('Failed to load messages:', error);
  }
};
