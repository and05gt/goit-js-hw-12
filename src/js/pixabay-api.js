import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const URL = 'https://pixabay.com/api/';
const API_KEY = '45098257-09112d803d024f473cdacef7f';

export async function searchImages(search, page = 1) {
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    return iziToast.error({
      title: 'Error',
      titleColor: '#fff',
      message: `${error}`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      theme: 'dark',
    });
  }
}
