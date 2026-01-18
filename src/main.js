import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  initLightbox,
} from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const searchInput = searchForm.querySelector('input[name="search-text"]');

initLightbox();

iziToast.settings({
  position: 'topRight',
  timeout: 5000,
});

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    return;
  }

  clearGallery();

  showLoader();

  try {
    const data = await getImagesByQuery(query);

    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${data.totalHits} images.`,
    });
  } catch (error) {
    // Ховаємо лоадер
    hideLoader();

    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    console.error('Error:', error);
  }

  searchInput.value = '';
});
