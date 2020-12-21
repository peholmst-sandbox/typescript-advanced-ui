import { css, customElement, html, LitElement } from "lit-element";

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

    render() {
        return html`
            <main-header applicationTitle="App Title"></main-header>
            <div id="content-wrapper">
                <main-sidebar></main-sidebar>
                <div id="content-container"></div>
            </div>
            <main-footer></main-footer>
        `;
    }

    // TODO Prevent usage on too small screens
}
