import { ALL_RECIPES, fetchAllRecipes, indexCard } from "./recipe_data.js";
import Fuse from "../node_modules/fuse.js/dist/fuse.min.mjs";

await fetchAllRecipes();

const urlParams = new URLSearchParams(window.location.search);
const searchString = urlParams.get("query");
document.getElementById("searchSpan").innerText = searchString;

const fuse = new Fuse(ALL_RECIPES.values().toArray(), { keys: ["name"] });
const results = fuse.search(searchString);

const total = results.length;
let shown = Math.min(5, total);
document.getElementById("totalCount").innerText = total.toString();
document.getElementById("shownCount").innerText = shown.toString();

for (const match of results.slice(0, shown)) {
  document.getElementById("mainColumn").appendChild(indexCard(match.item));
}
