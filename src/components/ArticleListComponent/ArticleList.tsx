import {Text, View, FlatList} from 'react-native';
import React from 'react';

interface Article {
  created_at_i: string;
  [key: string]: any;
}

interface ArticleListProps {
  data: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({data}) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Text>{JSON.stringify(item.title || item.story_title)}</Text>
        )}
        keyExtractor={item => item.created_at_i}
      />
    </View>
  );
};

export default ArticleList;
