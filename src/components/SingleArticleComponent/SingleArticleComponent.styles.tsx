import styled from 'styled-components';

import {Card} from '@rneui/themed';
import {TouchableOpacity} from 'react-native';

export const CardContainer = styled(TouchableOpacity)``;
export const SingleArticleCard = styled(Card)``;
export const CardTitle = styled(Card.Title)`
  text-align: left;
`;
export const CardSubTitle = styled(Card.FeaturedSubtitle)`
  color: grey;
`;
export const CardDivider = styled(Card.Divider)``;
