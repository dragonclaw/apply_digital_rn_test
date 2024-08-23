import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  CardContainer,
  CardDivider,
  CardSubTitle,
  CardTitle,
  SingleArticleCard,
} from './CardArticleComponent.styles';
import {relativeTimeFromElapsed} from '../../utils/convertTime';
import {ArticleData, NavigationTypes} from './CardArticleComponent.types';
import {Button, ListItem} from '@rneui/themed';

const SwipeAction: React.FC = () => (
  <Button
    // eslint-disable-next-line react-native/no-inline-styles
    containerStyle={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f4f4f4',
    }}
    type="clear"
    icon={{name: 'delete-outline'}}
    onPress={() => console.log('delete')}
  />
);

const CardArticleComponent: React.FC<ArticleData> = ({SingleArticle}) => {
  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  const handlePress = () => {
    if (SingleArticle.url) {
      navigation.navigate('SingleArticleScreen', {article: SingleArticle});
    }
  };

  return (
    <ListItem.Swipeable rightWidth={90} rightContent={SwipeAction}>
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
    </ListItem.Swipeable>
  );
};

export default CardArticleComponent;
