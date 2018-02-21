import hyper from "./../vendor/hyperhtml/esm/index.js";

export default class KaelinoButton extends HTMLElement {
  static get is() {
    return "kaelino-button";
  }

  get href() { return this._href }
  set href(href) { this._href = href; this.render(); }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowHyper = hyper.bind(this.shadowRoot);

    this._href = this.getAttribute("href");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowHyper`
      ${this._styles()}
      <a href=${this.href}><slot></slot></a>
    `
  }

  _styles() {
    return hyper`<style>
      a {
        display: block;
        text-align: center;
        background: #039be5;
        text-decoration: none;
        color: white;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        cursor: pointer;
      }
    </style>`;
  }
}

customElements.define(KaelinoButton.is, KaelinoButton);
