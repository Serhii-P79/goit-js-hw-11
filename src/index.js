import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ref = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  nextPortion: document.querySelector('.load-more'),
};

const searchObject = {
  searchPhrase: 'mouse',
  foundTotalPictures: 0,
  foundPictures: 0,
  page: 1,
  per_page: 40,
  key: '24469565-02e5053fcb4f2a37c5c83268e',
  safesearch: true,
};

const axios = require('axios').default;

async function getPhoto({ searchPhrase, page, per_page, key, safesearch }) {
  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${key}&q=${searchPhrase}&image_type=photo&orientation=horizontal&safesearch=${safesearch}&page=${page}&per_page=${per_page}`,
    );
    return data;
  } catch (error) {
    return error;
  }
}

ref.searchForm.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(e) {
  e.preventDefault();
  searchObject.searchPhrase = e.target.elements.searchQuery.value.trim();

  if (searchObject.searchPhrase) {
    ref.gallery.innerHTML = '';
    getPhoto(searchObject).then(picturesDwnloading).catch(onError);
    return;
  }
  Notify.info('The search string is not specified.');
}

function onError(error) {
  Notify.failure('Something went wrong');
}

function picturesDwnloading({ hits, total, totalHits }) {
  searchObject.foundPictures = totalHits;
  searchObject.foundTotalPictures = total;
  renderPictures(hits);
  Notify.info(`Found ${total} photo, but we will show you only ${totalHits}`);
  searchObject.page += 1;
  if (searchObject.foundPictures - searchObject.per_page * searchObject.page <= 0) {
    ref.nextPortion.classList.add('visually-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  } else {
    ref.nextPortion.textContent = `Load more ${searchObject.per_page}`;
    ref.nextPortion.classList.remove('visually-hidden');
  }
}

function renderPictures(pictures) {
  const arrPictures = pictures
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
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
              </div>`;
    })
    .join('');
  ref.gallery.insertAdjacentHTML('beforeend', arrPictures);
}

ref.nextPortion.addEventListener('click', onNextPortion);

function onNextPortion() {
  getPhoto(searchObject).then(picturesDwnloading).catch(onError);
}
