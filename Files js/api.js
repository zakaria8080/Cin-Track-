
import { api_url } from "./config.js";

export async function get_movies() {
  const response = await fetch(api_url);

  if (!response.ok) {
    throw new Error("Erreur serveur : " + response.status);
  }

  const movies = await response.json();

  return movies;
}
