import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../../utils/app-context";

@customElement("admin-users-view")
export class AdminUsersView extends LitElement {
    
    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the user admin view</div>
        `;
    }
}