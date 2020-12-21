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

    render() {
        return html`
            <div>
                <menu-list variant="sidebar" tabindex="1">
                    <menu-item title="Ticket" selected @select="${(e: CustomEvent) => {console.log(e.target)}}"><fa-icon icon="ticket-alt" category="solid"></fa-icon></menu-item>
                    <menu-item title="Globe" @select="${(e: CustomEvent) => {console.log(e.target)}}"><fa-icon icon="globe" category="solid"></fa-icon></menu-item>
                    <menu-item title="Sitemap" @select="${(e: CustomEvent) => {console.log(e.target)}}"><fa-icon icon="sitemap" category="solid"></fa-icon></menu-item>
                    <menu-item title="Fire Extinguisher" @select="${(e: CustomEvent) => {console.log(e.target)}}"><fa-icon icon="fire-extinguisher" category="solid"></fa-icon></menu-item>
                </menu-list>
            </div>
        `;
    }
}
