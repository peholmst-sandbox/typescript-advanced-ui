import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../utils/app-context";

@customElement("tickets-view")
export class TicketsView extends LitElement {

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the tickets view</div>
        `;
    }
}