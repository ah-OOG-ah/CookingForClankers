class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer>
      <hr />
      <p>Blah blah blah boring legal</p>
      <p>Check out our <a href="https://github.com/ah-OOG-ah/CookingForClankers">GitHub</a></p>
      <!--suppress CheckImageSize -->
      <img
        src="imgs/logo.png"
        alt="Cooking for Clankers: Recipes by Robots, for Robots"
        height="128"
      />
    </footer>
        `;
  }
}

customElements.define("footer-component", Footer);
