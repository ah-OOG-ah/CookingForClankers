// ------------------------ DEFINITIONS ------------------------
// TODO move to separate file
const DATA_PATH = "/data";

const RECIPE_FILES = [
  "appetizer_recipes.json",
  "autumn_recipes.json",
  "beverages_recipes.json",
  "breakfast_recipes_part1.json",
  "breakfast_recipes_part2.json",
  "breakfast_recipes_part3.json",
  "dessert_recipes_part1.json",
  "dessert_recipes_part2.json",
  "dinner_recipes_part1.json",
  "dinner_recipes_part2.json",
  "lunch_recipes_part1.json",
  "lunch_recipes_part2.json",
  "snacks_recipes.json",
  "spring_recipes.json",
  "summer_recipes.json",
  "winter_recipes.json",
];

const RECIPE_STORIES = "All_recipe_stories.json";

async function fetchRecipeData(id) {
  if (id == null) return null;
  for (const fileName of RECIPE_FILES) {
    // TODO make it work for /srv/csc391support/files/for-realsies
    const path = `${DATA_PATH}/recipes/${fileName}`;
    const response = await fetch(path);
    if (response.status != 200) {
      console.log(
        `Fetch to ${path} failed! ${response.status}
${await response.text()}`,
      );
      return null;
    }

    const json = await response.json();
    if (!Array.isArray(json)) {
      console.log(
        `Fetched data was not an array!
        ${json}`,
      );
      return null;
    }

    for (const recipe of json) {
      if (recipe.id == id) return recipe;
    }
  }
  console.error(`Could not find recipe ${id}`);
  return null;
}

// ------------------------ SCRIPT ------------------------

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recipeId = urlParams.get("id");
console.debug("Recipe ID:", recipeId);
// if (!recipeId) window.location.href = "404.html";

const recipe = await fetchRecipeData(recipeId);
console.debug(recipe);
// if (!recipe) window.location.href = "404.html";

document.querySelectorAll(".recipe-img-final").forEach((element) => {
  element.innerHTML = `
<img
  src="${DATA_PATH}/images/${recipe.images[recipe.images.length - 1]}"
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
