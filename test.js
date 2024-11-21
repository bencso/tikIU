import { Form, Input, Button } from "./form/form.js";

const name = new Input("text", "name");
const age = new Input("number", "age");
const form = new Form("form", [name, age, new Button("submit", "Submit")]);

// Name input value: ""
form.render();
// ""
name.getState();
// "Teszter Béla"
name.setState({ value: "Teszter Béla" });
// "Teszter Béla"
console.log(name.getState());
// Name input value: "Teszter Béla"
form.render();