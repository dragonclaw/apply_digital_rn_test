import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import articles from '../../services/articles/articles';
import ArticleList from '../../components/ArticleListComponent/ArticleList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import notifee, {EventType} from '@notifee/react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NavigationTypes} from '../../components/CardArticleComponent/CardArticleComponent.types';
import BackgroundFetch from 'react-native-background-fetch';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import {compareArrays} from '../../utils/compareArrays';

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

  useEffect(() => {
    initBackgroundFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initBackgroundFetch = async () => {
    // BackgroundFetch event handler.
    const onEvent = async (taskId: string | undefined) => {
      console.log('[BackgroundFetch] task: ', taskId);
      console.log('THIS SHOULD BE EXECUTED IN THE BACKGROUND');
      // Do your background work...
      const currentArticles = data;
      const articlesData = await articles.getArticles();
      if (!compareArrays(currentArticles, articlesData)) {
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
          title: articlesData[0].title,
          body: articlesData[0].author,
          android: {
            channelId,

            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: articlesData[0].url,
              launchActivity: 'default',
            },
          },
        });
      }

      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async (taskId: string | undefined) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', status);
  };

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
    <LoadingComponent />
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
