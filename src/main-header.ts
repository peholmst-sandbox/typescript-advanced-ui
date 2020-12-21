import { css, customElement, html, LitElement, property } from "lit-element";

import "./components/user-menu";

@customElement("main-header")
export class MainHeader extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                background-color: #333333;
                justify-content: space-between;
                align-items: center;
                color: #c6c6c6;
                padding-left: 10px;
                padding-right: 10px;
            }

            #app-title {
                font-weight: 500;
                color: #ffffff;
                padding: 5px 0px 5px 0px;
                font-size: 1.5em;
            }          
        `;
    }

    @property()
    applicationTitle: string = "";

    render() {
        return html`
            <div id="app-title">${this.applicationTitle}</div>
            <user-menu></user-menu> <!-- TODO Show current user's avatar, drop-down menu when clicked -->
        `;
    }
}
