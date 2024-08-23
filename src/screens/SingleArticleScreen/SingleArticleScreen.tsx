import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {WebViewContainer} from './SingleArticleScreen.styles';

type RootStackParamList = {
  SingleArticleScreen: {article: any};
};

type SingleArticleScreenRouteProp = RouteProp<
  RootStackParamList,
  'SingleArticleScreen'
>;

const SingleArticleScreen = () => {
  const route = useRoute<SingleArticleScreenRouteProp>();
  const {article} = route.params;
  console.log('single article', article.url);

  return (
    <WebViewContainer>
      <WebView
        source={{
          uri: article.url ?? '',
        }}
      />
    </WebViewContainer>
  );
};

export default SingleArticleScreen;
