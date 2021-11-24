import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function onError(error) {
  Notify.failure('Something went wrong');
}
