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
    })
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
      } else form.appendChild(child.render());
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
    const input = document.getElementById(this.id);
    input.value = this.state[this.stateName];
  }

  clearState() {
    this.setState({
      [this.stateName]: ""
    });
  }

  getState() {
    return isNaN(this.state[this.stateName]) ?
      this.state[this.stateName] :
      Number(this.state[this.stateName]);
  }

  //TODO: not just only HTML types
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
    this.setState({
      [this.stateName]: event.target.value
    });
  };
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