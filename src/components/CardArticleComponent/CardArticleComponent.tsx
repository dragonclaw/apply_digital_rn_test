import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  CardContainer,
  CardDivider,
  CardSubTitle,
  CardTitle,
  SingleArticleCard,
} from './CardArticleComponent.styles';
import {relativeTimeFromElapsed} from '../../utils/utils';
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
  currentArray.push(SingleArticle);
  await AsyncStorage.setItem('deletedArticles', JSON.stringify(currentArray));
  fetchList();
};

const favoriteArticle = async (
  SingleArticle: Article,
  fetchList: () => void,
) => {
  const currentArray =
    JSON.parse((await AsyncStorage.getItem('favoritedArticles')) as string) ||
    [];
  currentArray.push(SingleArticle);
  await AsyncStorage.setItem('favoritedArticles', JSON.stringify(currentArray));
  fetchList();
};

const SwipeActionDeleted = ({
  SingleArticle,
  fetchList,
  shouldSwipe,
}: CardArticleComponentProps) =>
  shouldSwipe && (
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

const SwipeActionFavorites = ({
  SingleArticle,
  fetchList,
  shouldSwipe,
}: CardArticleComponentProps) =>
  shouldSwipe && (
    <Button
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
      }}
      type="clear"
      icon={{name: 'star-outline'}}
      onPress={async () => await favoriteArticle(SingleArticle, fetchList)}
    />
  );

const CardArticleComponent = ({
  SingleArticle,
  fetchList,
  shouldSwipe,
}: CardArticleComponentProps) => {
  const navigation = useNavigation<NavigationProp<NavigationTypes>>();

  const handlePress = () => {
    navigation.navigate('SingleArticleScreen', {
      url: SingleArticle.url,
    });
  };

  return (
    <ListItem.Swipeable
      testID="card-article-component"
      rightWidth={90}
      rightContent={SwipeActionDeleted({SingleArticle, fetchList, shouldSwipe})}
      leftContent={SwipeActionFavorites({
        SingleArticle,
        fetchList,
        shouldSwipe,
      })}>
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
