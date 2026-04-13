// recipe_data.js: responsible for providing operations to fetch recipe data
// from the server

export const DATA_PATH = "/data";

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

export class Recipe {
  id; // number
  name; // string
  category; // string
  ingredients; // string[]
  dietary; // string[]
  season; // string
  cuisine; // string
  prep_time; // string
  difficulty; // string
  images; // string[]
  steps; // string[]

  constructor(obj) {
    obj && Object.assign(this, obj);
  }
}

export class Story {
  id; // number
  story; // string

  constructor(obj) {
    obj && Object.assign(this, obj);
  }
}

/** @type {Map<number, Recipe>} **/
export let ALL_RECIPES = new Map();
let recipesLoaded = false;

export async function fetchAllRecipes() {
  if (recipesLoaded) return;

  for (const file of RECIPE_FILES) {
    const path = `${DATA_PATH}/recipes/${file}`;
    const response = await fetch(path);
    if (!response.ok) {
      continue;
    }

    const json = await response.json();
    if (!Array.isArray(json)) {
      console.log(
        `Recipe file ${path} did not contain a recipe array! Instead, it had:\n${json}`,
      );
      continue;
    }

    for (const obj of json) {
      const recipe = new Recipe(obj);
      ALL_RECIPES.set(recipe.id, recipe);
    }
  }

  recipesLoaded = true;
}

// TODO memoize this
export async function fetchRecipe(id) {
  if (id == null) return null;
  for (const fileName of RECIPE_FILES) {
    const path = `${DATA_PATH}/recipes/${fileName}`;
    const response = await fetch(path);
    if (!response.ok) {
      console.warn(
        `Fetch to ${path} failed! ${response.status}\n${await response.text()}`,
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

    for (const obj of json) {
      const recipe = new Recipe(obj);
      if (recipe.id === id) return recipe;
    }
  }
  console.error(`Could not find recipe ${id}`);
  return null;
}

export async function fetchRecipeStory(id) {
  if (!id) return null;
  const path = `${DATA_PATH}/recipes/${RECIPE_STORIES}`;
  const response = await fetch(path);
  if (!response.ok) {
    console.error(
      `Fetch to ${path} failed! ${response.status}
${await response.text()}`,
    );
    return null;
  }

  const json = await response.json();
  if (!Array.isArray(json)) {
    console.error(
      `Fetched data was not an array!
        ${json}`,
    );
    return null;
  }

  for (const obj of json) {
    const story = new Story(obj);
    if (story.id === id) return story.story;
  }
  console.error(`Could not find story for recipe ${id}`);
  return null;
}

export function recipeImage(recipe) {
  return `${DATA_PATH}/images/${recipe.images[recipe.images.length - 1]}`;
}
