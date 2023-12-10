import axios from 'axios';

export async function fetchHits(query = '', page = '') {
  const URL = 'https://pixabay.com/api/?';
  const params = new URLSearchParams({
    key: '41126675-02409dbf4dae7acc6c172e504',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  return await axios.get(`${URL}&${params}`).then(response => {
    return response.data;
  });
}
