import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Cloud, MapPin } from 'lucide-react-native';
import ChatMessage from '@/components/ChatMessage';
import WeatherHealthCard from '@/components/WeatherHealthCard';
import { useChatStore, loadStoredMessages } from '@/hooks/useChatStore';
import { useWeather } from '@/hooks/useWeather';
import { useLocation } from '@/hooks/useLocation';
import colors from '@/constants/colors';

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const { messages, isLoading, sendMessage, suggestedQuestions, setSuggestedQuestions, setWeatherData } = useChatStore();
  const { weather, fetchWeather } = useWeather();
  const { location, getCurrentLocation } = useLocation();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadStoredMessages();
    // Initialize location and weather
    getCurrentLocation();
  }, []);
  
  useEffect(() => {
    if (weather) {
      setWeatherData(weather);
    }
  }, [weather]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;
    
    const messageText = inputText.trim();
    setInputText('');
    // Clear suggested questions when user sends a new message
    setSuggestedQuestions([]);
    await sendMessage(messageText);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    setSuggestedQuestions([]);
  };

  const renderWelcomeMessage = () => {
    if (messages.length === 0) {
      return (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Health Assistant</Text>
          <Text style={styles.welcomeText}>
            Ask me any questions about women's health, nutrition, puberty, reproductive health, or mental wellbeing. I can provide weather-based health recommendations, help you find local healthcare providers, and suggest health resources in your area.
          </Text>
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Try asking:</Text>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setInputText("What nutrients are important during pregnancy?")}
            >
              <Text style={styles.suggestionText}>What nutrients are important during pregnancy?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setInputText("How can I manage PMS symptoms?")}
            >
              <Text style={styles.suggestionText}>How can I manage PMS symptoms?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setInputText("Can you help me find a gynecologist near me?")}
            >
              <Text style={styles.suggestionText}>Can you help me find a gynecologist near me?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setInputText("What are signs of hormonal imbalance?")}
            >
              <Text style={styles.suggestionText}>What are signs of hormonal imbalance?</Text>
            </TouchableOpacity>
            {weather && (
              <TouchableOpacity
                style={[styles.suggestionButton, styles.weatherSuggestion]}
                onPress={() => setInputText(`Give me health recommendations for today's weather: ${weather.temperature}°F, ${weather.condition}, ${weather.humidity}% humidity`)}
              >
                <View style={styles.weatherSuggestionContent}>
                  <Cloud size={16} color={colors.primary} style={styles.weatherIcon} />
                  <Text style={styles.suggestionText}>Get weather-based health tips</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setInputText("Find local health resources and events near me")}
            >
              <View style={styles.locationSuggestionContent}>
                <MapPin size={16} color={colors.primary} style={styles.locationIcon} />
                <Text style={styles.suggestionText}>Find local health resources</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {renderWelcomeMessage()}
        
        {weather && messages.length === 0 && (
          <WeatherHealthCard 
            weather={weather} 
            onGetRecommendations={() => {
              setInputText(`Give me health recommendations for today's weather: ${weather.temperature}°F, ${weather.condition}, ${weather.humidity}% humidity`);
            }}
          />
        )}
        
        {messages.length > 0 && (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatMessage message={item} />}
            contentContainerStyle={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {suggestedQuestions.length > 0 && (
          <View style={styles.suggestedQuestionsContainer}>
            <Text style={styles.suggestedQuestionsTitle}>You might also ask:</Text>
            {suggestedQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedQuestionButton}
                onPress={() => handleSuggestedQuestion(question)}
              >
                <Text style={styles.suggestedQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your health question or ask for provider recommendations..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (inputText.trim() === '' || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={inputText.trim() === '' || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Send size={20} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  weatherSuggestion: {
    backgroundColor: '#E8F4FD',
    borderColor: colors.primary,
  },
  weatherSuggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    marginRight: 8,
  },
  locationSuggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
  },
  suggestionsContainer: {
    width: '100%',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.text,
  },
  suggestionButton: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.text,
  },
  messagesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
  },
  suggestedQuestionsContainer: {
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  suggestedQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  suggestedQuestionButton: {
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestedQuestionText: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
});