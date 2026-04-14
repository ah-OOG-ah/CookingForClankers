import { DATA_PATH } from "../js/recipe_data.js";

class RecipeCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // define data here
    const id = this.getAttribute("id");
    const name = this.getAttribute("name") || "Loading...";
    const imgSrc = this.getAttribute("img-src");
    const story = this.getAttribute("story") || "Loading...";

    /* TODO make it horizontal */
    this.innerHTML = `
        <article class="card">
          <div class="position-absolute top-0 end-0 m-2">
            <i class="favorite-btn" role="button" data-recipe-id=${id}></i>
          </div>
          <img src=${imgSrc} class="card-img" alt="..."/>

          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${story}</p>
            <a href="recipe.html?id=${id}" class="stretched-link"></a>
          </div>
        </article>`;
  }
}

customElements.define("recipe-card", RecipeCard);
