export class Button {
    constructor(id, text = "Submit", onClick = () => {}) {
        this.id = id != null ? id : `button${Math.random() * Infinity}`;
        this.text = text;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement("button");
        button.id = this.id;
        button.innerText = this.text;
        button.onclick = this.onClick;
        return button;
    }
}