import { initFavorites } from "./favorites.js";
import { fetchRecipe, fetchRecipeStory, recipeImage } from "./recipe_data.js";

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

  setIngredients(recipe, 1);

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
const recipeId = parseInt(urlParams.get("id"));
if (!recipeId) alert("No recipe ID given!");

document.getElementById("linkText").textContent = window.location.href;

document
  .querySelectorAll(".favorite-btn")
  .forEach((element) => (element.dataset.recipeId = recipeId));

initFavorites();
const recipe = fetchRecipe(recipeId);
recipe.then(populateRecipeData);
fetchRecipeStory(recipeId).then(populateRecipeStory);

const shareBtn = document.getElementById("shareBtn");
const dialog = document.getElementById("shareDialog");
async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    shareBtn.innerText = "Copied!";
    setTimeout(() => (shareBtn.innerText = "Share"), 1000);
  } catch (error) {
    console.debug(error);
    new bootstrap.Modal(dialog).show();
  }
}
shareBtn.addEventListener("click", copyShareLink);

/**
 * Loads the .recipe-ingredients list with ingredients, multiplied by the given factor.
 *
 * @param {Recipe} recipe
 * @param {number} multiple
 **/
function setIngredients(recipe, multiple) {
  document.querySelectorAll(".recipe-ingredients").forEach((element) => {
    element.replaceChildren();

    for (let ingredient of recipe.ingredients) {
      const [first, ...rest] = ingredient.split(" ");
      const firstNum = parseFloat(first);
      if (!Number.isNaN(firstNum)) {
        const numString = (firstNum * multiple)
          .toFixed(2)
          .replace(".00", "") // 2.00 -> 2
          .replace(/(?<=\.[1-9])0$/, ""); // 2.40 -> 2.4
        ingredient = numString + " " + rest.join(" ");
      }

      const liNode = document.createElement("li");
      liNode.innerText = ingredient;
      element.appendChild(liNode);
    }
  });
}

/** @type HTMLInputElement **/
const mulInput = document.getElementById("mulInput");
mulInput.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter" || !mulInput.checkValidity()) {
    return;
  }

  setIngredients(await recipe, mulInput.valueAsNumber);
});
