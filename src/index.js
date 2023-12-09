import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { apiSearch } from './js/api-set';

import { createCard } from './js/markup';

const form = document.querySelector('#search-form');

const gallery = document.querySelector('div.gallery');

const load = document.querySelector('.load-more');

let currentPage = 1;
let maxPages;
let searchQuery = '';
let firstSearch = true;

load.style.display = 'none';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', startSearch);

load.addEventListener('click', showMore);

async function startSearch(event) {
  event.preventDefault();

  load.style.display = 'none';

  gallery.innerHTML = '';

  lightbox.refresh();

  searchQuery = form.elements.searchQuery.value;

  currentPage = 1;

  Notiflix.Loading.arrows('Loading...');

  try {
    const { totalHits, hits } = await apiSearch(searchQuery, currentPage);

    Notiflix.Loading.remove();

    maxPages = Math.ceil(totalHits / 40);

    if (totalHits === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      gallery.insertAdjacentHTML('beforeend', createCard(hits));

      lightbox.refresh();

      if (currentPage < maxPages) {
        load.style.display = '';
      }
    }
    if (!firstSearch) {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    }
  } catch (error) {
    Notiflix.Loading.remove();

    Notiflix.Notify.failure(error.message);
  }
  firstSearch = false;
}

async function showMore(event) {
  event.preventDefault();
  currentPage += 1;

  if (currentPage > maxPages) {
    load.style.display = 'none';
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    Notiflix.Loading.circle('Searching...');
    try {
      const images = await apiSearch(searchQuery, currentPage);

      Notiflix.Loading.remove();

      gallery.insertAdjacentHTML('beforeend', createCard(images.hits));

      lightbox.refresh();
    } catch (error) {
      Notiflix.Loading.remove();

      Notiflix.Notify.failure(error.message);
    }
  }
}
