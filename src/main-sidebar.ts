import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "./utils/app-context";

import "./components/fa-icon";
import "./components/menu-list";
import { Router } from "./utils/router";

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

    @inject({name: "router"})
    private router?: Router;

    render() {
        console.log(this.router);
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
