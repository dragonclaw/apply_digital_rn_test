import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import articles from '../services/articles/articles';

const ArticleListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true);
        setData(await articles.getArticles());
        setIsLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchList();
  }, []);

  return isLoading ? (
    <View>
      <Text>IS LOADING</Text>
    </View>
  ) : isError ? (
    <View>
      <Text>Error fetching the data</Text>
    </View>
  ) : (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default ArticleListScreen;
