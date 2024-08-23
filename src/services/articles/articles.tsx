import api from '../../api';

export default {
  getArticles: async () => {
    const config = {
      url: '/search_by_date',
      params: {
        query: 'mobile',
      },
      method: 'get',
    };
    try {
      const response = await api(config);
      if (response.status === 200 && response.data) {
        console.log('did load?');
        return response.data.hits;
      }
      throw new Error('Error getting data');
    } catch (err) {
      throw err;
    }
  },
};
