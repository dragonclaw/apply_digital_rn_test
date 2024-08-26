import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import ArticleList from '../../components/ArticleListComponent/ArticleList';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const FavoritesArticlesScreen = () => {
  const [favoritedArticles, setfavoritedArticles] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavoritedArticlesFromStorage = async () => {
    try {
      setIsLoading(true);
      const storedData = await AsyncStorage.getItem('favoritedArticles');
      if (storedData) {
        setfavoritedArticles(JSON.parse(storedData));
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavoritedArticlesFromStorage();
    }, []),
  );

  return isLoading ? (
    <LoadingComponent />
  ) : error && favoritedArticles.length === 0 ? (
    // TODO: change for a error component
    <View>
      <Text>Error fetching the data</Text>
    </View>
  ) : (
    <>
      <ArticleList
        data={favoritedArticles}
        onRefresh={loadFavoritedArticlesFromStorage}
        shouldSwipe={false}
      />
    </>
  );
};

export default FavoritesArticlesScreen;
