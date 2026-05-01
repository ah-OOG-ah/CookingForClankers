import { Cuisine, fetchAllRecipes } from "./recipe_data.js";

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
  // Make sure the user can't double-select a tag
  const option = document.getElementById(`opt${name}`);
  option.hidden = true;
  tagSelect.selectedIndex = 0;
}

/** @param {string} name */
function removeTag(name) {
  document.getElementById(`${name}Chip`).remove();
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

/**
 * Everything below runs immediately on page load.
 */
document
  .getElementById("addIngredientBtn")
  .addEventListener("click", addIngredient);
tagSelect.addEventListener("input", () => addTag(tagSelect.value));
await reloadCuisines();
document.getElementById("addStepBtn").addEventListener("click", addStep);
