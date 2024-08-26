import {Article} from '../ArticleListComponent/ArticleList.types';

export interface CardArticleComponentProps {
  SingleArticle: Article;
  fetchList: () => void;
  shouldSwipe?: boolean;
}

export type NavigationTypes = {
  SingleArticleScreen: {url: string};
};
