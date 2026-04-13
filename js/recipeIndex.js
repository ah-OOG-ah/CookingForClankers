import { ALL_RECIPES, fetchAllRecipes, recipeImage } from "./recipe_data.js";

function indexCard(recipe) {
  return `
<div class="row g-0">
  <div class="col-md-4">
    <img src="${recipeImage(recipe)}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${recipe.name}</h5>
      <p class="card-text">This is a sample description, as we don't have a better one generated.</p>
    </div>
  </div>
</div>`;
}

await fetchAllRecipes();
for (const recipe of ALL_RECIPES.values()) {
  let newElem = document.createElement("div");
  newElem.className = "card mb-3";
  newElem.innerHTML = indexCard(recipe);
  document.getElementById("mainColumn").appendChild(newElem);
}
