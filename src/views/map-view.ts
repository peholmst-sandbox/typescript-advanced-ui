import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../utils/app-context";

@customElement("map-view")
export class MapView extends LitElement {

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the map view</div>
        `;
    }
}