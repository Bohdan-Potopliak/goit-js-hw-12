`use strict`
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import searchAPI from './js/pixabay-api';
import createMarkup from './js/render-functions';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.js-search-form');
const loader = document.getElementById('loader');

let lightbox;
let currentPage = 1;
let currentQuery = '';

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more-btn');
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

form.addEventListener('submit', handlerSearch);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handlerSearch(event) {
event.preventDefault();
const search = event.target.elements.search.value.trim();

if (!validateQuery(search)) return;

currentQuery = search;
currentPage = 1;
loader.style.display = 'flex';
gallery.innerHTML = '';
loadMoreBtn.style.display = 'none';

try {
    const data = await searchAPI(search, currentPage);
    processSearchResults(data);
} catch (error) {
    iziToast.error({
    message: `Something went wrong: ${error.message}`,
    });
} finally {
    loader.style.display = 'none';
}
}

async function loadMoreImages() {
currentPage += 1;
loader.style.display = 'flex';

try {
    const data = await searchAPI(currentQuery, currentPage);
    processSearchResults(data, true);
    smoothScroll();
} catch (error) {
    iziToast.error({
    message: `Something went wrong: ${error.message}`,
    });
} finally {
    loader.style.display = 'none';
}
}

function processSearchResults(data, append = false) {
if (data.hits.length === 0) {
    noResultsMessage();
    return;
}

if (append) {
    gallery.innerHTML += createMarkup(data.hits);
} else {
    gallery.innerHTML = createMarkup(data.hits);
}

lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
lightbox.refresh();

if (data.totalHits <= currentPage * 15) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    });
} else {
    loadMoreBtn.style.display = 'block';
}
}

function noResultsMessage() {
iziToast.error({
    message: 'Sorry, there are no images matching your search query. Please try again!',
});
}

function validateQuery(query) {
if (!query) {
    iziToast.warning({
    message: 'Please enter a search query.',
    });
    return false;
}
return true;
}

function smoothScroll() {
const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
});
}
