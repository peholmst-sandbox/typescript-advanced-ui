import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { inject } from "../utils/app-context";

@customElement("diagnostics-view")
export class DiagnosticsView extends LitElement {

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div>This is the diagnostics view</div>
        `;
    }
}