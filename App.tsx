import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeProvider, createTheme} from '@rneui/themed';
import ArticleListScreen from './src/screens/ArticleListScreen/ArticleListScreen';
import SingleArticleScreen from './src/screens/SingleArticleScreen/SingleArticleScreen';
import FavoritesScreen from './src/screens/FavoritesScreen/FavoritesScreen';
import UserNotificationsScreen from './src/screens/UserNotificationsScreen/UserNotificationsScreen';
import {Icon} from '@rneui/themed';

const Stack = createNativeStackNavigator();

const theme = createTheme();

const Tab = createBottomTabNavigator();

function IconTab({name}: {name: string}) {
  return <Icon name={name} type="font-awesome" color="#44a" />;
}

function Home() {
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
        component={FavoritesScreen}
        options={{
          headerShown: false,
          title: 'Favorites',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <IconTab name="star" />,
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
    </ThemeProvider>
  );
}
