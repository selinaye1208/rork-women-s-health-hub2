import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArticleCard from '@/components/ArticleCard';
import categories from '@/constants/categories';
import colors from '@/constants/colors';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categories.find(c => c.id === id);

  if (!category) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: category.title,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      
      <View style={styles.headerContainer}>
        <Text style={styles.description}>{category.description}</Text>
      </View>
      
      <FlatList
        data={category.articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} categoryId={category.id} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.lightText,
    marginBottom: 8,
    lineHeight: 22,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
  },
});