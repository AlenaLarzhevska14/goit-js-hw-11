import axios from 'axios';

const API_KEY = '54256939-386fc06a8d30040304fc0768b';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
