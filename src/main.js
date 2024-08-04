import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api.js';
import { renderImage, handleImageClear } from './js/render-functions';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');

let page = 1;
let searchValue = '';

form.addEventListener('submit', handleSearch);
loadBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  handleImageClear();

  loader.classList.add('loader-active');

  searchValue = form.elements.search.value.trim();

  page = 1;

  await fetchImages();

  form.reset();
}

async function fetchImages() {
  try {
    const data = await searchImages(searchValue, page);

    loader.classList.remove('loader-active');
    renderImage(data);
    smoothScroll();

    if (data.total === 0 || searchValue === '') {
      loadBtn.classList.add('hidden');
      return iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        theme: 'dark',
      });
    } else if (data.hits.length === 0 || page * 15 >= data.totalHits) {
      loadBtn.classList.add('hidden');
      return iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadBtn.classList.remove('hidden');
    }
  } catch (error) {
    return iziToast.error({
      title: 'Error',
      titleColor: '#fff',
      message: `${error}`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      theme: 'dark',
    });
  }
}

async function handleLoadMore() {
  page += 1;
  loadBtn.classList.add('hidden');
  loader.classList.add('loader-active');
  await fetchImages();
}

function smoothScroll() {
  const gallery = document.querySelector('.gallery');
  const height = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
