import {Text, View} from 'react-native';
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';

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
    <View>
      <Text>this is a test</Text>
    </View>
  );
};

export default SingleArticleScreen;
