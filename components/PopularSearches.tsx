import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import colors from '@/constants/colors';
import { getPopularSearchTerms } from '@/utils/searchUtils';

interface PopularSearchesProps {
  onSearchTerm: (term: string) => void;
}

export default function PopularSearches({ onSearchTerm }: PopularSearchesProps) {
  const popularTerms = getPopularSearchTerms();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TrendingUp size={20} color={colors.primary} />
        <Text style={styles.title}>Popular Searches</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
      >
        {popularTerms.map((term, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tag}
            onPress={() => onSearchTerm(term)}
            testID={`popular-search-${term.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <Text style={styles.tagText}>{term}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  tagsContainer: {
    paddingRight: 16,
  },
  tag: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});