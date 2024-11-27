import { Button, Form, Input, CustomEmailInput } from "./form.js";

class BaseForm extends HTMLElement {
  constructor(inputs, buttons, formId) {
    super();
    this.attachShadow({ mode: "open" });

    const theme = this.getAttribute("theme") || "blue";
    this.loadStyle(`form/themes/theme.css`);

    this.inputs = this.createInputs(inputs);
    this.buttons = this.createButtons(buttons);
    this.form = new Form(
      formId,
      [...this.inputs, ...this.buttons],
      "POST",
      "#",
      theme
    );
    this.form.render();
  }

  loadStyle(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }

  //TODO: More complex inputs creating
  createInputs(inputs) {
    return inputs.map((input) => {
      switch (input[0]) {
        case "custom-email":
          return new CustomEmailInput(...input);
        default:
          return new Input(...input);
      }
    });
  }

  createButtons(buttons) {
    return buttons.map((button) => new Button(...button));
  }

  getInputStates() {
    return JSON.parse(
      JSON.stringify(
        this.inputs.reduce((state, input) => {
          state[input.stateName] = input.state[input.stateName];
          return state;
        }, {})
      )
    );
  }

  clearStates() {
    this.inputs.forEach((input) => input.clearState());
  }
}

export class Login extends BaseForm {
  constructor() {
    super(
      [
        /* type, stateName, id */
        ["text", "username", "username"],
        ["password", "password", "password"],
      ],
      [
        /* label, event, id */
        ["Login", (event) => this.handleLogin(event), "loginBtn"],
        ["Clear", (event) => this.handleClear(event), "clearBtn"],
      ],
      "loginForm"
    );
  }

  handleLogin(event) {
    event.preventDefault();
    console.log(this.getInputStates());
    // LOGIC
  }

  handleClear(event) {
    event.preventDefault();
    this.clearStates();
  }
}

//? The state and the name given at declaration time sometimes differ
export class Register extends BaseForm {
  constructor() {
    super(
      [
        ["text", "name", "regname"],
        ["custom-email", "regemail", "email"],
        ["password", "password", "password"],
        ["password", "confirm password", "repassword"],
      ],
      [
        ["Register", (event) => this.handleRegister(event), "registerBtn"],
        ["Clear", (event) => this.handleClear(event), "clearBtn"],
      ],
      "registerForm"
    );
  }

  handleRegister(event) {
    event.preventDefault();
    console.log(this.getInputStates());
    // LOGIC
  }
}

customElements.define("login-form", Login);
customElements.define("register-form", Register);

//? Add with appendChild
//document.body.appendChild(new Login());
//document.body.appendChild(new Register());
