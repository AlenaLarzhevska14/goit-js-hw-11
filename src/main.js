import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './render-functions.js';

const searchForm = document.getElementById('searchForm');
const searchInput = document.querySelector('input[name="searchQuery"]');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        iziToast.success({
          title: 'Success',
          message: `Hooray! We found ${data.totalHits} images.`,
          position: 'topRight',
        });

        createGallery(data.hits);
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
