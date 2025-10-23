export interface Article {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  image: string;
  subcategory?: string;
}

export interface Subcategory {
  id: string;
  title: string;
  articles: Article[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  articles: Article[];
  subcategories?: Subcategory[];
}