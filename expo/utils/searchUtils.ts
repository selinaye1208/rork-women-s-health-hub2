import categories from '@/constants/categories';

export interface SearchResult {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  categoryId: string;
  categoryTitle: string;
  subcategory?: string;
}

export function searchArticles(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  categories.forEach((category) => {
    category.articles.forEach((article) => {
      const titleMatch = article.title.toLowerCase().includes(searchTerm);
      const summaryMatch = article.summary.toLowerCase().includes(searchTerm);
      const subcategoryMatch = article.subcategory?.toLowerCase().includes(searchTerm);
      const categoryMatch = category.title.toLowerCase().includes(searchTerm);

      if (titleMatch || summaryMatch || subcategoryMatch || categoryMatch) {
        results.push({
          id: article.id,
          title: article.title,
          summary: article.summary,
          readTime: article.readTime,
          categoryId: category.id,
          categoryTitle: category.title,
          subcategory: article.subcategory,
        });
      }
    });
  });

  // Sort results by relevance (title matches first, then summary matches)
  return results.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const aTitleMatch = aTitle.includes(searchTerm);
    const bTitleMatch = bTitle.includes(searchTerm);

    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;

    // If both or neither match in title, sort alphabetically
    return aTitle.localeCompare(bTitle);
  });
}

export function getPopularSearchTerms(): string[] {
  return [
    'pregnancy',
    'menstruation',
    'nutrition',
    'exercise',
    'sleep',
    'acne',
    'hormones',
    'heart health',
    'mental health',
    'menopause',
    'PCOS',
    'fertility',
    'skincare',
    'stress',
    'diet',
  ];
}