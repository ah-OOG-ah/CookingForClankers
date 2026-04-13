import { initFavorites } from "./favorites.js";
import {ALL_RECIPES, fetchAllRecipes, fetchAllStories, indexCard} from "./recipe_data.js";

await fetchAllRecipes();
await fetchAllStories();

for (const recipe of ALL_RECIPES.values()) {
  document.getElementById("mainColumn").appendChild(indexCard(recipe));
}

initFavorites();
