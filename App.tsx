import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeProvider, createTheme} from '@rneui/themed';
import ArticleListScreen from './src/screens/ArticleListScreen/ArticleListScreen';
import SingleArticleScreen from './src/screens/SingleArticleScreen/SingleArticleScreen';
import UserNotificationsScreen from './src/screens/UserNotificationsScreen/UserNotificationsScreen';
import {Icon} from '@rneui/themed';
import DeletedArticlesScreen from './src/screens/DeletedArticlesScreen/DeletedArticlesScreen';
import {PermissionsAndroid} from 'react-native';
import notifee from '@notifee/react-native';
import FavoritesArticlesScreen from './src/screens/FavoritesArticlesScreen/FavoritesArticlesScreen';
import {ArticlesProvider} from './src/hooks/useArticles';

const Stack = createNativeStackNavigator();

const theme = createTheme();

const Tab = createBottomTabNavigator();

function IconTab({name}: {name: string}) {
  return <Icon name={name} type="font-awesome" color="#44a" />;
}

function Home() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Apply Digital needs to send you notifications',
            message:
              'Apply Digital needs to send you notifications for you to stay ' +
              'up to date with the latest news.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can send the notifications');
          // Request permissions (required for iOS)
          await notifee.requestPermission();
        } else {
          console.log('You cannot send notifications');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestNotificationPermission();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ListScreen"
        component={ArticleListScreen}
        options={{
          headerShown: false,
          title: 'Articles',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <IconTab name="book" />,
        }}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesArticlesScreen}
        options={{
          headerShown: false,
          title: 'Favorites',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <IconTab name="star" />,
        }}
      />
      <Tab.Screen
        name="DeletedArticlesScreen"
        component={DeletedArticlesScreen}
        options={{
          headerShown: false,
          title: 'Deleted Articles',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <IconTab name="trash" />,
        }}
      />
      <Tab.Screen
        name="UserNotificationsScreen"
        component={UserNotificationsScreen}
        options={{
          headerShown: false,
          title: 'Notifications Settings',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <IconTab name="gear" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ArticlesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SingleArticleScreen"
              component={SingleArticleScreen}
              //TODO: need to refactor to a custom header if time permits
              options={{title: 'Back'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ArticlesProvider>
    </ThemeProvider>
  );
}
