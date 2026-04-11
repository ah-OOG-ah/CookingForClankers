import { DATA_PATH } from "../js/recipe_data.js";

class RecipeCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // define data here
    const id = this.getAttribute("id");
    const name = this.getAttribute("name") || "Loading...";
    const imgName = this.getAttribute("img-name");
    const story = this.getAttribute("story") || "Loading...";
    // ...

    /* TODO make it horizontal (this is Bootstrap's example)
<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>

*/

    this.innerHTML = /* html */ `
        <article class="card">
          <div class="position-absolute top-0 end-0 m-2">
            <i class="favorite-btn" role="button" data-recipe-id=${id}></i>
          </div>
          <img
            src=${`${DATA_PATH}/images/${imgName}`}
            class="card-img"
          />

          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${story}</p>
            <a href="recipe.html?id=${id}" class="card-link">Go to recipe</a>
          </div>
        </article>
        `;
  }
}

customElements.define("recipe-card", RecipeCard);
