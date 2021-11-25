import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ref } from './ref-var';
import { searchObject } from './ref-var';
import { renderPictures } from './render';

export function picturesDwnloading({ hits, total, totalHits }) {
  searchObject.foundPictures = totalHits;
  searchObject.foundTotalPictures = total;
  if (searchObject.foundTotalPictures > 0) {
    renderPictures(hits);
    Notify.info(
      `Found ${searchObject.foundTotalPictures} photo, but we will show you only ${
        searchObject.foundPictures
      }, showing ${
        searchObject.foundPictures < searchObject.per_page * searchObject.page
          ? searchObject.foundPictures
          : searchObject.per_page * searchObject.page
      }`,
    );

    if (searchObject.foundPictures - searchObject.per_page * searchObject.page <= 0) {
      ref.nextPortion.classList.add('visually-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      searchObject.page += 1;
      ref.nextPortion.textContent = `Load more ${searchObject.per_page} photo`;
      ref.nextPortion.classList.remove('visually-hidden');
    }
  }
}
