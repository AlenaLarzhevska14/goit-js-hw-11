import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

function initOrRefreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function createGallery(images) {
  const galleryContainer = document.getElementById('gallery');

  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          class="gallery-image"
          loading="lazy"
        />
        <div class="image-info">
          <p>
            <span class="icon">❤️</span>
            <strong>Likes:</strong> ${image.likes}
          </p>
          <p>
            <span class="icon">👁️</span>
            <strong>Views:</strong> ${image.views}
          </p>
          <p>
            <span class="icon">💬</span>
            <strong>Comments:</strong> ${image.comments}
          </p>
          <p>
            <span class="icon">📥</span>
            <strong>Downloads:</strong> ${image.downloads}
          </p>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  initOrRefreshLightbox();
}

export function clearGallery() {
  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';

  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('show-loader');
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.remove('show-loader');
}
