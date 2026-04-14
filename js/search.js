import {
  ALL_RECIPES,
  fetchAllRecipes,
  fetchAllStories,
  indexCard,
} from "./recipe_data.js";
import Fuse from "../node_modules/fuse.js/dist/fuse.min.mjs";
import { initFavorites } from "./favorites.js";

await fetchAllRecipes();

const urlParams = new URLSearchParams(window.location.search);
const searchString = urlParams.get("query");
document.getElementById("searchSpan").innerText = searchString;

/** @type {Fuse<Recipe>} **/
const fuse = new Fuse(ALL_RECIPES.values().toArray(), { keys: ["name"] });
// noinspection JSValidateTypes The proper types are sadly only visible with Typescript.
/** @type {FuseResult<Recipe>[]} **/
const results = fuse.search(searchString);

const total = results.length;
let shown = 0;

function updateResults() {
  shown = Math.min(shown + 5, total);
  document.getElementById("totalCount").innerText = total.toString();
  document.getElementById("shownCount").innerText = shown.toString();

  const mainCol = document.getElementById("mainColumn");
  mainCol.replaceChildren(
    ...results.slice(0, shown).map((result) => {
      const recipe = result.item;
      const card = indexCard(recipe);
      return card;
    }),
  );

  if (shown >= total) {
    document.getElementById("loadMoreCol").className += " d-none";
  }
  initFavorites();
}

await fetchAllStories();
updateResults();
document.getElementById("loadMore").addEventListener("click", updateResults);
