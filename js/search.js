import { ALL_RECIPES, fetchAllRecipes, indexCard } from "./recipe_data.js";
import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@7.3.0";

await fetchAllRecipes();

const urlParams = new URLSearchParams(window.location.search);
const searchString = urlParams.get("query");
document.getElementById("searchSpan").innerText = searchString;

const fuseRecipes = new Fuse(ALL_RECIPES.values().toArray(), {
  keys: ["name"],
});
for (const match of fuseRecipes.search(searchString)) {
  document.getElementById("mainColumn").appendChild(indexCard(match.item));
}
