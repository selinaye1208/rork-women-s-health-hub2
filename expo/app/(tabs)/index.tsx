import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '@/components/CategoryCard';
import FAQItem from '@/components/FAQItem';
import ContactSection from '@/components/ContactSection';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import PopularSearches from '@/components/PopularSearches';
import categories from '@/constants/categories';
import faqs from '@/constants/faqs';
import colors from '@/constants/colors';
import { searchArticles, SearchResult } from '@/utils/searchUtils';

export default function HomeScreen() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const results = searchArticles(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Your Health Journey</Text>
          <Text style={styles.welcomeText}>
            Explore resources on women&apos;s health topics and get personalized support through our AI assistant.
          </Text>
        </View>

        <SearchBar 
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search health articles..."
        />

        {isSearching ? (
          <SearchResults results={searchResults} query={searchQuery} />
        ) : (
          <>
            <PopularSearches onSearchTerm={handleSearch} />
            
            <Text style={styles.sectionTitle}>Health Categories</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </View>

            <ContactSection />

            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <View style={styles.faqContainer}>
              {faqs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeSection: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  faqContainer: {
    marginBottom: 16,
  },
});