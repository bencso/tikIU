export class Form {
  constructor(id, children = [], method, action, theme = "blue") {
    this.id = id || `form${Math.random().toString(36).substring(2, 11)}`;
    this.children = children;
    this.method = method;
    this.action = action;
    this.theme = theme;
  }

  addThemeClass(element) {
    if (this.theme) {
      element.classList.add(this.theme);
    }
  }

  clear() {
    const form = document.getElementById(this.id);
    form.reset();
    this.children.forEach((child) => {
      child.clearState();
    });
  }

  render() {
    const form = document.createElement("form");
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("button-row");
    buttonRow.style.display = "flex";
    buttonRow.style.flexDirection = "row";
    buttonRow.style.gap = "10px";
    form.id = this.id;
    form.method = this.method;
    form.action = this.action;
    this.children.forEach((child) => {
      if (child instanceof Button) {
        buttonRow.appendChild(child.render());
      } else {
        form.appendChild(child.render());
      }
    });
    form.appendChild(buttonRow);
    this.addThemeClass(form);
    document.body.appendChild(form);
  }
}

export class Input {
  constructor(type = "text", id, stateName = "value", stateValue = "") {
    this.stateName = stateName;
    this.state = {
      [stateName]: stateValue
    };
    this.id = id || `input${Math.random().toString(36).substring(2, 11)}`;
    this.type = type;
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    };
    console.error(this.state);
  }

  clearState() {
    this.setState({
      [this.stateName]: ""
    });
  }

  getState() {
    return this.state;
  }

  renderEmail() {
    return new EmailInput(this.id).render();
  }

  renderDefault() {
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.htmlFor = this.id;
    label.innerText = this.id;
    label.appendChild(input);
    input.type = this.type;
    input.id = this.id;
    input.name = this.stateName;
    input.state = this.state;
    input.value = this.state[this.stateName];
    input.addEventListener("input", this.onChange);
    return label;
  }

  render() {
    switch (this.type) {
      case "email":
        return this.renderEmail();
      default:
        return this.renderDefault();
    }
  }

  onChange = (event) => {
    this.setState({
      [this.stateName]: event.target.value
    });
  };
}

class EmailInput extends Input {
  constructor(id) {
    super("email", id);
    this.state = {
      username: "",
      domain: "",
      value: ""
    };
  }

  onChange = (event) => {
    if (event.target.id.includes("username")) {
      this.setState({
        username: event.target.value
      });
    }
    if (event.target.id.includes("domain")) {
      this.setState({
        domain: event.target.value
      });
    }
    this.setState({
      [this.stateName]: `${this.state.username}@${this.state.domain}`
    });
  }

  render() {
    const label = document.createElement("label");
    const username = document.createElement("input");
    const domain = document.createElement("input");
    label.htmlFor = this.id;
    label.innerText = this.id;
    username.type = "text";
    username.id = `${this.id}-username`;
    username.name = "username";
    username.addEventListener("input", this.onChange);
    username.value = this.state.username;
    username.state = this.state;
    domain.type = "text";
    domain.id = `${this.id}-domain`;
    domain.name = "domain";
    domain.addEventListener("input", this.onChange);
    domain.value = this.state.domain;
    domain.state = this.state;
    label.appendChild(username);
    label.appendChild(domain);
    return label;
  }
}

export class Button {
  constructor(label = "Submit", onClick = () => {}, id) {
    this.label = label;
    this.onClick = onClick;
    this.id = id || `button${Math.random().toString(36).substring(2, 11)}`;
  }

  render() {
    const button = document.createElement("button");
    button.id = this.id;
    button.innerText = this.label;
    button.addEventListener("click", this.onClick);
    return button;
  }
}