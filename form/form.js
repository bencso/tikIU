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
      const childElement = child.render();
      if (child instanceof Button) {
        buttonRow.appendChild(childElement);
      } else {
        form.appendChild(childElement);
      }
    });
    form.appendChild(buttonRow);
    this.addThemeClass(form);
    document.body.appendChild(form);
  }
}

export class Input {
  constructor(type = "text", id, stateName = "email", stateValue = "") {
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
  }

  clearState() {
    this.setState({
      [this.stateName]: ""
    });
  }

  getState() {
    return JSON.stringify(this.state);
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
    input.value = this.state[this.stateName];
    input.addEventListener("input", this.onChange.bind(this));
    return label;
  }

  onChange(event) {
    this.setState({
      [this.stateName]: event.target.value
    });
  }
}

export class EmailInput extends Input {
  constructor(id) {
    super("email", id, id, "");
    this.mailuser = "";
    this.maildomain = "";
  }

  onChange(event) {
    if (event.target.id.includes("username")) this.mailuser = event.target.value;
    if (event.target.id.includes("domain")) this.maildomain = event.target.value;
    this.setState({
      [this.stateName]: `${this.mailuser}@${this.maildomain}`
    });
  }

  render() {
    const label = document.createElement("label");
    const username = document.createElement("input");
    const domain = document.createElement("input");
    const div = document.createElement("div");
    const rowDiv = document.createElement("div");
    const separator = document.createTextNode("@");
    label.htmlFor = this.id;
    label.innerText = this.id;
    div.appendChild(label);
    rowDiv.appendChild(username);
    rowDiv.appendChild(separator);
    rowDiv.appendChild(domain);
    rowDiv.style.display = "flex";
    rowDiv.style.flexDirection = "row";
    rowDiv.style.gap = "10px";
    rowDiv.style.alignItems = "center";
    username.type = "text";
    username.id = `${this.id}-username`;
    username.name = "username";
    username.value = this.mailuser;
    username.addEventListener("input", this.onChange.bind(this));
    domain.type = "text";
    domain.id = `${this.id}-domain`;
    domain.name = "domain";
    domain.value = this.maildomain;
    domain.addEventListener("input", this.onChange.bind(this));
    div.appendChild(rowDiv);
    return div;
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