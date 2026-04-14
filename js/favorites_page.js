import { getFavorites, initFavorites } from "./favorites.js";
import { fetchRecipe, indexCard, fetchAllStories } from "./recipe_data.js";

async function populatePage(favoriteIds) {
  const container = document.getElementById("favoritesContainer");

  if (!favoriteIds || favoriteIds.length === 0) {
    container.textContent =
      "You haven't liked any recipes yet! " +
      "Click the heart icon above some recipes " +
      "to add them to your favorites, and they'll show up here.";
    return;
  }

  // for each favorite ID, populate page with recipe card
  for (const id of favoriteIds) {
    const recipe = await fetchRecipe(id);
    container.appendChild(indexCard(recipe));
  }
}

// get list of favorites from local storage
const favoriteIds = getFavorites();
await fetchAllStories();
await populatePage(favoriteIds);

// initialize favorites heart button listeners
initFavorites();
