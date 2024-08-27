import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ArticleList from './ArticleList';
import {createTheme, ThemeProvider} from '@rneui/themed';
import {Article} from './ArticleList.types';

Date.now = jest.fn(() => new Date('2023-01-01T01:00:00.00Z')) as any;

const mockData: Article[] = [
  {
    author: 'evanjrowley',
    created_at: '2024-08-22T02:14:57Z',
    story_id: 41316029,
    story_title:
      'Never enable 2FA for accounts that you actually care about (2023)',
    story_url:
      'https://benwilber.github.io/2023/07/17/never-enable-2fa-for-accounts-you-actually-care-about.html',
  },
];

const mockOnRefresh = jest.fn(() => Promise.resolve());
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('ArticleList Component', () => {
  it('matches the snapshot', () => {
    const theme = createTheme();
    const {toJSON} = render(
      <ThemeProvider theme={theme}>
        <ArticleList data={mockData} onRefresh={mockOnRefresh} />
      </ThemeProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles refresh', async () => {
    const {getByTestId} = render(
      <ArticleList data={mockData} onRefresh={mockOnRefresh} />,
    );
    fireEvent(getByTestId('flatlist'), 'onRefresh');
    await waitFor(() => expect(mockOnRefresh).toHaveBeenCalled());
  });
});
