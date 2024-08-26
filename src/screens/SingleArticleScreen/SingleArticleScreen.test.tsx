import React from 'react';
import {render} from '@testing-library/react-native';
import {useRoute} from '@react-navigation/native';
import SingleArticleScreen from './SingleArticleScreen';

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
    (useRoute as jest.Mock).mockReturnValue({
      params: {url: 'https://google.com'},
    });

    const {toJSON} = render(<SingleArticleScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot when URL is not provided', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {url: ''},
    });

    const {toJSON} = render(<SingleArticleScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
