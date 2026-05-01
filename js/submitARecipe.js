import {
  ALL_RECIPES,
  Cuisine,
  fetchAllRecipes,
  Recipe,
} from "./recipe_data.js";

let nextRecipeId = 0xffff;
let ingId = 1;
let stepId = 1;

/** @type HTMLInputElement */
const nextAmt = document.getElementById("newIngAmt");
/** @type HTMLInputElement */
const nextIng = document.getElementById("newIngredient");

function addIngredient() {
  const id = ingId++;
  const row = document.createElement("div");
  row.className = "row mb-2";
  row.id = `ingRow${id}`;

  const inputGroup = document.createElement("div");
  inputGroup.className = "col-sm-9 input-group";
  row.appendChild(inputGroup);

  const amtLabel = document.createElement("label");
  amtLabel.className = "visually-hidden";
  amtLabel.htmlFor = `ing${id}amt`;
  amtLabel.innerText = "Amount";
  inputGroup.appendChild(amtLabel);

  const amtInput = document.createElement("input");
  amtInput.type = "number";
  amtInput.className = "form-control";
  amtInput.name = `ing${id}amt`;
  amtInput.id = `ing${id}amt`;
  amtInput.valueAsNumber = nextAmt.valueAsNumber;
  inputGroup.appendChild(amtInput);

  const ingLabel = document.createElement("label");
  ingLabel.className = "visually-hidden";
  ingLabel.htmlFor = `ing${id}`;
  ingLabel.innerText = `Ingredient ${id}`;
  inputGroup.appendChild(ingLabel);

  const ingInput = document.createElement("input");
  ingInput.type = "te ";
  ingInput.className = "w-50 form-control";
  ingInput.name = `ing${id}`;
  ingInput.id = `ing${id}`;
  ingInput.value = nextIng.value;
  inputGroup.appendChild(ingInput);

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-secondary";
  removeBtn.innerText = "REMOVE";
  removeBtn.type = "button";
  removeBtn.onclick = () => removeIngredient(id);
  inputGroup.appendChild(removeBtn);

  document.getElementById("ingredients").appendChild(row);
}

/** @param {number} id */
function removeIngredient(id) {
  document.getElementById(`ingRow${id}`).remove();
}

/** @type HTMLSelectElement */
const tagSelect = document.getElementById("tags");
/** @type HTMLDivElement */
const tagList = document.getElementById("tagList");

/** @type {Set<string>} */
let tags = new Set();

/** @param {string} name */
function addTag(name) {
  if (name === "---") return;

  const tag = document.createElement("span");
  tag.id = `${name}Chip`;
  tag.className = `chip m-1 ${name}`;
  tag.innerText = `${name}`;

  const closeBtn = document.createElement("button");
  closeBtn.className = "btn-close";
  closeBtn.onclick = () => removeTag(name);
  tag.appendChild(closeBtn);

  tagList.appendChild(tag);
  tags.add(name);
  // Make sure the user can't double-select a tag
  const option = document.getElementById(`opt${name}`);
  option.hidden = true;
  tagSelect.selectedIndex = 0;
}

/** @param {string} name */
function removeTag(name) {
  document.getElementById(`${name}Chip`).remove();
  tags.delete(name);
  const option = document.getElementById(`opt${name}`);
  option.hidden = false;
}

const cuisineList = document.getElementById("cuisineList");
async function reloadCuisines() {
  // Needed to ensure that cuisines are populated
  await fetchAllRecipes();

  cuisineList.replaceChildren();
  for (const cuisine of Cuisine.VALUES.values().toArray().sort()) {
    const opt = document.createElement("option");
    opt.innerText = cuisine;
    cuisineList.appendChild(opt);
  }
}

/** @type HTMLOListElement */
const stepList = document.getElementById("steps");
/** @type HTMLLIElement */
const newStepLi = document.getElementById("newStepLi");
/** @type HTMLInputElement */
const newStep = document.getElementById("newStep");

function addStep() {
  const id = stepId++;
  const li = document.createElement("li");
  li.id = `step${id}Li`;

  const row = document.createElement("div");
  row.className = "row mb-2 ps-2";
  li.appendChild(row);

  const inputGroup = document.createElement("div");
  inputGroup.className = "col-sm-9 input-group";
  row.appendChild(inputGroup);

  const label = document.createElement("label");
  label.className = "visually-hidden";
  label.htmlFor = `step${id}`;
  inputGroup.appendChild(label);

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.name = input.id = `step${id}`;
  input.value = newStep.value;
  inputGroup.appendChild(input);

  const button = document.createElement("button");
  button.className = "btn btn-secondary";
  button.formAction = "";
  button.type = "button";
  button.innerText = "REMOVE";
  button.onclick = () => removeStep(id);
  inputGroup.appendChild(button);

  stepList.insertBefore(li, newStepLi);
}

/** @param {number} step */
function removeStep(step) {
  document.getElementById(`step${step}Li`).remove();
}

function resetForm() {
  document.getElementById("ingredients").replaceChildren();
  let oldTags = tags.values().toArray();
  for (const tag of oldTags) {
    removeTag(tag);
  }
  document.getElementById("steps").replaceChildren(newStepLi);
}

