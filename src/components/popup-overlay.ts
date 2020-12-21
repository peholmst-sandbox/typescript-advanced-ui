import { css, customElement, html, internalProperty, LitElement, property, query } from "lit-element";

@customElement("popup-overlay")
export class PopupOverlay extends LitElement {

    static get styles() {
        return css`
            #popup {
                position: fixed;
                visibility: hidden;
                width: auto;
                height: auto;
                background-color: #292a2d;
                color: #ffffff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                overflow: hidden;
            }

            #popup.visible {
                visibility: visible;
            }
        `;
    }

    @internalProperty()
    private visible: boolean = false;

    @query("#popup")
    private _popup?: HTMLElement;

    @property({ type: Boolean })
    closeOnOutsideClick: boolean = true;

    openAtPosition(left: number, top: number) {
        this.popup.style.left = `${left}px`;
        this.popup.style.top = `${top}px`;
        this.visible = true;
    }

    openNextToElement(element: HTMLElement) {
        let width = this.popup.offsetWidth;
        let height = this.popup.offsetHeight;

        // Default position is directly below the element, aligned to the left side of the element
        var left = element.offsetLeft;
        var top = element.offsetTop + element.offsetHeight;

        // If the popup would extend past the left side of the screen, align it to the right side of the element
        var screenWidth = document.body.offsetWidth;
        if (left + width > screenWidth) {
            left = element.offsetLeft + element.offsetWidth - width;
        }

        // If the opup would extend past the bottom side of the screen, open it above the element
        var screenHeight = document.body.offsetHeight;
        if (top + height > screenHeight) {
            top = element.offsetTop - height;
        }

        this.openAtPosition(left, top);        
    }

    close() {
        this.visible = false;
    }

    get opened() {
        return this.visible;
    }

    private get popup() {
        if (!this._popup) {
            throw new Error("Popup div is not accessible");
        }
        return this._popup;
    }

    private outsideClickListener = (event: Event) => {
        if (this.closeOnOutsideClick) {

        }
    };

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("click", this.outsideClickListener);
    }

    disconnectedCallback() {
        document.removeEventListener("click", this.outsideClickListener);
        super.disconnectedCallback();
    }

    private onKeyDown(event: KeyboardEvent) {
        if (event.code === "Escape") {
            event.preventDefault();
            this.close();
        }
    }

    render() {
        return html`
            <div id="popup" class="${this.visible ? 'visible' : 'hidden'}" tabindex="0" @keydown="${this.onKeyDown}">
                <slot></slot>
            </div>
        `;
    }

    // TODO Move when browser is resized
    // TODO Close when clicking outside
    // TODO Animate popup
    // TODO Close when pressing escape
    // TODO Close when losing focus?
}
