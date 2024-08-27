import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {WebViewContainer} from './SingleArticleScreen.styles';
import {Text} from '@rneui/themed';

type RootStackParamList = {
  SingleArticleScreen: {url: string};
};

type SingleArticleScreenRouteProp = RouteProp<
  RootStackParamList,
  'SingleArticleScreen'
>;

const SingleArticleScreen = () => {
  const route = useRoute<SingleArticleScreenRouteProp>();
  const {url} = route.params;

  return (
    <WebViewContainer>
      {url ? (
        <WebView
          source={{
            uri: url ?? '',
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
