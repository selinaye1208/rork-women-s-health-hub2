import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { MapPin, Navigation, RefreshCw } from 'lucide-react-native';
import { useLocation } from '@/hooks/useLocation';
import colors from '@/constants/colors';

const LocationTracker: React.FC = () => {
  const { 
    location, 
    isLoading, 
    error, 
    hasPermission, 
    requestPermission, 
    getCurrentLocation 
  } = useLocation();
  
  const [isTracking, setIsTracking] = useState(false);

  const handleGetLocation = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Permission Required',
          'Location access is needed to provide location-based health services and emergency features.',
          [{ text: 'OK' }]
        );
        return;
      }
    }
    
    setIsTracking(true);
    await getCurrentLocation();
    setIsTracking(false);
  };

  const formatLocation = () => {
    if (!location) return null;
    
    const parts = [];
    if (location.city) parts.push(location.city);
    if (location.region) parts.push(location.region);
    if (location.country) parts.push(location.country);
    
    return parts.join(', ') || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MapPin size={24} color={colors.primary} />
        <Text style={styles.title}>Location Services</Text>
      </View>
      
      <Text style={styles.description}>
        Enable location access for personalized health services, emergency features, and local health resources.
      </Text>

      {location ? (
        <View style={styles.locationInfo}>
          <View style={styles.locationRow}>
            <Navigation size={16} color={colors.primary} />
            <Text style={styles.locationText}>{formatLocation()}</Text>
          </View>
          {location.address && (
            <Text style={styles.addressText}>{location.address}</Text>
          )}
          <Text style={styles.coordsText}>
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </Text>
        </View>
      ) : (
        <View style={styles.noLocationContainer}>
          <Text style={styles.noLocationText}>
            {error || 'Tap the button below to get your current location'}
          </Text>
          {error && (
            <Text style={styles.errorHint}>
              Make sure location services are enabled in your device settings.
            </Text>
          )}
        </View>
      )}

      <Pressable 
        style={[styles.button, (isLoading || isTracking) && styles.buttonDisabled]} 
        onPress={handleGetLocation}
        disabled={isLoading || isTracking}
      >
        <RefreshCw 
          size={20} 
          color="#FFF" 
          style={[(isLoading || isTracking) && styles.spinning]} 
        />
        <Text style={styles.buttonText}>
          {isLoading || isTracking ? 'Getting Location...' : 
           hasPermission ? 'Update Location' : 'Enable Location'}
        </Text>
      </Pressable>

      <View style={styles.benefits}>
        <Text style={styles.benefitsTitle}>Benefits of location access:</Text>
        <Text style={styles.benefitItem}>• Find nearby healthcare providers</Text>
        <Text style={styles.benefitItem}>• Emergency location sharing</Text>
        <Text style={styles.benefitItem}>• Local health resources and events</Text>
        <Text style={styles.benefitItem}>• Weather-based health recommendations</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: colors.lightText,
    lineHeight: 20,
    marginBottom: 16,
  },
  locationInfo: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 4,
  },
  coordsText: {
    fontSize: 12,
    color: colors.lightText,
    fontFamily: 'monospace',
  },
  noLocationContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  noLocationText: {
    fontSize: 14,
    color: colors.lightText,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 12,
    color: colors.lightText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  spinning: {
    // Note: For actual spinning animation, you'd need react-native-reanimated
    // This is just a placeholder style
  },
  benefits: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 13,
    color: colors.lightText,
    marginBottom: 4,
    lineHeight: 18,
  },
});

export default LocationTracker;