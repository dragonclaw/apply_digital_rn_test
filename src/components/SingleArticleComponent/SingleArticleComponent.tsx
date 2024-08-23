import React from 'react';
import {
  CardDivider,
  CardSubTitle,
  CardTitle,
  SingleArticleCard,
} from './SingleArticleComponent.styles';
import {relativeTimeFromElapsed} from '../../utils/convertTime';

interface ArticleData {
  [key: string]: any;
}

const SingleArticleComponent: React.FC<ArticleData> = ({SingleArticle}) => {
  return (
    <SingleArticleCard>
      <CardTitle>{SingleArticle.title || SingleArticle.story_title}</CardTitle>
      <CardDivider />
      <CardSubTitle>
        {SingleArticle.author} -{' '}
        {relativeTimeFromElapsed(SingleArticle.created_at)}
      </CardSubTitle>
    </SingleArticleCard>
  );
};

export default SingleArticleComponent;
