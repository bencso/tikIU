import { Button, Form, Input } from "./form.js";

class BaseForm extends HTMLElement {
  constructor(inputs, buttonText, buttonHandler, formId) {
    super();
    this.attachShadow({ mode: "open" });

    const theme = this.getAttribute("theme") || "blue";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `form/themes/theme.css`;
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }

    this.inputs = inputs.map((input) => new Input(...input));
    const button = new Button(buttonText, buttonHandler, `${formId}Btn`);

    this.form = new Form(formId, [...this.inputs, button], "POST", "#", theme);
    this.form.render();
  }

  getInputStates() {
    return this.inputs.reduce((states, input) => {
      states[input.id] = input.getState();
      return states;
    }, {});
  }
}

export class Login extends BaseForm {
  constructor() {
    super(
      [
        ["text", "login-username", "username"],
        ["password", "login-password", "password"],
      ],
      "Login",
      (event) => this.handleLogin(event),
      "loginForm"
    );
  }

  handleLogin(event) {
    event.preventDefault();
    const { "login-username": username, "login-password": password } =
      this.getInputStates();
    console.log("Login button clicked", { username, password });

    // LOGIC
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
      "Register",
      (event) => this.handleRegister(event),
      "registerForm"
    );
  }

  handleRegister(event) {
    event.preventDefault();
    const {
      "register-username": username,
      "register-email": email,
      "register-password": password,
      "register-confirm-password": confirmPassword,
    } = this.getInputStates();
    console.log("Register button clicked", {
      username,
      email,
      password,
      confirmPassword,
    });

    // LOGIC
  }
}

customElements.define("login-form", Login);
customElements.define("register-form", Register);
