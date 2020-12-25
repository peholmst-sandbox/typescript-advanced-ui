import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../utils/app-context";

@customElement("resources-view")
export class ResourcesView extends LitElement {

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the resources view</div>
        `;
    }
}