import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import ArticleList from '../../components/ArticleListComponent/ArticleList';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const DeletedArticlesScreen = () => {
  const [deletedData, setDeletedData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadDeletedArticlesFromStorage = async () => {
    try {
      setIsLoading(true);
      const storedData = await AsyncStorage.getItem('deletedArticles');
      if (storedData) {
        setDeletedData(JSON.parse(storedData));
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDeletedArticlesFromStorage();
    }, []),
  );

  return isLoading ? (
    <LoadingComponent />
  ) : error && deletedData.length === 0 ? (
    // TODO: change for a error component
    <View>
      <Text>Error fetching the data</Text>
    </View>
  ) : (
    <>
      <ArticleList
        data={deletedData}
        onRefresh={loadDeletedArticlesFromStorage}
        shouldSwipe={false}
      />
    </>
  );
};

export default DeletedArticlesScreen;
