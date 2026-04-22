// recipe_data.js: responsible for providing operations to fetch recipe data
// from the server

// Do not change this line in the slightest! It gets replaced by the deploy script.
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

export const NUM_RECIPES = 79;

export class Category {
  static APPETIZERS = "Appetizers";
  static AUTUMN = "Autumn";
  static BEVERAGES = "Beverages";
  static BREAKFAST = "Breakfast";
  static DESSERTS = "Desserts";
  static DINNER = "Dinner";
  static LUNCH = "Lunch";
  static SNACKS = "Snacks";
  static SPRING = "Spring";
  static SUMMER = "Summer";
  static WINTER = "Winter";
}

export class Season {
  static SPRING = "Spring";
  static SUMMER = "Summer";
  static AUTUMN = "Autumn";
  static WINTER = "Winter";
  static ALL = "All";
}

export class Recipe {
  // The following properties come from the JSON files
  id; // number
  name; // string
  /** @type string. See Category for valid values. **/
  category;
  /** @type {string[]} **/
  ingredients;
  dietary; // string[]
  /** @type string. See Season for valid values. **/
  season;
  cuisine; // string
  prep_time; // string
  difficulty; // string
  /** @type {string[]} **/
  images;
  steps; // string[]

  // And the next ones are calculated for indexing
  /** @type string **/
  ingredientString;

  constructor(obj) {
    obj && Object.assign(this, obj);
    this.ingredientString = this.ingredients.join(" ");
  }
}

export class Story {
  /** @type number **/
  id;
  /** @type string **/
  story;

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

/** @type {Map<number, string>} **/
export let ALL_STORIES = new Map();
let storiesLoaded = false;

export async function fetchAllStories() {
  if (storiesLoaded) return;

  const storiesPath = `${DATA_PATH}/recipes/${RECIPE_STORIES}`;
  const response = await fetch(storiesPath);
  if (!response.ok) {
    return;
  }

  const storiesJson = await response.json();
  if (!Array.isArray(storiesJson)) {
    console.error(
      `Stories JSON is not an array! Received:\n${await response.text()}`,
    );
    return;
  }

  for (const obj of storiesJson) {
    const story = new Story(obj);
    ALL_STORIES.set(story.id, story.story);
  }
  storiesLoaded = true;
}

// TODO use memoized access
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
  return imageSrc(recipe.images[0]);
}

export function imageSrc(image) {
  return `${DATA_PATH}/images/${image}`;
}

/** @param {string} story **/
export function storyPreview(story) {
  return `${story.split(".")[0]}.`;
}

/**
 * @param {Recipe} recipe
 * @return {HTMLDivElement} A recipe card for the given recipe.
 */
export function indexCard(recipe) {
  let card = document.createElement("recipe-card");
  card.className = "col";
  card.setAttribute("img-src", recipeImage(recipe));
  card.setAttribute("id", recipe.id);
  card.setAttribute("name", recipe.name);
  card.setAttribute("cuisine", recipe.cuisine);
  card.setAttribute("difficulty", recipe.difficulty);
  card.setAttribute("prep-time", recipe.prep_time);
  card.setAttribute("story", storyPreview(ALL_STORIES.get(recipe.id) || ""));
  card.setAttribute("dietary", (recipe.dietary || []).join(","));
  card.setAttribute("season", recipe.season);
  return card;
}
