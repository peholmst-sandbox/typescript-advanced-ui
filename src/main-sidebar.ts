import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "./utils/app-context";
import { Router } from "./utils/router";

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

    @inject({name: "router"})
    private router?: Router;

    // TODO Side bar content should be declared in main app view, not here

    render() {
        return html`
            <div>
                <menu-list variant="sidebar" tabindex="1">
                    <menu-item title="Tickets" ?selected="${this.router?.isCurrentRoute('tickets')}" @select="${this.router?.navigateOnEvent('tickets')}">
                        <fa-icon icon="tasks" category="solid"></fa-icon>
                    </menu-item>
                    <menu-item title="Map" ?selected="${this.router?.isCurrentRoute('map')}" @select="${this.router?.navigateOnEvent('map')}">
                        <fa-icon icon="map-marked-alt" category="solid"></fa-icon>
                    </menu-item>
                    <menu-item title="Resources" ?selected="${this.router?.isCurrentRoute('resources')}" @select="${this.router?.navigateOnEvent('resources')}">
                        <fa-icon icon="truck" category="solid"></fa-icon>
                    </menu-item>
                    <menu-item title="Diagnostics" ?selected="${this.router?.isCurrentRoute('diagnostics')}" @select="${this.router?.navigateOnEvent('diagnostics')}">
                        <fa-icon icon="stethoscope" category="solid"></fa-icon>
                    </menu-item>
                    <menu-item title="Admin" ?selected="${this.router?.isCurrentRoute('admin')}" @select="${this.router?.navigateOnEvent('admin')}">
                        <fa-icon icon="tools" category="solid"></fa-icon>
                    </menu-item>
                </menu-list>
            </div>
        `;
    }
}
