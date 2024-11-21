//TODO: Add a way to add custom attributes to the form element
export class Form {
  constructor(id, children = [], method, action) {
    this.id =
      id || `form${Math.random().toString(36).substr(2, 9)}`.replace(".", "");
    this.children = children;
    this.method = method;
    this.action = action;
  }

  render() {
    const form = document.createElement("form");
    form.id = this.id;
    if (this.method) form.method = this.method;
    if (this.action) form.action = this.action;
    this.children.forEach((child) => {
      form.appendChild(child.render());
    });
    document.body.appendChild(form);
  }
}

//TODO: If  id is no specified, what should Id be?
export class Input {
  constructor(type = "text", id, stateName = "value", stateValue = "") {
    this.stateName = stateName;
    this.state = { [stateName]: stateValue };
    this.id =
      id || `input${Math.random().toString(36).substr(2, 9)}`.replace(".", "");
    this.type = type;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  getState() {
    return isNaN(this.state[this.stateName])
      ? this.state[this.stateName]
      : Number(this.state[this.stateName]);
  }

  render() {
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.htmlFor = this.id;
    label.innerText = this.id;
    label.appendChild(input);
    input.type = this.type;
    input.id = this.id;
    input.name = this.stateName;
    input.oninput = this.onChange;
    input.value = this.state[this.stateName];
    input.state = this.state;
    return label;
  }

  onChange = (event) => {
    this.setState({ [this.stateName]: event.target.value });
  };
}

export class Button {
  constructor(label = "Submit", onClick = () => {}, id) {
    this.label = label;
    this.onClick = onClick;
    this.id = id || `button${Math.random() * Infinity}`;
  }

  render() {
    const button = document.createElement("button");
    button.id = this.id;
    button.innerText = this.label;
    button.onclick = this.onClick;
    return button;
  }
}

export class FormExample {
  static login() {
    const usernameInput = new Input("text", "username", "username");
    const passwordInput = new Input("password", "password", "password");
    const submitButton = new Button("Login", () => {
      console.log(
        "Logging in with",
        usernameInput.getState(),
        passwordInput.getState()
      );
    });
    return new Form("loginForm", [usernameInput, passwordInput, submitButton]);
  }

  static register() {
    const emailInput = new Input("email", "email", "email");
    const usernameInput = new Input("text", "username", "username");
    const passwordInput = new Input("password", "password", "password");
    const submitButton = new Button("Register", () => {
      console.log(
        "Registering with",
        emailInput.getState(),
        usernameInput.getState(),
        passwordInput.getState()
      );
    });
    return new Form(
      "registerForm",
      [emailInput, usernameInput, passwordInput, submitButton],
      "POST",
      "/api/register"
    );
  }
}
