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
let searchString = urlParams.get("query");
document.getElementById("searchSpan").innerText = searchString;

/** @type {Fuse<Recipe>} **/
const fuse = new Fuse(ALL_RECIPES.values().toArray(), { keys: ["name"] });
// noinspection JSValidateTypes The proper types are sadly only visible with Typescript.
/** @type {FuseResult<Recipe>[]} **/
let results = fuse.search(searchString);

let total = results.length;
let shown = 0;

/** @param {function(Recipe):boolean} filters **/
function updateResults(...filters) {
  results = fuse.search(searchString);
  for (const filter of filters) {
    results = results.filter((r) => filter(r.item));
  }
  updateCount()
  updatePage();
}

function updateCount() {
    total = results.length;
    // Try to display at *least* five, but at *most* whatever we had before OR the most we can show.
    shown = Math.min(Math.max(shown, 5), total);
}

function loadMore() {
  shown = Math.min(shown + 5, total);
}

function updatePage() {
  document.getElementById("totalCount").innerText = total.toString();
  document.getElementById("shownCount").innerText = shown.toString();

  const mainCol = document.getElementById("mainColumn");
  mainCol.replaceChildren(
    ...results.slice(0, shown).map((result) => {
      const recipe = result.item;
      return indexCard(recipe);
    }),
  );

  updateLoadMoreBtn();
  initFavorites();
}

const loadMoreCol = document.getElementById("loadMoreCol");
function updateLoadMoreBtn() {
    if (shown >= total) {
        loadMoreCol.className += " d-none";
    } else {
        loadMoreCol.className = loadMoreCol.className.replaceAll(" d-none", "");
    }
}

await fetchAllStories();
loadMore();
updatePage();
document.getElementById("loadMore").addEventListener("click", () => {
  loadMore();
  updatePage();
});

const filterForm = document.getElementById("filters");
filterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(filterForm);
  const season = formData.get("season");
  if (season === "Any") updateResults();
  else updateResults((r) => r.season === season);
});
