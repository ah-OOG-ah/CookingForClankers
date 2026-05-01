import {
  NUM_RECIPES,
  fetchRecipe,
  fetchAllStories,
  indexCard,
} from "./recipe_data.js";

const MILLISECONDS_PER_DAY = 8.64e7;

const storiesPromise = fetchAllStories();

const date = Math.trunc(Date.now() / MILLISECONDS_PER_DAY);
const recipeId = (date % NUM_RECIPES) + 1;

const recipe = await fetchRecipe(recipeId);
await storiesPromise;
document.getElementById("recipeOfTheDay").appendChild(indexCard(recipe));
