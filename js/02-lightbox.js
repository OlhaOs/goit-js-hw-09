import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryList = document.querySelector('.gallery');
galleryList.insertAdjacentHTML('beforeend', renderGallery(galleryItems));

galleryList.addEventListener('click', onGalleryItemClick);

function renderGallery(gallery) {
  return gallery
    .map(
      ({ preview, original, description }) => `
        <a class="gallery__item" href="${original}">
             <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`
    )
    .join('');
}
function onGalleryItemClick(e) {
  e.preventDefault();
  const isImageClick = e.target.classList.contains('gallery__image');
  if (!isImageClick) {
    return;
  }

  openGallery();
}

function openGallery() {
  let lightbox = new SimpleLightbox('.gallery a', {
    // captionSelector: 'img',
    // captionType: 'attr',
    captionsData: 'alt',
    // captionPosition: 'top',
    captionDelay: 250,
    // enableKeyboard: true,
    maxZoom: 0,
    fadeSpeed: 700,
  });
  lightbox.open();
}
