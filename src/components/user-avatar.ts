import { css, customElement, html, LitElement, property } from "lit-element";

export type UserAvatarSize = "small" | "medium" | "large";

@customElement("user-avatar")
export class UserAvatar extends LitElement {

    static get styles() {
        return css`
            :host {
                display: inline-block;
            }
            #avatar {
                border-radius: 50%;
                background-color: #c3c3c3;
                border: 1px solid #a0a0a0;
                overflow: hidden;
            }
            #avatar.small {
                width: 24px;
                height: 24px;
                font-size: 12px;
            }
            #avatar.medium {
                width: 48px;
                height: 48px;
                font-size: 24px;
            }
            #avatar.large {
                width: 80px;
                height: 80px;
                font-size: 40px;
            }
            #avatar div {
                font-weight: 600;
                color: #000000;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
            }
            #avatar img {
                height: 100%;
                width: 100%;
            }
        `;
    }

    @property()
    initials: string = "";

    @property()
    imageUrl: string = "";

    @property()
    size: UserAvatarSize = "medium";

    render() {
        return html`
            <div id="avatar" class="${this.size}">
                ${this.imageUrl ? html`<img src="${this.imageUrl}">` : html`<div>${this.initials}</div>`}
            </div>
        `;
    }
}
