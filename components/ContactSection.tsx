import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { ExternalLink, Phone, MapPin, Globe } from 'lucide-react-native';
import colors from '@/constants/colors';

interface ContactResource {
  id: string;
  name: string;
  description: string;
  type: 'telehealth' | 'directory' | 'hotline' | 'clinic';
  url?: string;
  phone?: string;
  icon: 'external' | 'phone' | 'map' | 'globe';
}

const contactResources: ContactResource[] = [
  {
    id: '1',
    name: 'Planned Parenthood',
    description: 'Comprehensive reproductive health services and telehealth consultations',
    type: 'clinic',
    url: 'https://www.plannedparenthood.org/health-center',
    icon: 'map'
  },
  {
    id: '2',
    name: 'Women\'s Health Hotline',
    description: '24/7 support and referrals for women\'s health concerns',
    type: 'hotline',
    phone: '1-800-994-9662',
    icon: 'phone'
  },
  {
    id: '3',
    name: 'Maven Clinic',
    description: 'Virtual care platform specializing in women\'s and family health',
    type: 'telehealth',
    url: 'https://www.mavenclinic.com',
    icon: 'globe'
  },
  {
    id: '4',
    name: 'Nurx',
    description: 'Online birth control, STI testing, and women\'s health services',
    type: 'telehealth',
    url: 'https://www.nurx.com',
    icon: 'globe'
  },
  {
    id: '5',
    name: 'ACOG Find a Doctor',
    description: 'Directory of board-certified obstetricians and gynecologists',
    type: 'directory',
    url: 'https://www.acog.org/womens-health/find-a-doctor',
    icon: 'external'
  },
  {
    id: '6',
    name: 'Postpartum Support International',
    description: 'Mental health support and provider directory for perinatal care',
    type: 'directory',
    url: 'https://www.postpartum.net',
    icon: 'external'
  }
];

export default function ContactSection() {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'external':
        return <ExternalLink size={20} color={colors.primary} />;
      case 'phone':
        return <Phone size={20} color={colors.primary} />;
      case 'map':
        return <MapPin size={20} color={colors.primary} />;
      case 'globe':
        return <Globe size={20} color={colors.primary} />;
      default:
        return <ExternalLink size={20} color={colors.primary} />;
    }
  };

  const handlePress = (resource: ContactResource) => {
    if (resource.phone) {
      Linking.openURL(`tel:${resource.phone}`);
    } else if (resource.url) {
      Linking.openURL(resource.url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Healthcare Resources & Referrals</Text>
      <Text style={styles.sectionDescription}>
        Connect with trusted healthcare providers and support services for women's health
      </Text>
      
      <View style={styles.resourcesContainer}>
        {contactResources.map((resource) => (
          <TouchableOpacity
            key={resource.id}
            style={styles.resourceCard}
            onPress={() => handlePress(resource)}
          >
            <View style={styles.resourceHeader}>
              <View style={styles.iconContainer}>
                {getIcon(resource.icon)}
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>{resource.name}</Text>
                <Text style={styles.resourceType}>
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </Text>
              </View>
            </View>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            {resource.phone && (
              <Text style={styles.contactInfo}>{resource.phone}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.emergencyContainer}>
        <Text style={styles.emergencyTitle}>Emergency Resources</Text>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => Linking.openURL('tel:911')}
        >
          <Phone size={16} color="#FFF" />
          <Text style={styles.emergencyText}>Call 911 for Medical Emergencies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.crisisButton}
          onPress={() => Linking.openURL('tel:988')}
        >
          <Phone size={16} color="#FFF" />
          <Text style={styles.crisisText}>Call 988 for Mental Health Crisis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 16,
    lineHeight: 20,
  },
  resourcesContainer: {
    marginBottom: 20,
  },
  resourceCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  resourceType: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  resourceDescription: {
    fontSize: 14,
    color: colors.lightText,
    lineHeight: 20,
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  emergencyContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  emergencyButton: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  emergencyText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  crisisButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  crisisText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});