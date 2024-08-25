import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import articles from '../../services/articles/articles';
import ArticleList from '../../components/ArticleListComponent/ArticleList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import notifee, {EventType} from '@notifee/react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NavigationTypes} from '../../components/CardArticleComponent/CardArticleComponent.types';

const ArticleListScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigationTypes>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  //TODO: need to refactor to use context
  const [data, setData] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  //TODO: need to refactor to only fetch and save into context
  const fetchList = async () => {
    try {
      setIsLoading(true);
      const articlesData = await articles.getArticles();
      const deletedArticles = JSON.parse(
        (await AsyncStorage.getItem('deletedArticles')) as string,
      );
      const filteredArticles = articlesData.filter(
        (article: {story_id: any}) => {
          return !deletedArticles?.includes(article.story_id);
        },
      );
      setData(filteredArticles);
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

  notifee.onForegroundEvent(({type, detail}) => {
    console.log('FOREGROUND');
    console.log('type', type);
    console.log('detail', detail);
    console.log(EventType);
    if (
      type === EventType.PRESS &&
      detail.pressAction &&
      detail.pressAction.id
    ) {
      console.log('NAVIGATION IN BACKGROUND');
      navigation.navigate('SingleArticleScreen', {
        url: detail.pressAction.id,
      });
      console.log(
        'User pressed an action with the id ON THE BACKGROUND: ',
        detail.pressAction.id,
      );
    }
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log('BACKGROUND');
    console.log('type', type);
    console.log('detail', detail);
    console.log(EventType);
    if (
      type === EventType.PRESS &&
      detail.pressAction &&
      detail.pressAction.id
    ) {
      console.log('NAVIGATION IN BACKGROUND');
      navigation.navigate('SingleArticleScreen', {
        url: detail.pressAction.id,
      });
      console.log(
        'User pressed an action with the id ON THE BACKGROUND: ',
        detail.pressAction.id,
      );
    }
  });

  return isLoading ? (
    // TODO: change for a loading component
    <View>
      <Text>IS LOADING</Text>
    </View>
  ) : isError && data.length === 0 ? (
    // TODO: change for a error component
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
