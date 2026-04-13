class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const activePage = this.getAttribute("active-page");

    this.innerHTML = /* html */ `
    <nav class="navbar navbar-expand-sm border-bottom mb-4 px-4">
      <div class="container-fluid">
        <div class="navbar-brand">
          <a href="index.html">
            <!--suppress CheckImageSize -->
            <img
              src="imgs/icon-logo.png"
              alt="Cooking for Clankers Logo"
              height="64"
            />
          </a>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search" action="search.html">
            <label for="query">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search recipes..."
                aria-label="Search"
                name="query"
                id="query"
                required
              />
            </label>
            <button class="btn btn-outline-success" type="submit">
              SEARCH
            </button>
          </form>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link ${activePage === "HOME" ? "active" : ""}" href="index.html">HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${activePage === "INDEX" ? "active" : ""}" href="recipe-index.html">INDEX</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${activePage === "FAVORITES" ? "active" : ""}" href="favorites.html">FAVORITES</a>
            </li>
          </ul>
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
        `;
  }
}

customElements.define("header-component", Header);
