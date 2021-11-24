import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ref } from './ref-var';
import { searchObject } from './ref-var';
import { renderPictures } from './render';

export function picturesDwnloading({ hits, total, totalHits }) {
  searchObject.foundPictures = totalHits;
  searchObject.foundTotalPictures = total;
  renderPictures(hits);
  Notify.info(`Found ${total} photo, but we will show you only ${totalHits}`);
  searchObject.page += 1;
  if (searchObject.foundPictures - searchObject.per_page * searchObject.page <= 0) {
    ref.nextPortion.classList.add('visually-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  } else {
    ref.nextPortion.textContent = `Load more ${searchObject.per_page} photo`;
    ref.nextPortion.classList.remove('visually-hidden');
  }
}
