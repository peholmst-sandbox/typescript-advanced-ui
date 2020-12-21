import { css, customElement, html, LitElement, property, svg } from "lit-element";
import { unsafeSVG } from "lit-html/directives/unsafe-svg";

export type FaIconSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type FaIconCategory = "brands" | "regular" | "solid";

@customElement("fa-icon")
export class FaIcon extends LitElement {

    static get styles() {
        return css`
            :host {
                display: inline-block;
            }

            svg {
                vertical-align: middle;
                width: 100%;
                height: 100%;
                fill: white; /* TODO make this configurable in some way */
            }

            .x-small {
                width: 16px;
                height: 16px;
            }

            .small {
                width: 24px;
                height: 24px;
            }

            .medium {
                width: 32px;
                height: 32px;
            }

            .large {
                width: 48px;
                height: 48px;
            }

            .x-large {
                width: 96px;
                height: 96px;
            }
        `;
    }

    @property()
    icon: string = "";

    @property()
    size: FaIconSize = "medium";

    @property()
    category: FaIconCategory = "regular";

    render() {
        const svg = `<svg><use xlink:href="assets/fontawesome/${this.category}.svg#${this.icon}"></svg>`;
        return html`
            <div class="${this.size}">
                ${unsafeSVG(svg)}
            </div>
        `;
    }
}