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
import {
  CardArticleComponentProps,
  NavigationTypes,
} from './CardArticleComponent.types';
import {Button, ListItem} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Article} from '../ArticleListComponent/ArticleList.types';

const deleteArticle = async (SingleArticle: Article, fetchList: () => void) => {
  const currentArray =
    JSON.parse((await AsyncStorage.getItem('deletedArticles')) as string) || [];
  currentArray.push(SingleArticle.story_id);
  await AsyncStorage.setItem('deletedArticles', JSON.stringify(currentArray));

  fetchList();
};

const SwipeAction = ({SingleArticle, fetchList}: CardArticleComponentProps) => (
  <Button
    // eslint-disable-next-line react-native/no-inline-styles
    containerStyle={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f4f4f4',
    }}
    type="clear"
    icon={{name: 'delete-outline'}}
    onPress={async () => await deleteArticle(SingleArticle, fetchList)}
  />
);

const CardArticleComponent = ({
  SingleArticle,
  fetchList,
}: CardArticleComponentProps) => {
  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  const handlePress = () => {
    navigation.navigate('SingleArticleScreen', {
      url: SingleArticle.url,
    });
  };

  return (
    <ListItem.Swipeable
      rightWidth={90}
      rightContent={SwipeAction({SingleArticle, fetchList})}>
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
