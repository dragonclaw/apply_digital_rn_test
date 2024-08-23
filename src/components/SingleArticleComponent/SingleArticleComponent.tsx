import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  CardContainer,
  CardDivider,
  CardSubTitle,
  CardTitle,
  SingleArticleCard,
} from './SingleArticleComponent.styles';
import {relativeTimeFromElapsed} from '../../utils/convertTime';
import {ArticleData, NavigationTypes} from './SingleArticleComponent.types';

const SingleArticleComponent: React.FC<ArticleData> = ({SingleArticle}) => {
  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  const handlePress = () => {
    if (SingleArticle.url) {
      navigation.navigate('SingleArticleScreen', {article: SingleArticle});
    }
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
