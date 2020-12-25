import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../../utils/app-context";

@customElement("admin-resources-view")
export class AdminResourcesView extends LitElement {
    
    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the resources admin view</div>
        `;
    }
}