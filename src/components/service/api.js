import axios from 'axios';
import { paramsForNotify } from 'components/App';
import { Notify } from 'notiflix';

const KEY = '39449848-cd78062f4e5f4efb3b0cd07e5';
const URL = 'https://pixabay.com/api/';

export async function fetchPhoto(searchQuery, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`;
  const response = await axios.get(url);
  return response.data;
}

export function onFetchError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!',
    paramsForNotify
  );
}
