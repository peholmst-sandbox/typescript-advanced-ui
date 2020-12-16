import { css, customElement, html, LitElement } from "lit-element";

@customElement("main-app")
export class MainApp extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    render() {
        return html`
            <div>Hello world</div>
        `;
    }
}
