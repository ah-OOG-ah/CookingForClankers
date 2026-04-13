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
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
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
