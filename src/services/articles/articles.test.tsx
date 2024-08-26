import api from '../../api';
import articleService from './articles';

jest.mock('../../api');

describe('articleService', () => {
  describe('getArticles', () => {
    it('should return data when API call is successful', async () => {
      const mockData = {
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
      };

      (api as jest.MockedFunction<typeof api>).mockResolvedValue({
        status: 200,
        data: mockData,
      });

      const result = await articleService.getArticles();

      expect(api).toHaveBeenCalledWith({
        url: '/search_by_date',
        params: {
          query: 'mobile',
          tags: 'story',
        },
        method: 'get',
      });
      expect(result).toEqual(mockData.hits);
    });

    it('should throw an error when API call fails', async () => {
      const mockError = new Error('API call failed');
      (api as jest.MockedFunction<typeof api>).mockRejectedValue(mockError);

      await expect(articleService.getArticles()).rejects.toThrow(
        'API call failed',
      );

      expect(api).toHaveBeenCalledWith({
        url: '/search_by_date',
        params: {
          query: 'mobile',
          tags: 'story',
        },
        method: 'get',
      });
    });
  });
});
