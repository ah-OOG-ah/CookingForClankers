import { getFavorites, initFavorites } from "./favorites.js";
import {
  fetchRecipe,
  fetchRecipeStory,
  storyPreview,
  recipeImage,
} from "./recipe_data.js";

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
    const [recipe, story] = await Promise.all([
      fetchRecipe(id),
      fetchRecipeStory(id),
    ]);

    const recipeCard = document.createElement("recipe-card");
    recipeCard.className = "col";
    recipeCard.setAttribute("id", id);
    recipeCard.setAttribute("name", recipe.name);
    recipeCard.setAttribute("img-src", recipeImage(recipe));
    recipeCard.setAttribute("story", storyPreview(story));

    container.appendChild(recipeCard);

    recipeCard.style.cursor = "pointer";
    recipeCard.addEventListener("click", (e) => {
      if (e.target.closest(".favorite-btn")) return;

      window.location.href = `recipe.html?id=${id}`;
    });
  }
}

// get list of favorites from local storage
const favoriteIds = getFavorites();

await populatePage(favoriteIds);

// initialize favorites heart button listeners
initFavorites();
