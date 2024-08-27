export interface Article {
  [key: string]: any;
  story_id: number;
  story_title?: string;
  title?: string;
  story_url?: string;
  created_at: string;
  author: string;
}

export interface ArticleListProps {
  data: Article[];
  onRefresh: () => void;
  shouldSwipe?: boolean;
}
