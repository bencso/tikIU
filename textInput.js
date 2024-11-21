//TODO: Button title

class TextInput {
    constructor(type = "text", id, stateName = "value", stateValue = "") {
        this.stateName = stateName
        this.state = {
            [stateName]: stateValue,
        }
        this.id = id != null ? id : `input${Math.random() * Infinity}`
        this.type = type
    }

    setState(input) {
        this.state[this.stateName] = input;
    }

    getState() {
        return !isNaN(this.state[this.stateName]) ? Number(this.state[this.stateName]) : this.state[this.stateName];
    }

    render() {
        const input = document.createElement("input");
        input.type = this.type;
        input.id = this.id;
        input.oninput = this.onChange;
        input.value = this.state[this.stateName];
        input.state = this.state;
        return input;
    }

    onChange = (event) => {
        this.setState(event.target.value);
    }
}

const formInputs = [
    new TextInput("text", "uname", "uname"),
    new TextInput("date", "bday", "bday"),
    new TextInput("submit","value", "value", "as")
]

const form = document.createElement("form");
formInputs.map((e) => {
    form.appendChild(e.render());
})
document.body.appendChild(form);