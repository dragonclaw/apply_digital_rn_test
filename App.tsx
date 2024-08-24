import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider, createTheme} from '@rneui/themed';
import ArticleListScreen from './src/screens/ArticleListScreen/ArticleListScreen';
import SingleArticleScreen from './src/screens/SingleArticleScreen/SingleArticleScreen';

const Stack = createNativeStackNavigator();

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListScreen">
          <Stack.Screen
            name="ListScreen"
            component={ArticleListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SingleArticleScreen"
            component={SingleArticleScreen}
            //need to refactor to a custom header if time permits
            options={{title: 'Back'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
