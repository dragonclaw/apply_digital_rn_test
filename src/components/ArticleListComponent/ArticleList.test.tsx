import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ArticleList from './ArticleList'; // Adjust the import path as necessary

// Mock data
const mockData = [
  {
    exhaustive: {
      nbHits: false,
      typo: false,
    },
    exhaustiveNbHits: false,
    exhaustiveTypo: false,
    hits: [
      {
        _highlightResult: {
          author: {
            matchLevel: 'none',
            matchedWords: [],
            value: 'evanjrowley',
          },
          comment_text: {
            fullyHighlighted: false,
            matchLevel: 'full',
            matchedWords: ['mobile'],
            value:
              "I went though a similar problem about 10 years ago. In my case, the phone (iPhone 4S) wasn't lost, but it's clock was perpetually off. The WiFi radio had failed and the Stratum 1 time server on my <em>mobile</em> network seemed to be sending it the wrong time. This resulted in all of the MFA TOTPs getting rejected and me not being able to access Gmail for a year. Despite the clock issue, many things still worked, presumably because this was still back when much of the internet used either weak or zero TLS/SSL.",
          },
          story_title: {
            matchLevel: 'none',
            matchedWords: [],
            value:
              'Never enable 2FA for accounts that you actually care about (2023)',
          },
          story_url: {
            matchLevel: 'none',
            matchedWords: [],
            value:
              'https://benwilber.github.io/2023/07/17/never-enable-2fa-for-accounts-you-actually-care-about.html',
          },
        },
        _tags: ['comment', 'author_evanjrowley', 'story_41316029'],
        author: 'evanjrowley',
        comment_text:
          'I went though a similar problem about 10 years ago. In my case, the phone (iPhone 4S) wasn&#x27;t lost, but it&#x27;s clock was perpetually off. The WiFi radio had failed and the Stratum 1 time server on my mobile network seemed to be sending it the wrong time. This resulted in all of the MFA TOTPs getting rejected and me not being able to access Gmail for a year. Despite the clock issue, many things still worked, presumably because this was still back when much of the internet used either weak or zero TLS&#x2F;SSL.',
        created_at: '2024-08-22T02:14:57Z',
        created_at_i: 1724292897,
        objectID: '41316141',
        parent_id: 41316029,
        story_id: 41316029,
        story_title:
          'Never enable 2FA for accounts that you actually care about (2023)',
        story_url:
          'https://benwilber.github.io/2023/07/17/never-enable-2fa-for-accounts-you-actually-care-about.html',
        updated_at: '2024-08-22T02:35:33Z',
      },
    ],
    hitsPerPage: 20,
    nbHits: 325262,
    nbPages: 50,
    page: 0,
    params: 'query=mobile&advancedSyntax=true&analyticsTags=backend',
    processingTimeMS: 15,
    processingTimingsMS: {},
    query: 'mobile',
    serverTimeMS: 17,
  },
];

// Mock onRefresh function
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
    const {toJSON} = render(
      <ArticleList data={mockData} onRefresh={mockOnRefresh} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles refresh', async () => {
    const {getByTestId} = render(
      <ArticleList data={mockData} onRefresh={mockOnRefresh} />,
    );

    // Trigger refresh
    fireEvent(getByTestId('flatlist'), 'onRefresh');

    // Wait for the refresh to complete
    await waitFor(() => expect(mockOnRefresh).toHaveBeenCalled());
  });
});
