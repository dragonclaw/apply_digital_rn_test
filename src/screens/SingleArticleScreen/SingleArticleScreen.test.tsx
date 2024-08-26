import React from 'react';
import {render} from '@testing-library/react-native';
import {useRoute} from '@react-navigation/native';
import SingleArticleScreen from './SingleArticleScreen'; // Adjust the import path as necessary

// Mock the useRoute hook
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('react-native-webview', () => {
  const {View} = require('react-native');
  return {
    WebView: ({source}: {source: {uri: string}}) => (
      <View testID="webview">{source.uri}</View>
    ),
  };
});

describe('SingleArticleScreen', () => {
  it('matches the snapshot when URL is provided', () => {
    // Mock the route params
    (useRoute as jest.Mock).mockReturnValue({
      params: {url: 'https://google.com'},
    });

    const {toJSON} = render(<SingleArticleScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot when URL is not provided', () => {
    // Mock the route params
    (useRoute as jest.Mock).mockReturnValue({
      params: {url: ''},
    });

    const {toJSON} = render(<SingleArticleScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
