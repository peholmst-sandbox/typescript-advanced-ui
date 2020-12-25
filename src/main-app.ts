import { css, customElement, html, LitElement, query } from "lit-element";
import { appContext } from "./utils/app-context";
import { Router, ElementRouteRenderer } from "./utils/router";

// Make the configuration object available in the app context.
import config from "./app-config";
appContext().put("config", config);

import "./main-footer";
import "./main-header";
import "./main-sidebar";

@customElement("main-app")
export class MainApp extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-size: 11pt;
            }

            #content-wrapper {
                display: flex;
                flex-direction: row;
                flex-grow: 1;
            }

            #content-container {
                display: block;
                flex-grow: 1;
                background-color: #1e1e1e;
            }
        `;
    }

    private router: Router;

    constructor() {
        super();
        this.router = appContext()
            .put("router", new Router())
            .withRoute({
                id: "tickets",
                path: "tickets",
                tagName: "tickets-view",
                preNavigate: async () => await import("./views/tickets-view")
            })
            .withRoute({
                id: "resources",
                path: "resources",
                tagName: "resources-view",
                preNavigate: async () => await import("./views/resources-view")
            })
            .withRoute({
                id: "map",
                path: "map",
                tagName: "map-view",
                preNavigate: async () => await import("./views/map-view")
            })
            .withRoute({
                id: "diagnostics",
                path: "diagnostics",
                tagName: "diagnostics-view",
                preNavigate: async () => await import("./views/diagnostics-view")
            })
            .withRoute({
                id: "admin",
                path: "admin",
                tagName: "admin-view",
                preNavigate: async () => await import("./views/admin/admin-view")
            })
            .withRenderer(new ElementRouteRenderer(() => (this.shadowRoot!.getElementById("content-container")!)))
            .attachToWindow(window, config.contextPath);
            // TODO Error route
            // TODO Default route
    }

    render() {
        return html`
            <main-header applicationTitle="iDispatch Web"></main-header>
            <div id="content-wrapper">
                <main-sidebar></main-sidebar>
                <div id="content-container"></div>
            </div>
            <main-footer></main-footer>
        `;
    }

    // TODO Prevent usage on too small screens
    // TODO Login and logout
}
