class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /* html */ `
    <footer class="border-top mt-4 p-4 text-center">
      <a
        href="https://github.com/ah-OOG-ah/CookingForClankers"
        target="blank"
        target="noopener noreferrer"
        class="text-light"
      >
        <i class="bi bi-github fs-1"></i>
      </a>
      <!--suppress CheckImageSize -->
      <!--
        <img
          class="rounded shadow"
          src="imgs/logo.png"
          alt="Cooking for Clankers: Recipes by Robots, for Robots"
          height="128"
        />
      -->
    </footer>
        `;
  }
}

customElements.define("footer-component", Footer);
