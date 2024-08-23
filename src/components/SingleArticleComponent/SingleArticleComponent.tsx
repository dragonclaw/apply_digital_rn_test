import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  CardContainer,
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
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SingleArticleScreen', {article: SingleArticle});
  };
  return (
    <CardContainer onPress={handlePress}>
      <SingleArticleCard>
        <CardTitle>
          {SingleArticle.title || SingleArticle.story_title}
        </CardTitle>
        <CardDivider />
        <CardSubTitle>
          {SingleArticle.author} -{' '}
          {relativeTimeFromElapsed(SingleArticle.created_at)}
        </CardSubTitle>
      </SingleArticleCard>
    </CardContainer>
  );
};

export default SingleArticleComponent;
