import React from 'react';

import {
  LoadingComponentContainer,
  LoadingIndicator,
} from './LoadingComponent.styles';

const LoadingComponent = () => {
  return (
    <LoadingComponentContainer>
      <LoadingIndicator size={50} color={'#aaa'} />
    </LoadingComponentContainer>
  );
};

export default LoadingComponent;
