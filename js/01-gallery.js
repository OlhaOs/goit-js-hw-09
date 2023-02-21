import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

const gallery = renderGallery(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', gallery);

galleryEl.addEventListener('click', onGalleryItemClick);

function renderGallery(gallery) {
  return gallery
    .map(
      ({ original, preview, description }) =>
        `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
            </div> `
    )
    .join('');
}

function onGalleryItemClick(e) {
  e.preventDefault();

  const isOnImgClick = e.target.classList.contains('gallery__image');
  if (!isOnImgClick) {
    return;
  }

  openModalLightbox(e);
  window.addEventListener('keydown', onEscKeyPress);
}

let instance;

function openModalLightbox(event) {
  instance = basicLightbox.create(`
      <img src="${event.target.dataset.source}">
    `);
  instance.show();
  console.log(instance);
  console.dir(instance);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape' || 'return') {
    instance.close();
    window.removeEventListener('keydown', onEscKeyPress);
  }
}
