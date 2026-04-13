import { initFavorites } from "./favorites.js";
import {
  ALL_RECIPES,
  fetchAllRecipes,
  fetchRecipeStory,
  recipeImage,
  storyPreview,
} from "./recipe_data.js";

await fetchAllRecipes();
for (const recipe of ALL_RECIPES.values()) {
  const card = document.createElement("recipe-card");
  card.className = "col";
  card.setAttribute("id", recipe.id);
  card.setAttribute("name", recipe.name);
  card.setAttribute("img-src", recipeImage(recipe));
  card.setAttribute("story", storyPreview(await fetchRecipeStory(recipe.id)));

  document.getElementById("mainColumn").appendChild(card);
}

initFavorites();
