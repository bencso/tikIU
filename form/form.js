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

  render() {
    const form = document.createElement("form");
    form.id = this.id;
    form.method = this.method;
    form.action = this.action;

    const buttonRow = this.createButtonRow();
    this.children.forEach((child) => {
      if (child instanceof Button) {
        buttonRow.append(child.render());
      } else {
        form.append(child.render());
      }
    });

    form.appendChild(buttonRow);
    this.addThemeClass(form);
    document.body.appendChild(form);
  }

  createButtonRow() {
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("button-row");
    buttonRow.style.display = "flex";
    buttonRow.style.flexDirection = "row";
    buttonRow.style.gap = "10px";
    return buttonRow;
  }
}

//TODO: More attributes for input
export class Input {
  constructor(type = "text", id, stateName = "value", stateValue = "") {
    this.id = id || `input${Math.random().toString(36).substring(2, 11)}`;
    this.type = type;
    this.stateName = stateName;
    this.state = { [stateName]: stateValue };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  clearState() {
    this.setState({ [this.stateName]: "" });
    const input = document.getElementById(this.id);
    if (input) {
      input.value = "";
    }
  }

  getState() {
    return this.state[this.stateName];
  }

  render() {
    const label = document.createElement("label");
    label.htmlFor = this.id;
    label.innerText = this.id;
    const input = document.createElement("input");
    input.type = this.type;
    input.id = this.id;
    input.name = this.stateName;
    input.value = this.state[this.stateName];
    input.oninput = this.onChange;

    label.appendChild(input);
    return label;
  }

  onChange = (event) => {
    this.setState({ [this.stateName]: event.target.value });
  };
}
export class CustomEmailInput extends Input {
  constructor(id, stateName = this.stateName, stateValue = this.stateValue) {
    super("custom-email", id, stateName, stateValue);
    this.state[stateName] = { name: "", domain: "", email: "" };
  }

  render() {
    const label = document.createElement("label");
    label.htmlFor = this.id;
    label.innerText = this.stateName;

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";

    const nameInput = this.createInput(
      `${this.id}-name`,
      `${this.stateName}-name`,
      this.state[this.stateName].name,
      this.onNameChange
    );
    const domainInput = this.createInput(
      `${this.id}-domain`,
      `${this.stateName}-domain`,
      this.state[this.stateName].domain,
      this.onDomainChange
    );

    container.appendChild(nameInput);
    container.appendChild(document.createTextNode("@"));
    container.appendChild(domainInput);

    label.appendChild(container);
    return label;
  }

  createInput(id, name, value, onChange) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.name = name;
    input.value = value;
    input.oninput = onChange;
    return input;
  }

  onNameChange = (event) => {
    const name = event.target.value;
    const email = `${name}@${this.state[this.stateName].domain}`;
    this.setState({
      [this.stateName]: { ...this.state[this.stateName], name, email },
    });
  };

  onDomainChange = (event) => {
    const domain = event.target.value;
    const email = `${this.state[this.stateName].name}@${domain}`;
    this.setState({
      [this.stateName]: { ...this.state[this.stateName], domain, email },
    });
  };

  getState() {
    return this.state[this.stateName];
  }

  clearState() {
    this.setState({ [this.stateName]: { name: "", domain: "", email: "" } });
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
    button.onclick = this.onClick;
    return button;
  }
}
