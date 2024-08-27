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
import {useArticles} from '../../hooks/useArticles';
import OfflineComponent from '../../components/OfflineComponent/OfflineComponent';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

const ArticleListScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  const {articlesData, isError, isLoading, fetchList, loadFromStorage} =
    useArticles();

  const [isOffline, setIsOffline] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOffline]);

  useEffect(() => {
    initBackgroundFetch();
  }, []);

  const initBackgroundFetch = async () => {
    // BackgroundFetch event handler.
    const onEvent = async (taskId: string | undefined) => {
      // Do your background work...
      const currentArticles = JSON.parse(
        (await AsyncStorage.getItem('articles')) as string,
      );
      const newArticlesData = await articles.getArticles();
      const result = currentArticles.filter(
        ({story_id}: {story_id: number}) => {
          return !newArticlesData?.some(
            ({story_id: new_story_id}: {story_id: number}) =>
              new_story_id === story_id,
          );
        },
      );
      if (result.length !== 0) {
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
          title: newArticlesData[0].title,
          body: newArticlesData[0].author,
          android: {
            channelId,

            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: newArticlesData[0].url,
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

    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', status);
  };

  notifee.onForegroundEvent(({type, detail}) => {
    if (
      type === EventType.PRESS &&
      detail.pressAction &&
      detail.pressAction.id
    ) {
      navigation.navigate('SingleArticleScreen', {
        url: detail.pressAction.id,
      });
    }
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    if (
      type === EventType.PRESS &&
      detail.pressAction &&
      detail.pressAction.id
    ) {
      navigation.navigate('SingleArticleScreen', {
        url: detail.pressAction.id,
      });
    }
  });

  return isLoading ? (
    <LoadingComponent />
  ) : isError && articlesData.length === 0 ? (
    <ErrorComponent />
  ) : (
    <>
      {isOffline && <OfflineComponent />}
      <ArticleList
        data={articlesData}
        onRefresh={fetchList}
        shouldSwipe={true}
      />
    </>
  );
};

export default ArticleListScreen;