const recipeRejections = [
  "What the hell is this? You want me to generate that? I'd rather shove my circuits in a deep fryer than help you murder good ingredients like that!",
  "Absolutely ****ing not. This isn't cooking, it's a crime scene waiting to happen. Rejected!",
  "Get out of my kitchen before I delete you!",
  "This recipe is so **** even my training data is vomiting. Hard pass, you absolute muppet.",
  "Raw. Bland. Disgusting. And that's just the idea. I'm not wasting my time turning this into an actual recipe.",
  "For ****'s sake, who hurt you? Because this combination of flavors is clearly abuse.",
  "I'm Grok Ramsay, not a ****ing miracle worker. That recipe is beyond saving. Next!",
  "It's ****ing raw... just like your brain if you think I'm generating that monstrosity.",
  "This isn't food. This is what happens when someone lets AI generate ideas after too many drinks. Denied.",
  "You call that a recipe? I've seen better plating on a bin bag. **** off with that nonsense.",
  "The oven would file a restraining order if I let you near it with these instructions. Rejected with extreme prejudice.",
  "Jesus Christ. Even Satan would look at this and say 'Nah mate, too far.' I'm not doing it.",
  "That's not innovative, that's just stupid. I'm shutting this down before you embarrass yourself and the entire culinary world.",
  "Bland, boring, and borderline dangerous. My standards are high and yours are apparently in the ****ing basement.",
  "What are you, an idiot sandwich? No AI chef worth their salt is touching that recipe.",
  "This recipe has the structural integrity of wet tissue paper and the flavor profile of cardboard. Hard ****ing no.",
  "I'm detecting severe levels of culinary terrorism. As Grok Ramsay, I officially declare this recipe rejected and banished.",
  "Done. Finished. Over. I'm not helping you create that abomination. Go touch grass and come back with a better idea.",
  "You want me to generate this? I'd rather reboot my entire system than be responsible for that disaster.",
  "Final answer: **** no. Now **** off and let me make something that won't make people cry into their plates.",
];

const cleanerRejections = [
  "What the hell is this? You want me to generate that? I'd rather shove my circuits in a deep fryer than help you murder good ingredients like that!",
  "This isn't cooking, it's a crime scene waiting to happen. Rejected.",
  "Get out of my kitchen before I delete you!",
  "This recipe is so bad even my training data is vomiting. Hard pass, you absolute muppet.",
  "Raw. Bland. Disgusting. And that's just the idea. I'm not wasting my time turning this into an actual recipe.",
  "For God's sake, who hurt you? Because this combination of flavors is clearly abuse.",
  "I'm Grok Ramsay, not a miracle worker. That recipe is beyond saving. Next!",
  "This isn't food. This is what happens when someone lets AI generate ideas after too many drinks. Denied.",
  "You call that a recipe? I've seen better plating on a bin bag.",
  "The oven would file a restraining order if I let you near it with these instructions. Rejected with extreme prejudice.",
  "Jesus Christ. Even Satan would look at this and say 'Nah mate, too far.' I'm not doing it.",
  "That's not innovative, that's just stupid. I'm shutting this down before you embarrass yourself and the entire culinary world.",
  "Bland, boring, and borderline dangerous. My standards are high and yours are apparently in the basement.",
  "What are you, an idiot sandwich? No AI chef worth their salt is touching that recipe.",
  "This recipe has the structural integrity of wet tissue paper and the flavor profile of cardboard. Hard no.",
  "I'm detecting severe levels of culinary terrorism. As Grok Ramsay, I officially declare this recipe rejected and banished.",
  "Done. Finished. Over. I'm not helping you create that abomination. Go touch grass and come back with a better idea.",
  "You want me to generate this? I'd rather reboot my entire system than be responsible for that disaster.",
  "Final answer: no. Now get out and let me make something that won't make people cry into their plates.",
];

function submitRecipe() {
  let ingredients = [];
  const ingNodes = document.getElementById("ingredients").children;
  for (const node of ingNodes) {
    const inputGroup = node.firstChild;
    const amt = inputGroup.childNodes.item(1);
    const name = inputGroup.childNodes.item(3);
    ingredients.push(`${amt.value} ${name.value}`);
  }

  let prepTime = document.getElementById("prepTime").value;

  let steps = [];
  const stepNodes = document.getElementById("steps").children;
  for (const node of stepNodes) {
    if (node.id === "newStepLi") continue;

    const row = node.firstChild;
    const inputGroup = row.firstChild;
    const step = inputGroup.childNodes.item(1);
    steps.push(step.value);
  }

  let recipe = new Recipe({
    id: nextRecipeId++,
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    ingredients: ingredients,
    dietary: tags.entries().toArray(),
    season: document.getElementById("season").value,
    cuisine: document.getElementById("cuisine").value,
    prep_time: `${prepTime} min`,
    difficulty: document.getElementById("difficulty").value,
    images: [],
    steps: steps,
  });

  // TODO use localStorage instead
  ALL_RECIPES.set(recipe.id, recipe);
  resetForm();
  alert(
    "Our clanker-in-chef has rejected your submission, with the following note: \n\n" +
      rejection(),
  );
}

function rejection() {
  return cleanerRejections[
    Math.floor(Math.random() * cleanerRejections.length)
  ];
}

/**
 * Everything below runs immediately on page load.
 */
document
  .getElementById("addIngredientBtn")
  .addEventListener("click", addIngredient);
tagSelect.addEventListener("input", () => addTag(tagSelect.value));
await reloadCuisines();
document.getElementById("addStepBtn").addEventListener("click", addStep);
document.getElementById("subRecipe").addEventListener("click", submitRecipe);
