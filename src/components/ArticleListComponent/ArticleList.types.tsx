export interface Article {
  created_at_i: string;
  [key: string]: any;
}

export interface ArticleListProps {
  data: Article[];
  onRefresh: () => Promise<void>;
}
