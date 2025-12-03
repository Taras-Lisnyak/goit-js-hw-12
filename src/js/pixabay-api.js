import axios from "axios";

const API_KEY = "53511640-00e42e73f696871d7dee14b6b";
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return data;
  } catch (error) {
    console.error("Помилка при отриманні зображень:", error.message);
    throw error;
  }
}

