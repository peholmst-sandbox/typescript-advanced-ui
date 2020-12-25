import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../../utils/app-context";

@customElement("admin-stations-view")
export class AdminStationsView extends LitElement {
    
    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the station admin view</div>
        `;
    }
}