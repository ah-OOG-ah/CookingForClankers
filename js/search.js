import {
  ALL_RECIPES,
  fetchAllRecipes,
  fetchAllStories,
  indexCard,
} from "./recipe_data.js";
import Fuse from "../node_modules/fuse.js/dist/fuse.mjs";
import { initFavorites } from "./favorites.js";

await fetchAllRecipes();

const urlParams = new URLSearchParams(window.location.search);
let searchString = urlParams.get("query");
/** @type HTMLInputElement **/
const searchInput = document.getElementById("searchSpan");
searchInput.value = searchString;
/** @type HTMLInputElement **/
const ingredientInput = document.getElementById("ingredients");

/** @type {Fuse<Recipe>} A Fuse index on the recipes, using only the name as a key. **/
const fuseNamesOnly = new Fuse(ALL_RECIPES.values().toArray(), {
  keys: ["name"],
  threshold: 0.2,
  useTokenSearch: true,
});
// noinspection JSValidateTypes The proper types are sadly only visible with Typescript.
/** @type {Recipe[]} **/
let results = fuseNamesOnly.search(searchString).map((r) => r.item);

let total = results.length;
// Starts at zero and is updated by loadMore, since the search page may *start* with <5 results
let shown = 0;

const filterForm = document.getElementById("filters");

/**
 * Creates a new Fuse index for ingredient search. This is because, for whatever reason, running a logical search seems
 * to invalidate the index. Instead, we chain two token searches.
 * @param {Recipe[]} values
 * @returns Fuse
 */
function makeFuse(values) {
  return new Fuse(values, {
    keys: ["ingredientString"],
    threshold: 0.2,
    useTokenSearch: true,
  });
}

/**
 * Extract user filters from the DOM.
 * @return {{function(Recipe):boolean}[]}
 **/
function getFilters() {
  const formData = new FormData(filterForm);
  const filters = [];

  const season = formData.get("season");
  if (season !== "Any") filters.push((r) => r.season === season);
  const category = formData.get("category");
  if (category !== "Any") filters.push((r) => r.category === category);
  return filters;
}

/**
 * Updates the search results, then refreshes the DOM.
 **/
function updateResults() {
  const filters = getFilters();
  searchString = searchInput.value;

  results = fuseNamesOnly.search(searchString).map((r) => r.item);
  // Ingredient search is more expensive, skip it if we don't need it
  if (ingredientInput.value !== "")
    results = makeFuse(results)
      .search(ingredientInput.value)
      .map((r) => r.item);

  for (const filter of filters) {
    results = results.filter((v, i, a) => filter(v));
  }

  // Sort the results according to the user's wishes. All of these sorts should sort
  // descending.
  const sortOrder = document.getElementById("sortBy");
  switch (sortOrder.value) {
    case "Relevance": {
      break;
    }
    case "Name (A-Z)": {
      results.sort((a, b) => b.name.localeCompare(a.name));
      break;
    }
    case "Prep Time": {
      break;
    }
    case "Difficulty": {
      break;
    }
  }

  // And reverse it if needed.
  if (document.getElementById("order").value === "Ascending") {
      results.reverse();
  }

  updateCount();
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

const loadMoreCol = document.getElementById("loadMoreCol");
function updateLoadMoreBtn() {
  if (shown >= total) {
    loadMoreCol.className += " d-none";
  } else {
    loadMoreCol.className = loadMoreCol.className.replaceAll(" d-none", "");
  }
}

function updatePage() {
  document.getElementById("totalCount").innerText = total.toString();
  document.getElementById("shownCount").innerText = shown.toString();

  const mainCol = document.getElementById("mainColumn");
  mainCol.replaceChildren(
    ...results.slice(0, shown).map((recipe) => indexCard(recipe)),
  );

  updateLoadMoreBtn();
  initFavorites();
}

await fetchAllStories();
loadMore();
updatePage();
document.getElementById("loadMore").addEventListener("click", () => {
  loadMore();
  updatePage();
});

filterForm.addEventListener("input", updateResults);
searchInput.addEventListener("input", updateResults);
