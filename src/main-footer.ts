import { css, customElement, html, LitElement } from "lit-element";

@customElement("main-footer")
export class MainFooter extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
                background-color: #14825D; /* TODO use different colors to indicate server connection state */
            }
        `;
    }

    render() {
        return html`
            <div>This is the footer</div>
        `;
    }
}
