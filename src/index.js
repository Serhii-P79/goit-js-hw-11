import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ref } from './function/ref-var';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchObject } from './function/ref-var';
import { picturesDwnloading } from './function/download';
import { onError } from './function/error';
import { getPhoto } from './function/axiosAPI';

ref.searchForm.addEventListener('submit', onSubmitSearch);

ref.nextPortion.addEventListener('click', onNextPortion);

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

function onNextPortion() {
  getPhoto(searchObject).then(picturesDwnloading).catch(onError);
}
