import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Container} from './ArticleList.styles';
import CardArticleComponent from '../CardArticleComponent/CardArticleComponent';
import {ArticleListProps} from './ArticleList.types';

const ArticleList: React.FC<ArticleListProps> = ({data, onRefresh}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <CardArticleComponent SingleArticle={item} fetchList={onRefresh} />
        )}
        keyExtractor={item => item.created_at_i}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};

export default ArticleList;
