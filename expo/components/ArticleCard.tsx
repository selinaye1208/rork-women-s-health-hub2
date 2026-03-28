import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Article } from '@/types/category';
import { Clock } from 'lucide-react-native';

interface ArticleCardProps {
  article: Article;
  categoryId: string;
}

export default function ArticleCard({ article, categoryId }: ArticleCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/article/${categoryId}/${article.id}`)}
    >
      <Image
        source={{ uri: `${article.image}?w=500&auto=format&q=80` }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.summary} numberOfLines={2}>
          {article.summary}
        </Text>
        <View style={styles.readTimeContainer}>
          <Clock size={14} color="#666" />
          <Text style={styles.readTime}>{article.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  summary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});