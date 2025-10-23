import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Clock, ChevronRight } from 'lucide-react-native';
import colors from '@/constants/colors';

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  categoryId: string;
  categoryTitle: string;
  subcategory?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  const handleArticlePress = (result: SearchResult) => {
    router.push(`/article/${result.categoryId}/${result.id}`);
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => handleArticlePress(item)}
      testID={`search-result-${item.id}`}
    >
      <View style={styles.resultContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.categoryTitle}</Text>
        </View>
        
        <Text style={styles.resultTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <Text style={styles.resultSummary} numberOfLines={3}>
          {item.summary}
        </Text>
        
        <View style={styles.resultFooter}>
          <View style={styles.readTimeContainer}>
            <Clock size={14} color={colors.lightText} />
            <Text style={styles.readTime}>{item.readTime}</Text>
          </View>
          
          {item.subcategory && (
            <Text style={styles.subcategory}>{item.subcategory}</Text>
          )}
        </View>
      </View>
      
      <ChevronRight size={20} color={colors.lightText} style={styles.chevron} />
    </TouchableOpacity>
  );

  if (results.length === 0 && query.length > 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsTitle}>No articles found</Text>
        <Text style={styles.noResultsText}>
          Try searching with different keywords or browse our health categories.
        </Text>
      </View>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultsHeader}>
        {results.length} article{results.length !== 1 ? 's' : ''} found for &quot;{query}&quot;
      </Text>
      
      <FlatList
        data={results}
        renderItem={renderSearchResult}
        keyExtractor={(item) => `${item.categoryId}-${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  resultCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultContent: {
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 22,
  },
  resultSummary: {
    fontSize: 14,
    color: colors.lightText,
    lineHeight: 20,
    marginBottom: 12,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: colors.lightText,
    marginLeft: 4,
  },
  subcategory: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 12,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: colors.lightText,
    textAlign: 'center',
    lineHeight: 20,
  },
});