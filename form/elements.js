import {
  Button,
  Form,
  Input,
  EmailInput
} from "./form.js";

class BaseForm extends HTMLElement {
  constructor(inputs, buttons, formId) {
    super();
    this.attachShadow({
      mode: "open"
    });

    const theme = this.getAttribute("theme") || "blue";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `form/themes/theme.css`;
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }

    this.inputs = inputs.map((args) => {
      if (args[0] == "email") return new EmailInput(...args);
      else return new Input(...args);
    })
    this.buttons = buttons.map((button) => new Button(...button));
    this.form = new Form(formId, [...this.inputs, ...this.buttons], "POST", "#", theme);
    this.form.render();
    console.log(this.form);
  }

  getInputStates() {
    const values = {};
    this.inputs.forEach((input) => {
      Object.assign(values, input.state);
    });
    return JSON.stringify(values);
  }

  clearStates() {
    this.inputs.forEach((input) => {
      input.clearState();
    });
  }
}

export class Login extends BaseForm {
  constructor() {
    super(
      [
        ["text", "login-username", "username"],
        ["password", "login-password", "password"],
      ],
      [
        [
          "Login", (event) => this.handleLogin(event), "loginBtn"
        ],
        ["Clear", (event) => this.handleClear(event), "clearBtn"]
      ],
      "loginForm"
    );
  }

  handleLogin(event) {
    event.preventDefault();
    console.log("Login button clicked", JSON.parse(this.getInputStates()));
    //! LOGIC
  }

  handleClear(event) {
    event.preventDefault();
    this.clearStates();
  }
}

export class Register extends BaseForm {
  constructor() {
    super(
      [
        ["text", "register-username", "username"],
        ["email", "register-email", "email"],
        ["password", "register-password", "password"],
        ["password", "register-confirm-password", "confirmPassword"],
      ],
      [
        ["Register", (event) => this.handleRegister(event), "registerBtn"]
      ],
      "registerForm"
    );
  }

  handleRegister(event) {
    event.preventDefault();
    console.log("Register button clicked", JSON.parse(this.getInputStates()));
    //! LOGIC
  }
}

//TODO: Add custom form with JSON file

customElements.define("login-form", Login);
customElements.define("register-form", Register);