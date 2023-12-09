import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function apiSearch(searchQuery, currentPage) {
  try {
    const respose = await axios.get('', {
      params: {
        key: '41126675-02409dbf4dae7acc6c172e504',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: '40',
      },
    });
    return respose.data;
  } catch (error) {
    console.log('error: ', error.message);
    throw error;
  }
}

export { apiSearch };
