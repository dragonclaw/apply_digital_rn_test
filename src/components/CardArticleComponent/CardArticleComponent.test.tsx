import React from 'react';
import {render} from '@testing-library/react-native';
import CardArticleComponent from './CardArticleComponent';

const mockArticle = {
  story_title: 'Test Story Title',
  author: 'Test Author',
  created_at: '2023-01-01',
};

const mockOnRefresh = jest.fn(() => Promise.resolve());

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('CardArticleComponent', () => {
  it('renders correctly with given props', () => {
    const {getByText} = render(
      <CardArticleComponent
        SingleArticle={mockArticle}
        fetchList={mockOnRefresh}
      />,
    );

    expect(getByText('Test Story Title')).toBeTruthy();
    expect(getByText('Test Author - 2 years ago')).toBeTruthy();
  });
});
