import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Apple, Brain, Flower, Heart } from 'lucide-react-native';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  const getIcon = () => {
    switch (category.icon) {
      case 'apple':
        return <Apple size={24} color="#FFF" />;
      case 'flower':
        return <Flower size={24} color="#FFF" />;
      case 'heart':
        return <Heart size={24} color="#FFF" />;
      case 'brain':
        return <Brain size={24} color="#FFF" />;
      default:
        return <Heart size={24} color="#FFF" />;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/category/${category.id}`)}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        {getIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {category.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F9F5FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});