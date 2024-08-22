import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArticleListScreen from './src/screens/ArticleListScreen';
import SingleArticleScreen from './src/screens/SingleArticleScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListScreen">
        <Stack.Screen name="ListScreen" component={ArticleListScreen} />
        <Stack.Screen name="SingleArticle" component={SingleArticleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
