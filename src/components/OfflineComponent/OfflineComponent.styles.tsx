import styled from 'styled-components';
import {View} from 'react-native';
import {Text} from '@rneui/base';

export const OfflineComponentContainer = styled(View)`
  height: 20px;
`;
export const OfflineText = styled(Text)`
  flex: 1;
  align-self: center;
  justify-content: center;
  background-color: red;
  color: white;
  border-radius: 5px;
`;
