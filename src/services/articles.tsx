import api from '../api';

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
        console.log('inside getPromotion', response.data);
        return response.data;
      }
      throw new Error('Error en login');
    } catch (err) {
      return {err: err};
    }
  },
};
