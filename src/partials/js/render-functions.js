import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function createGallery(images) {
  const gallery = document.getElementById('gallery');

  const galleryMarkup = images
    .map(
      image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}">
                <img 
                    src="${image.webformatURL}" 
                    alt="${image.tags}"
                    class="gallery-image"
                    loading="lazy"
                />
                <div class="image-info">
                    <div class="info-item">
                        <span class="info-label">Likes</span>
                        <span class="info-value">${image.likes}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Views</span>
                        <span class="info-value">${image.views}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Comments</span>
                        <span class="info-value">${image.comments}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Downloads</span>
                        <span class="info-value">${image.downloads}</span>
                    </div>
                </div>
            </a>
        </li>
    `
    )
    .join('');

  gallery.innerHTML = galleryMarkup;

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  const loader = document.getElementById('loader');
  loader.classList.remove('hidden');
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('hidden');
}
