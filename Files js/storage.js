
export function get_favorites() {
  const favorites = localStorage.getItem("favorites");

  if (favorites) {
    return JSON.parse(favorites);
  }

  return [];
}

export function save_favorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
