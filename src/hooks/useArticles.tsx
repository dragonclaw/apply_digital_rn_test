import React, {createContext, useContext, useState} from 'react';
import {Article} from '../components/ArticleListComponent/ArticleList.types';
import articles from '../services/articles/articles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ArticlesProps {
  articlesData: Article[];
  isError: boolean;
  isLoading: boolean;
  fetchList: () => void;
  loadFromStorage: () => void;
}
interface Props {
  children: any;
}

const ArticlesContext = createContext<ArticlesProps>({
  articlesData: [],
  isError: false,
  isLoading: false,
  fetchList: () => {},
  loadFromStorage: () => {},
});

export const ArticlesProvider = ({children}: Props) => {
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const newArticles = await articles.getArticles();
      const deletedArticles = JSON.parse(
        (await AsyncStorage.getItem('deletedArticles')) as string,
      );

      const filteredArticles = newArticles.filter((article: Article) => {
        return !deletedArticles?.some(
          (deletedArticle: Article) =>
            deletedArticle.story_id === article.story_id,
        );
      });
      setArticlesData(filteredArticles);
      await AsyncStorage.setItem('articles', JSON.stringify(filteredArticles));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  const loadFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('articles');
      if (storedData) {
        setArticlesData(JSON.parse(storedData));
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <ArticlesContext.Provider
      value={{
        articlesData,
        isLoading,
        isError,
        fetchList,
        loadFromStorage,
      }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
