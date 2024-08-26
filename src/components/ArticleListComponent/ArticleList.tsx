import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Container} from './ArticleList.styles';
import CardArticleComponent from '../CardArticleComponent/CardArticleComponent';
import {ArticleListProps} from './ArticleList.types';

const ArticleList: React.FC<ArticleListProps> = ({
  data,
  onRefresh,
  shouldSwipe,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <Container>
      <FlatList
        testID="flatlist"
        data={data}
        renderItem={({item}) => (
          <CardArticleComponent
            SingleArticle={item}
            fetchList={onRefresh}
            shouldSwipe={shouldSwipe}
          />
        )}
        keyExtractor={(item, index) => 'key' + index}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};

export default ArticleList;
