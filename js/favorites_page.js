import { getFavorites, initFavorites } from "./favorites.js";
import { fetchRecipe, fetchRecipeStory, DATA_PATH } from "./recipe_data.js";

async function populatePage(favoriteIds) {
  const container = document.getElementById("favoritesContainer");

  if (!favoriteIds || favoriteIds.length == 0) {
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
    recipeCard.className = "col-4";
    recipeCard.setAttribute("id", id);
    recipeCard.setAttribute("name", recipe.name);
    recipeCard.setAttribute(
      "img-name",
      recipe.images[recipe.images.length - 1],
    );
    recipeCard.setAttribute("story", `${story.split(".")[0]}.`);

    container.appendChild(recipeCard);
  }
}

// get list of favorites from local storage
const favoriteIds = getFavorites();

await populatePage(favoriteIds);

// initialize favorites heart button listeners
initFavorites();
