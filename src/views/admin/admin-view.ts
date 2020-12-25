import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../../utils/app-context";
import { HasRoutes, RouteRegistry } from "../../utils/new-router";

@customElement("admin-view")
export class AdminView extends LitElement implements HasRoutes {
    
    registerRoutes(registry: RouteRegistry): void {
        throw new Error("Method not implemented.");
    }

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the admin view</div>
        `;
    }
}