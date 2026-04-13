import { ALL_RECIPES, fetchAllRecipes, indexCard } from "./recipe_data.js";

await fetchAllRecipes();
for (const recipe of ALL_RECIPES.values()) {
  document.getElementById("mainColumn").appendChild(indexCard(recipe));
}
