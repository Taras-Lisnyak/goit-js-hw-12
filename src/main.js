import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector("#load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const query = event.target.elements["search-text"].value.trim();

  if (!query) {
    return showToast("warning", "Увага", "Поле пошуку не може бути порожнім!", "#ffc107");
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(currentQuery, currentPage, perPage);
    totalHits = total;

    if (!hits.length) {
      return showToast(
        "info",
        "Немає результатів",
        "Sorry, there are no images matching your search query. Please try again!",
        "#ff4d4d",
        "#fff"
      );
    }

    createGallery(hits);

    if (hits.length < perPage || currentPage * perPage >= totalHits) {
      hideLoadMore();
      showToast("info", "Кінець колекції", "We're sorry, but you've reached the end of search results.", "#17a2b8", "#fff");
    } else {
      showLoadMore();
    }
  } catch (error) {
    showToast("error", "Помилка", "Не вдалося завантажити зображення.", "#ff4d4d", "#fff");
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage, perPage);

    if (!hits.length) {
      hideLoadMore();
      return showToast("info", "Кінець колекції", "We're sorry, but you've reached the end of search results.", "#17a2b8", "#fff");
    }

    createGallery(hits);
    smoothScroll(); 

    if (currentPage * perPage >= totalHits) {
      hideLoadMore();
      showToast("info", "Кінець колекції", "We're sorry, but you've reached the end of search results.", "#17a2b8", "#fff");
    }
  } catch (error) {
    showToast("error", "Помилка", "Не вдалося завантажити додаткові зображення.", "#ff4d4d", "#fff");
  } finally {
    hideLoader();
  }
}



function smoothScroll() {
  const firstCard = document.querySelector(".gallery-item");
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}



function showToast(type, title, message, backgroundColor, textColor = "#000") {
  iziToast[type]({
    title,
    message,
    position: "topRight",
    backgroundColor,
    titleColor: textColor,
    messageColor: textColor,
    maxWidth: 400,
    timeout: 3000,
  });
}


function showLoadMore() {
  loadMoreBtn.classList.remove("hidden");
}

function hideLoadMore() {
  loadMoreBtn.classList.add("hidden");
}

