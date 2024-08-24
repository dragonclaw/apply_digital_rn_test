import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {WebViewContainer} from './SingleArticleScreen.styles';
import {Text} from '@rneui/themed';

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

  return (
    <WebViewContainer>
      {article.url ? (
        <WebView
          source={{
            uri: article.url ?? '',
          }}
        />
      ) : (
        //TODO: Add a better error handling component
        <>
          <Text> No URL on this story</Text>
        </>
      )}
    </WebViewContainer>
  );
};

export default SingleArticleScreen;
