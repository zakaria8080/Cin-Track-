
import { get_movies } from "./api.js";
import { get_favorites, save_favorites } from "./storage.js";
import {
  show_movies,
  show_pagination,
  show_favorites,
  show_modal
} from "./render.js";

let movies = [];
let favorites = get_favorites();
let page = 1;

const search = document.querySelector("#search");
const filter = document.querySelector("#filter");
const movies_container = document.querySelector("#movies");
const modal = document.querySelector("#modal");

function get_filtered_movies() {
  let result = movies;

  if (search.value !== "") {
    result = result.filter(function (movie) {
      return movie.title.toLowerCase().includes(search.value.toLowerCase());
    });
  }

  if (filter.value !== "all") {
    result = result.filter(function (movie) {
      return movie.type === filter.value;
    });
  }

  return result;
}

function display() {
  const result = get_filtered_movies();

  show_movies(result, page, favorites);
  show_pagination(result.length, page);
  show_favorites(favorites);
}

function add_favorite(id) {
  const movie = movies.find(function (item) {
    return item.id === id;
  });

  const exists = favorites.find(function (item) {
    return item.id === id;
  });

  if (exists) {
    favorites = favorites.filter(function (item) {
      return item.id !== id;
    });
  } else {
    favorites.push(movie);
  }

  save_favorites(favorites);
  display();
}

search.addEventListener("input", function () {
  page = 1;
  display();
});

filter.addEventListener("change", function () {
  page = 1;
  display();
});

movies_container.addEventListener("click", function (event) {
  const favorite_button = event.target.closest(".favorite");
  const details_button = event.target.closest(".details");

  if (favorite_button) {
    add_favorite(favorite_button.dataset.id);
  }

  if (details_button) {
    const movie = movies.find(function (item) {
      return item.id === details_button.dataset.id;
    });

    if (movie) {
      show_modal(movie);
    }
  }
});

document.querySelector("#favorites").addEventListener("click", function (event) {
  if (event.target.classList.contains("remove")) {
    const id = event.target.dataset.id;

    favorites = favorites.filter(function (movie) {
      return movie.id !== id;
    });

    save_favorites(favorites);
    display();
  }
});

document.addEventListener("changePage", function (event) {
  page = event.detail;
  display();
});

document.querySelector("#closeModal").addEventListener("click", function () {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

async function init() {
  try {
    movies = await get_movies();

    const total_movies = movies.reduce(function (total, movie) {
      return total + 1;
    }, 0);

    console.log("Total movies :", total_movies);

    display();

  } catch (error) {
    document.querySelector("#message").textContent =
      "Impossible de charger le catalogue : " + error.message;
  }
}

init();
