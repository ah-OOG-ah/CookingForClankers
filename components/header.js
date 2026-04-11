class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-sm">
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
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search recipes..."
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              SEARCH
            </button>
          </form>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="index.html">HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="404.html">INDEX</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="favorites.html">FAVORITES</a>
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

    <hr />
        `;
  }
}

customElements.define("header-component", Header);
