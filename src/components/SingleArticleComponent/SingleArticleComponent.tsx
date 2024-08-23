import {Text} from '@rneui/base';
import React from 'react';
import {SingleArticleCard} from './SingleArticleComponent.styles';

interface ArticleData {
  [key: string]: any;
}

const SingleArticleComponent: React.FC<ArticleData> = ({SingleArticle}) => {
  return (
    <SingleArticleCard>
      <Text>{SingleArticle.title || SingleArticle.story_title}</Text>
    </SingleArticleCard>
  );
};

export default SingleArticleComponent;
