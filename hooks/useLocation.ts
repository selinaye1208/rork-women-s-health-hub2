import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
}

interface LocationState {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    location: null,
    isLoading: false,
    error: null,
    hasPermission: false,
  });

  const requestPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'web') {
        // Use web geolocation API
        if (!navigator.geolocation) {
          setState(prev => ({ ...prev, error: 'Geolocation not supported' }));
          return false;
        }
        return true;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      const hasPermission = status === 'granted';
      
      setState(prev => ({ 
        ...prev, 
        hasPermission,
        error: hasPermission ? null : 'Location permission denied'
      }));
      
      return hasPermission;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to request location permission',
        hasPermission: false 
      }));
      return false;
    }
  };

  const getCurrentLocation = async (): Promise<LocationData | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      if (Platform.OS === 'web') {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            setState(prev => ({ 
              ...prev, 
              error: 'Geolocation not supported on this device', 
              isLoading: false 
            }));
            reject(new Error('Geolocation not supported'));
            return;
          }

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const locationData: LocationData = { latitude, longitude };
              
              // Try to get address using reverse geocoding
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                locationData.address = data.display_name;
                locationData.city = data.city || data.locality;
                locationData.region = data.principalSubdivision;
                locationData.country = data.countryName;
              } catch (geocodeError) {
                console.log('Geocoding failed:', geocodeError);
              }
              
              setState(prev => ({ 
                ...prev, 
                location: locationData, 
                isLoading: false,
                hasPermission: true
              }));
              resolve(locationData);
            },
            (error) => {
              let errorMessage = 'Failed to get location';
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  errorMessage = 'Location access denied by user';
                  break;
                case error.POSITION_UNAVAILABLE:
                  errorMessage = 'Location information unavailable';
                  break;
                case error.TIMEOUT:
                  errorMessage = 'Location request timed out';
                  break;
                default:
                  errorMessage = 'Unknown location error occurred';
              }
              
              setState(prev => ({ 
                ...prev, 
                error: errorMessage, 
                isLoading: false 
              }));
              reject(error);
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
          );
        });
      }

      // Native location handling
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setState(prev => ({ 
          ...prev, 
          error: 'Location permission required',
          isLoading: false 
        }));
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 10,
      });

      const { latitude, longitude } = location.coords;
      let locationData: LocationData = { latitude, longitude };

      // Try to get address
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode.length > 0) {
          const addr = reverseGeocode[0];
          locationData = {
            ...locationData,
            address: `${addr.street || ''} ${addr.streetNumber || ''}`.trim(),
            city: addr.city || undefined,
            region: addr.region || undefined,
            country: addr.country || undefined,
          };
        }
      } catch (geocodeError) {
        console.log('Reverse geocoding failed:', geocodeError);
      }

      setState(prev => ({ 
        ...prev, 
        location: locationData, 
        isLoading: false 
      }));
      
      return locationData;
    } catch (error: any) {
      let errorMessage = 'Failed to get current location';
      
      if (error.message?.includes('Location provider is unavailable')) {
        errorMessage = 'Location services are disabled. Please enable them in your device settings.';
      } else if (error.message?.includes('Location request timed out')) {
        errorMessage = 'Location request timed out. Please try again.';
      } else if (error.message?.includes('Location permission not granted')) {
        errorMessage = 'Location permission denied. Please grant permission to continue.';
      }
      
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        isLoading: false 
      }));
      return null;
    }
  };

  const watchLocation = (callback: (location: LocationData) => void) => {
    if (Platform.OS === 'web') {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          callback({ latitude, longitude });
        },
        (error) => {
          setState(prev => ({ ...prev, error: 'Location tracking failed' }));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      
      return () => navigator.geolocation.clearWatch(watchId);
    }

    // For native platforms, you would use Location.watchPositionAsync
    // but for simplicity, we'll just use getCurrentLocation periodically
    const interval = setInterval(async () => {
      const location = await getCurrentLocation();
      if (location) {
        callback(location);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  };

  return {
    ...state,
    requestPermission,
    getCurrentLocation,
    watchLocation,
  };
};