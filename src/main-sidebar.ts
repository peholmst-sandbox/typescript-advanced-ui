import { css, customElement, html, LitElement } from "lit-element";

import "./components/fa-icon";
import "./components/menu-list";

@customElement("main-sidebar")
export class MainSidebar extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
                background-color: #333333;
            }
        `;
    }

    // TODO Scroll if the menu cannot fit on the screen

    render() {
        return html`
            <div>
                <menu-list variant="sidebar" tabindex="0">
                    <menu-item title="Ticket"><fa-icon icon="ticket-alt" category="solid"></fa-icon></menu-item>
                    <menu-item selected title="Globe"><fa-icon icon="globe" category="solid"></fa-icon></menu-item>
                    <menu-item title="Sitemap"><fa-icon icon="sitemap" category="solid"></fa-icon></menu-item>
                    <menu-item title="Fire Extinguisher"><fa-icon icon="fire-extinguisher" category="solid"></fa-icon></menu-item>
                </menu-list>
            </div>
        `;
    }
}
