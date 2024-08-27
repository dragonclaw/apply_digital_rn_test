import React from 'react';
import {ErrorComponentContainer, ErrorText} from './ErrorComponent.styles';

const ErrorComponent = () => {
  return (
    <ErrorComponentContainer>
      <ErrorText>Error fetching data</ErrorText>
    </ErrorComponentContainer>
  );
};

export default ErrorComponent;
