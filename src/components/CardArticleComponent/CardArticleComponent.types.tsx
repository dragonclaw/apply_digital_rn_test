import {Article} from '../ArticleListComponent/ArticleList.types';

export interface CardArticleComponentProps {
  SingleArticle: Article;
  fetchList: () => void;
}

export type NavigationTypes = {
  SingleArticleScreen: {article: Article};
};
