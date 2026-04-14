import { DATA_PATH } from "../js/recipe_data.js";

class RecipeCard extends HTMLElement {
  constructor() {
    super();
  }

  seasonIconData(season) {}

  connectedCallback() {
    // define data here
    const imgSrc = this.getAttribute("img-src");
    const id = this.getAttribute("id");
    const name = this.getAttribute("name") || "Loading...";
    const cuisine = this.getAttribute("cuisine");
    const difficulty = this.getAttribute("difficulty");
    const prepTime = this.getAttribute("prep-time");
    const story = this.getAttribute("story") || "Loading...";
    const dietary = (this.getAttribute("dietary") || "").split(",");
    const season = this.getAttribute("season");
    const seasonIcon =
      season === "Spring"
        ? "bi-flower2"
        : season === "Summer"
          ? "bi-sun-fill"
          : season === "Autumn"
            ? "bi-leaf-fill"
            : season === "Winter"
              ? "bi-snow"
              : "bi-calendar-fill";

    this.innerHTML = /* html */ `
        <article class="card">
          <div class="row">
            <div class="col-md-4">
              <img src=${imgSrc} class="card-img rounded" alt="..."/>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <div>
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle">${cuisine} - ${difficulty} (${prepTime})</h6>
                  </div>
                  <i class="favorite-btn" role="button" data-recipe-id=${id}></i>
                </div>
                <p class="card-text">${story}</p>
                <div class="d-flex flex-wrap gap-2">
                  ${dietary
                    .map((d) => {
                      // TODO color accordingly
                      return /* html */ `<span class="dietary-chip ${d}">${d}</span>`;
                    })
                    .join("\n")}
                </div>
                <i class="bi ${seasonIcon} position-absolute bottom-0 end-0 mx-4 mb-3"></i>
                <a href="recipe.html?id=${id}" class="stretched-link"></a>
              </div>
            </div>
          </div>
        </article>`;
  }
}

customElements.define("recipe-card", RecipeCard);
