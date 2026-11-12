
import { per_page } from "./config.js";

export function show_movies(movies, page, favorites) {
  const movies_container = document.querySelector("#movies");
  const message = document.querySelector("#message");

  movies_container.innerHTML = "";

  const start = (page - 1) * per_page;
  const page_movies = movies.slice(start, start + per_page);

  message.textContent = movies.length + " résultat(s)";

  page_movies.map(function (movie) {
    const is_favorite = favorites.find(function (item) {
      return item.id === movie.id;
    });

    const card = document.createElement("div");

    card.className = "overflow-hidden rounded-lg bg-[#1c1c24]";

    card.innerHTML = `
            <img src="${movie.image}" class="h-36 w-full object-cover"
                 alt="${movie.title}">

            <div class="p-2">
                <h3 class="truncate text-sm font-bold">${movie.title}</h3>

                <p class="mt-1 text-xs text-gray-400">
                    ${movie.releaseYear}
                </p>

                <div class="mt-2 flex justify-between">
                    <button class="details text-xs text-blue-400"
                        data-id="${movie.id}">
                        Détails
                    </button>

                    <button class="favorite text-sm text-red-500"
                        data-id="${movie.id}">
                        ${is_favorite ? "♥" : "♡"}
                    </button>
                </div>
            </div>
        `;

    movies_container.appendChild(card);
  });
}

export function show_pagination(total, page) {
  const pagination = document.querySelector("#pagination");

  pagination.innerHTML = "";

  const pages = Math.ceil(total / per_page);

  for (let i = 1; i <= pages; i++) {
    const button = document.createElement("button");

    button.textContent = i;

    button.className = "rounded px-3 py-1 text-sm";

    if (i === page) {
      button.classList.add("bg-red-600");
    } else {
      button.classList.add("bg-[#25252e]");
    }

    button.addEventListener("click", function () {
      document.dispatchEvent(new CustomEvent("changePage", {
        detail: i
      }));
    });

    pagination.appendChild(button);
  }
}

export function show_favorites(favorites) {
  const container = document.querySelector("#favorites");
  const count = document.querySelector("#favoriteCount");

  container.innerHTML = "";

  count.textContent = favorites.length + " film(s)";

  favorites.map(function (movie) {
    const item = document.createElement("div");

    item.className = "flex items-center gap-2";

    item.innerHTML = `
            <img src="${movie.image}" class="h-12 w-9 rounded object-cover">

            <p class="flex-1 truncate text-xs">${movie.title}</p>

            <button class="remove text-red-500" data-id="${movie.id}">
                ×
            </button>
        `;

    container.appendChild(item);
  });
}

export function show_modal(movie) {
  const modal = document.querySelector("#modal");
  const content = document.querySelector("#modalContent");

  content.innerHTML = `
        <img src="${movie.image}" class="mb-3 h-52 w-full rounded object-cover">

        <h2 class="mb-2 text-xl font-bold">${movie.title}</h2>

        <p class="mb-2 text-xs text-gray-400">
            ${movie.releaseYear} - ${movie.type}
        </p>

        <p class="mb-2 text-sm">
            Genres : ${movie.genres}
        </p>

        <p class="text-sm text-gray-300">
            ${movie.description}
        </p>
    `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}
