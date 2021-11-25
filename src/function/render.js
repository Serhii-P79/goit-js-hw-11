import { ref } from './ref-var';
import { gallery } from './ref-var';

export function renderPictures(pictures) {
  const arrPictures = pictures
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <a href="${largeImageURL}">
              <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b>${likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b>${views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b>${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>${downloads}
                  </p>
                </div>
              </div>
        </a>`;
    })
    .join('');
  ref.gallery.insertAdjacentHTML('beforeend', arrPictures);
  gallery.refresh();
}
