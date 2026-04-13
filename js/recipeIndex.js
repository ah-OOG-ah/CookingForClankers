import { ALL_RECIPES, fetchAllRecipes, recipeImage } from "./recipe_data.js";

/**
 * @param {Recipe} recipe
 * @return {HTMLDivElement} A recipe card for the given recipe.
 */
function indexCard(recipe) {
  let newElem = document.createElement("div");
  newElem.className = "card mb-3";
  newElem.innerHTML = `
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${recipeImage(recipe)}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${recipe.name}</h5>
          <p class="card-text">This is a sample description, as we don't have a better one generated.</p>
          <a href="recipe.html?id=${recipe.id}" class="stretched-link"></a>
        </div>
      </div>
    </div>`;
  return newElem;
}

await fetchAllRecipes();
for (const recipe of ALL_RECIPES.values()) {
  document.getElementById("mainColumn").appendChild(indexCard(recipe));
}
