import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = event.target.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({
      title: "Увага",
      message: "Поле пошуку не може бути порожнім!",
      position: "topRight",
      backgroundColor: "#ffc107",
      maxWidth: 400,
      timeout: 3000
    });
    return;
  }

  clearGallery();
  showLoader(); 

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.info({
        title: "Немає результатів",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
        backgroundColor: "#ff4d4d",
        titleColor: "#fff",
        messageColor: "#fff",
        maxWidth: 432,
        timeout: 3000
      });
      return;
    }

    createGallery(data.hits);
  } catch (error) {
    iziToast.error({
      title: "Помилка",
      message: "Не вдалося завантажити зображення.",
      position: "topRight",
      backgroundColor: "#ff4d4d",
      titleColor: "#fff",
      messageColor: "#fff",
      maxWidth: 400,
      timeout: 3000
    });
  } finally {
    hideLoader();
  }
});