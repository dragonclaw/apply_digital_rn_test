//TODO: need to update the types for the ArticleList component
export interface Article {
  [key: string]: any;
}

export interface ArticleListProps {
  data: Article[];
  onRefresh: () => Promise<void>;
  shouldSwipe?: boolean;
}
