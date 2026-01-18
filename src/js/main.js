import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  initLightbox,
} from './render-functions.js';

const searchForm = document.getElementById('search-form');
const searchInput = searchForm.querySelector('input[name="search-text"]');

// Ініціалізація SimpleLightbox
initLightbox();

// Налаштування iziToast
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

  // Очищаємо попередні результати
  clearGallery();

  // Показуємо лоадер
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    // Ховаємо лоадер
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    // Показуємо результат
    createGallery(data.hits);

    // Показуємо повідомлення про успішний пошук
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

  // Очищаємо поле вводу
  searchInput.value = '';
});
