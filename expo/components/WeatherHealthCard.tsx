import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Cloud, Thermometer, Droplets, Sun, MapPin } from 'lucide-react-native';
import colors from '@/constants/colors';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  uvIndex?: number;
  airQuality?: string;
  location?: string;
}

interface WeatherHealthCardProps {
  weather: WeatherData;
  onGetRecommendations: () => void;
}

export default function WeatherHealthCard({ weather, onGetRecommendations }: WeatherHealthCardProps) {
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      return <Sun size={20} color={colors.primary} />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud size={20} color={colors.primary} />;
    } else if (lowerCondition.includes('rain')) {
      return <Droplets size={20} color={colors.primary} />;
    }
    return <Cloud size={20} color={colors.primary} />;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 85) return '#FF6B6B'; // Hot - red
    if (temp < 40) return '#4ECDC4'; // Cold - blue
    return colors.primary; // Normal - primary color
  };

  const getHealthAlert = (weather: WeatherData) => {
    const alerts = [];
    
    if (weather.temperature > 85) {
      alerts.push('🌡️ High heat - stay hydrated');
    }
    if (weather.temperature < 40) {
      alerts.push('❄️ Cold weather - vitamin D support');
    }
    if (weather.humidity > 70) {
      alerts.push('💧 High humidity - skin care focus');
    }
    if (weather.uvIndex && weather.uvIndex > 6) {
      alerts.push('☀️ High UV - sunscreen essential');
    }
    
    return alerts[0] || '✨ Great weather for outdoor activities';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <MapPin size={16} color={colors.lightText} />
          <Text style={styles.locationText}>Current Weather</Text>
        </View>
        <View style={styles.weatherRow}>
          {getWeatherIcon(weather.condition)}
          <Text style={[styles.temperature, { color: getTemperatureColor(weather.temperature) }]}>
            {weather.temperature}°F
          </Text>
          <Text style={styles.condition}>{weather.condition}</Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Droplets size={16} color={colors.lightText} />
          <Text style={styles.detailText}>Humidity: {weather.humidity}%</Text>
        </View>
        {weather.uvIndex && (
          <View style={styles.detailItem}>
            <Sun size={16} color={colors.lightText} />
            <Text style={styles.detailText}>UV Index: {weather.uvIndex}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>{getHealthAlert(weather)}</Text>
      </View>
      
      <TouchableOpacity style={styles.recommendationButton} onPress={onGetRecommendations}>
        <Text style={styles.recommendationButtonText}>Get Weather-Based Health Tips</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: colors.lightText,
    marginLeft: 4,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 12,
  },
  condition: {
    fontSize: 16,
    color: colors.text,
    textTransform: 'capitalize',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: colors.lightText,
    marginLeft: 4,
  },
  alertContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  alertText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  recommendationButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  recommendationButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});