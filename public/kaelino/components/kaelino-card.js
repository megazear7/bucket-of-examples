import hyper from "./../vendor/hyperhtml/esm/index.js";

export default class KaelinoCard extends HTMLElement {
  static get is() {
    return "kaelino-card";
  }

  get actionText() { return this._actionText }
  set actionText(actionText) { this._actionText = actionText; this.render(); }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowHyper = hyper.bind(this.shadowRoot);
    this._actionText = this.getAttribute("actionText");
  }

  connectedCallback() {
    this.render();
  }

  barClicked() {
    this.dispatchEvent(new CustomEvent("kaelino-card-submit"));
  }

  render() {
    this.shadowHyper`
      ${this._styles()}
      <div class="container">
        <slot></slot>
        <p>Hello, I am from hyperHtml ABC</p>
      </div>
      <div class="bar" onclick=${() => this.barClicked()}>
        ${this.actionText}
      </div>
    `
  }

  _styles() {
    return hyper`<style>
      :host {
        display: block;
        margin: 100px auto 16px;
        max-width: 360px;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      }

      .container {
        background: white;
        padding: 32px 24px;
      }

      .bar {
        width: 100%;
        color: white;
        padding: 15px;
        box-sizing: border-box;
        text-align: center;
        background: #039be5;
        transition: background-color 0.3s;
        border-radius: 0 0 3px 3px;
        cursor: pointer;
      }

      .bar:hover {
        background-color: #097fb9;
      }
    </style>`;
  }
}

customElements.define(KaelinoCard.is, KaelinoCard);
