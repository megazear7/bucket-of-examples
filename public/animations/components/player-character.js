import hyper from "./../vendor/hyperhtml/esm/index.js";

const DURATION = 1000;

export default class PlayerCharacter extends HTMLElement {
  static get is() {
    return "player-character";
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

  jump() {
    var person = this.shadowRoot.querySelector('.person');
    person.classList.add('jump');

    setTimeout(() => person.classList.remove('jump'), DURATION);
  }

  rightWalk() {
    var person = this.shadowRoot.querySelector('.person');
    person.classList.remove('stand');
    person.classList.add('walk');

    this.stopWalk();
    this.walk = setInterval(() => {
      person.style.left = (person.offsetLeft + 1.6) + 'px';
    }, 10);
  }

  leftWalk() {
    var person = this.shadowRoot.querySelector('.person');
    person.classList.remove('stand');
    person.classList.add('walk');

    this.stopWalk();
    this.walk = setInterval(() => {
      person.style.left = (person.offsetLeft - 1.6) + 'px';
    }, 10);
  }

  stopWalk() {
    clearInterval(this.walk);
  }

  stand() {
    var person = this.shadowRoot.querySelector('.person');
    person.classList.remove('walk');
    person.classList.add('stand');
    this.stopWalk();
  }

  render() {
    this.shadowHyper`
      <div class="person">
        <div class="head"></div>
        <div class="body"></div>
        <div class="left-arm limb"></div>
        <div class="right-arm limb"></div>
        <div class="left-leg limb"></div>
        <div class="right-leg limb"></div>
      </div>
      <div class="actions">
        <button onclick=${() => this.leftWalk()}>Left</button>
        <button onclick=${() => this.stand()}>Stand</button>
        <button onclick=${() => this.jump()}>Jump</button>
        <button onclick=${() => this.rightWalk()}>Right</button>
      </div>
      ${this._styles()}
    `
  }

  _styles() {
    return hyper`<style>
      :host {
        height: 120px;
        width: 25px;
      }

      .person.jump {
        animation: jump 1000ms;
      }

      .stand .limb {
        animation: stand 1000ms;
      }

      .walk .right-arm {
        animation: clockwiseRotate 1000ms infinite;
      }

      .walk .left-arm {
        animation: counterClockwiseRotate 1000ms infinite;
      }

      .walk .right-leg {
        animation: counterClockwiseRotate 1000ms infinite;
      }

      .walk .left-leg {
        animation: clockwiseRotate 1000ms infinite;
      }

      .right-arm {
        height: 50px;
        width: 10px;
        background-color: #555;
        position: absolute;
        top: 25px;
        left: 3.5px;
        border-radius: 10px;
      }

      .left-arm {
        height: 50px;
        width: 10px;
        background-color: #333;
        position: absolute;
        top: 25px;
        left: 3.5px;
        border-radius: 10px;
      }

      .right-leg {
        height: 50px;
        width: 10px;
        background-color: #555;
        position: absolute;
        top: 70px;
        left: 3.5px;
        border-radius: 10px;
      }

      .left-leg {
        height: 50px;
        width: 10px;
        background-color: #333;
        position: absolute;
        top: 70px;
        left: 3.5px;
        border-radius: 10px;
      }

      .head {
        height: 25px;
        width: 25px;
        background-color: #444;
        position: absolute;
        top: 0px;
        left: -4.5px;
        border-radius: 30px;
      }

      .body {
        height: 50px;
        width: 16px;
        background-color: #444;
        position: absolute;
        top: 25px;
        left: 0;
        border-radius: 10px;
      }

      .person {
        position: absolute;
      }

      .actions {
        position: fixed;
        bottom: 20px;
        left: 30%;
        margin: auto;
        width: 50%;
      }

      button {
        display: inline-block;
        width: 100px;
        height: 40px;
        border: none;
        background: #007d7d;
        color: white;
        font-size: 30px;
      }

      @keyframes stand {
        100% {
          transform: rotate(0deg);
          transform-origin: top center;
        }
      }

      @keyframes jump {
        0% {
        }

        50% {
          transform: translateY(-150px);
        }

        100% {
          transform: translateX(0px);
        }
      }

      @keyframes counterClockwiseRotate {
        0% {
        }

        25% {
          transform: rotate(40deg);
          transform-origin: top center;
        }

        50% {
          transform: rotate(0deg);
          transform-origin: top center;
        }

        75% {
          transform: rotate(-40deg);
          transform-origin: top center;
        }

        100% {
          transform: rotate(0deg);
          transform-origin: top center;
        }
      }

      @keyframes clockwiseRotate {
        0% {
        }

        25% {
          transform: rotate(-40deg);
          transform-origin: top center;
        }

        50% {
          transform: rotate(0deg);
          transform-origin: top center;
        }

        75% {
          transform: rotate(40deg);
          transform-origin: top center;
        }

        100% {
          transform: rotate(0deg);
          transform-origin: top center;
        }
      }
    </style>`;
  }
}

customElements.define(PlayerCharacter.is, PlayerCharacter);
