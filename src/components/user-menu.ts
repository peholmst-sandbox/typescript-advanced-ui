import { css, customElement, html, LitElement, property, query } from "lit-element";

import "./menu-list";
import "./popup-overlay"
import "./user-avatar";

import { PopupOverlay } from "./popup-overlay";

// TODO This is probably not a re-usable component anymore.

@customElement("user-menu")
export class UserMenu extends LitElement {

    static get styles() {
        return css`
            :host {
                display: inline-block;
            }

            #menu-button {
                display: flex;
                align-items: center;
                padding: 5px;
                outline: none
            }

            #menu-button:hover, #menu-button:focus {
                background-color: rgba(255,255,255,0.2);
            }

            #user-info {
                text-align: center;
                padding: 10px;
                margin-bottom: 10px;
                font-size: 1.5em;
                width: 250px;
            }
        `;
    }

    @property({ type: Boolean })
    expanded: boolean = false;

    @query("#menu")
    private _menu!: PopupOverlay;

    @query("#menu-button")
    private _button!: HTMLElement;

    render() {
        return html`
            <div id="menu-button" @click="${this.onMenuButtonClick}" tabindex="0" @keydown="${this.onMenuButtonKeyDown}">
                <user-avatar title="Joe Cool" size="small" initials="JC" imageUrl="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"></user-avatar> <!-- TODO Show current user's avatar, drop-down menu when clicked -->
            </div>
            <popup-overlay id="menu">
                <div id="user-info">
                    <user-avatar id="user-avatar" size="large" initials="JC" imageUrl="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"></user-avatar> <!-- TODO Show current user's avatar, drop-down menu when clicked -->
                    <div id="user-name">Joe Cool</div>
                </div>
                <menu-list>
                    <menu-item>My Profile</menu-item>
                    <menu-item>Change Password</menu-item>
                    <menu-item>Logout</menu-item>
                </menu-list>
            </popup-overlay>
        `;
    }

    private onMenuButtonClick(event: MouseEvent) {
        this.toggleMenu();
    }

    private onMenuButtonKeyDown(event: KeyboardEvent) {
        if (event.code === "Space") {
            event.preventDefault();
            this.toggleMenu();
        }
    }

    private toggleMenu() {
        if (this._menu.opened) {
            this._menu.close();
        } else {
            this._menu.openNextToElement(this._button);
        }
    }
}
