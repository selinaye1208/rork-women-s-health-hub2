import { useState, useEffect } from 'react';
import { useLocation } from './useLocation';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  uvIndex?: number;
  airQuality?: string;
  location?: string;
}

interface WeatherState {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export const useWeather = () => {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    isLoading: false,
    error: null,
  });
  
  const { location, getCurrentLocation } = useLocation();

  const fetchWeather = async (lat?: number, lon?: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      let latitude = lat;
      let longitude = lon;
      
      // If no coordinates provided, get current location
      if (!latitude || !longitude) {
        const currentLocation = location || await getCurrentLocation();
        if (!currentLocation) {
          setState(prev => ({ 
            ...prev, 
            error: 'Unable to get location for weather data',
            isLoading: false 
          }));
          return null;
        }
        latitude = currentLocation.latitude;
        longitude = currentLocation.longitude;
      }
      
      // Using OpenWeatherMap-like free API (we'll use a mock for demo)
      // In production, you'd use a real weather API like OpenWeatherMap
      const weatherData = await fetchMockWeatherData(latitude, longitude);
      
      setState(prev => ({ 
        ...prev, 
        weather: weatherData, 
        isLoading: false 
      }));
      
      return weatherData;
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error.message || 'Failed to fetch weather data',
        isLoading: false 
      }));
      return null;
    }
  };

  // Auto-fetch weather when location is available
  useEffect(() => {
    if (location && !state.weather) {
      fetchWeather(location.latitude, location.longitude);
    }
  }, [location]);

  return {
    ...state,
    fetchWeather,
    refetch: () => fetchWeather(),
  };
};

// Mock weather data function (replace with real API in production)
const fetchMockWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock weather data based on location and season
  const now = new Date();
  const month = now.getMonth();
  const isWinter = month === 11 || month === 0 || month === 1;
  const isSummer = month >= 5 && month <= 8;
  
  let baseTemp = 70; // Default spring/fall temp
  if (isWinter) baseTemp = 45;
  if (isSummer) baseTemp = 85;
  
  // Add some randomness
  const temperature = baseTemp + Math.random() * 20 - 10;
  
  const conditions = ['sunny', 'partly cloudy', 'cloudy', 'rainy', 'clear'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const humidity = Math.floor(Math.random() * 60) + 30; // 30-90%
  const uvIndex = Math.floor(Math.random() * 10) + 1; // 1-10
  
  return {
    temperature: Math.round(temperature),
    condition,
    humidity,
    uvIndex,
    airQuality: 'Good',
    location: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
  };
};

// For production, here's how you'd integrate with a real weather API:
/*
const fetchRealWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const API_KEY = 'your-openweathermap-api-key';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
  );
  
  if (!response.ok) {
    throw new Error('Weather API request failed');
  }
  
  const data = await response.json();
  
  return {
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    uvIndex: data.uvi, // Requires additional UV API call
    location: data.name,
  };
};
*/