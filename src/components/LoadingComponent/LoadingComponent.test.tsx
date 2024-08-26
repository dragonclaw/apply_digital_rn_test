import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingComponent from './LoadingComponent'; // Adjust the import path as necessary

describe('LoadingComponent', () => {
  it('matches the snapshot', () => {
    const {toJSON} = render(<LoadingComponent />);
    expect(toJSON()).toMatchSnapshot();
  });
});
