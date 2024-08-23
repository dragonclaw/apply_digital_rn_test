import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import articles from '../../services/articles/articles';
import ArticleList from '../../components/ArticleListComponent/ArticleList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const ArticleListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  const fetchList = async () => {
    try {
      setIsLoading(true);

      const articlesData = await articles.getArticles();
      setData(articlesData);
      await AsyncStorage.setItem('articles', JSON.stringify(articlesData));
      const dataSaved = await AsyncStorage.getItem('articles');
      console.log('saved data', dataSaved);
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
        console.log('get data without fetching');
        console.log('stored data', storedData);
        setData(JSON.parse(storedData));
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    const checkConnectivity = async () => {
      const state = await NetInfo.fetch();
      setIsOffline(!state.isConnected);
    };

    checkConnectivity();

    if (!isOffline) {
      fetchList();
    } else {
      loadFromStorage();
    }
  }, [isOffline]);

  return isLoading ? (
    <View>
      <Text>IS LOADING</Text>
    </View>
  ) : isError && data.length === 0 ? (
    <View>
      <Text>Error fetching the data</Text>
    </View>
  ) : (
    <>
      {isOffline && (
        <View>
          <Text>is offline</Text>
        </View>
      )}
      <ArticleList data={data} onRefresh={fetchList} />
    </>
  );
};

export default ArticleListScreen;
