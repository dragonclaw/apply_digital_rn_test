import styled from 'styled-components';
import {ActivityIndicator, View} from 'react-native';

export const LoadingComponentContainer = styled(View)`
  flex: 1;
`;
export const LoadingIndicator = styled(ActivityIndicator)`
  flex: 1;
  align-self: center;
  justify-content: center;
`;
