import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import articles from '../services/articles';

const ArticleListScreen = () => {
  useEffect(() => {
    const fetchList = async () => {
      const data = await articles.getArticles();
      console.log(data);
    };
    fetchList();
  }, []);

  return (
    <View>
      <Text>ArticleScreen</Text>
    </View>
  );
};

export default ArticleListScreen;
