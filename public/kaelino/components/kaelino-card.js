import hyper from "./../vendor/hyperhtml/esm/index.js";

export default class KaelinoCard extends HTMLElement {
  static get is() {
    return "kaelino-card";
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowHyper = hyper.bind(this.shadowRoot);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowHyper`
      ${this._styles()}
      <slot></slot>
      <p>Hello, I am from hyperHtml ABC</p>
    `
  }

  _styles() {
    return hyper`<style>
      :host {
        display: block;
        background: white;
        max-width: 360px;
        margin: 100px auto 16px;
        padding: 32px 24px;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      }
    </style>`;
  }
}

customElements.define(KaelinoCard.is, KaelinoCard);
