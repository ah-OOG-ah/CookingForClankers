import { initFavorites } from "./favorites.js";
import {fetchRecipe, fetchRecipeStory, recipeImage} from "./recipe_data.js";

const populateRecipeData = (recipe) => {
  console.debug(recipe);
  // if (!recipe) window.location.href = "404.html";

  document.querySelectorAll(".recipe-img-final").forEach((element) => {
    element.innerHTML = `
<img
  src="${recipeImage(recipe)}"
  class="img-fluid rounded-start"
  alt="${recipe.name}"
/>`;
  });

  document
    .querySelectorAll(".recipe-name")
    .forEach((element) => (element.textContent = recipe.name));

  document
    .querySelectorAll(".recipe-category")
    .forEach((element) => (element.textContent = recipe.category));

  document.querySelectorAll(".recipe-dietary").forEach((element) => {
    let dietaryThings = "";
    for (const dietary of recipe.dietary) {
      dietaryThings += `<li>${dietary}</li>`;
    }
    element.innerHTML = dietaryThings;
  });

  document
    .querySelectorAll(".recipe-season")
    .forEach((element) => (element.textContent = recipe.season));

  document
    .querySelectorAll(".recipe-cuisine")
    .forEach((element) => (element.textContent = recipe.cuisine));

  document
    .querySelectorAll(".recipe-prep-time")
    .forEach((element) => (element.textContent = recipe.prep_time));

  document
    .querySelectorAll(".recipe-difficulty")
    .forEach((element) => (element.textContent = recipe.difficulty));

  document.querySelectorAll(".recipe-ingredients").forEach((element) => {
    let ingredients = "";
    for (const ingredient of recipe.ingredients) {
      ingredients += `<li>${ingredient}</li>`;
    }
    element.innerHTML = ingredients;
  });

  document.querySelectorAll(".recipe-steps").forEach((element) => {
    let steps = "";
    for (const step of recipe.steps) {
      steps += `<li>${step}</li>`;
    }
    element.innerHTML = steps;
  });
};

const populateRecipeStory = (story) => {
  document
    .querySelectorAll(".recipe-story")
    .forEach((element) => (element.textContent = story));
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recipeId = urlParams.get("id");
if (!recipeId) alert("No recipe ID given!");

document
  .querySelectorAll(".favorite-btn")
  .forEach((element) => (element.dataset.recipeId = recipeId));

initFavorites();
fetchRecipe(recipeId).then(populateRecipeData);
fetchRecipeStory(recipeId).then(populateRecipeStory);
