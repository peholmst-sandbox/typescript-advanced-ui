import { css, customElement, html, LitElement, query, property, queryAssignedNodes } from "lit-element";

export type MenuListVariant = "sidebar" | "popup"; // TODO Consider splitting up into two subclasses instead

@customElement("menu-list")
export class MenuList extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }

            .sidebar ::slotted(menu-item) {
                padding: 10px 10px;
                opacity: 0.5;
                outline: none;
            }

            .sidebar ::slotted(menu-item:hover),
            .sidebar ::slotted(menu-item:focus) {
                opacity: 1.0;
            }

            .sidebar ::slotted(menu-item[selected]) {
                border-left: 3px #ffffff solid;
                background-color: rgba(255, 255, 255, 0.2);
                padding-left: 7px;
            }

            .popup ::slotted(menu-item) {
                padding: 10px 20px;
            }

            .popup ::slotted(menu-item:hover) {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
    }

    @property()
    variant: MenuListVariant = "popup";

    constructor() {
        super();
        this.addEventListener("keydown", this.onKeyDown);
        this.addEventListener("focus", this.onFocus);
    }

    // TODO Up and down buttons for scrolling instead of ordinary scrollbar

    render() {
        return html`
            <div part="up-button"></div>
            <div part="items" class="${this.variant}">
                <slot @slotchange="${this.onSlotChange}"></slot>
            </div>
            <div part="down-button"></div>
        `;
    }

    /**
     * An array of all the items in the menu.
     */
    get items(): MenuItem[] {
        const slot = this.shadowRoot?.querySelector("slot");
        if (!slot) {
            return [];
        }
        const childNodes = slot.assignedNodes({ flatten: true });
        return <MenuItem[]>childNodes.filter((node) => node instanceof MenuItem);
    }

    private getSibling(item: MenuItem, offset: number = 1): MenuItem {
        const items = this.items;
        const index = items.indexOf(item);
        if (index < 0) {
            throw new Error("No such menu item");
        }
        let sibling = index + offset;
        if (sibling < 0) {
            sibling = items.length -1;
        } else if (sibling > items.length -1) {
            sibling = 0;
        }
        return items[sibling];
    }

    private selectItem(item: MenuItem) {
        const currentSelection = this.selectedItem;
        if (currentSelection === item) {
            return;
        }
        if (currentSelection) {
            currentSelection.selected = false;
        }
        item.selected = true;
        if (item.selected) { // Selection change may have been prevented
            this.focusItem(item);
        }
    }

    /**
     * The currently selected item or undefined if no item is selected.
     */
    get selectedItem(): MenuItem | undefined {
        return this.items.find((item) => item.selected);
    }

    private focusItem(item: MenuItem) {
        const currentFocus = this.focusedItem;
        if (currentFocus === item) {
            return;
        }
        item.focus();
    }

    /**
     * The currently focused item or undefined if no item is focused.
     */
    get focusedItem(): MenuItem | undefined {
        let focusedElement = document.activeElement;
        // Need to traverse the shadow roots to find the actual active element
        while (focusedElement?.shadowRoot?.activeElement) {
            focusedElement = focusedElement.shadowRoot.activeElement;
        }
        return this.items.find((item) => item === focusedElement)
    }

    private onKeyDown(event: KeyboardEvent) {
        const focused = this.focusedItem;
        if (focused) {
            if (event.code === "ArrowUp") {
                event.preventDefault();
                this.focusItem(this.getSibling(focused, -1));
            } else if (event.code === "ArrowDown") {
                event.preventDefault();
                this.focusItem(this.getSibling(focused, 1));
            } else if (event.code === "Space" || event.code === "Enter") {
                event.preventDefault();
                this.selectItem(focused);
            }    
        }
    }

    private onFocus(event: FocusEvent) {
        const currentSelection = this.selectedItem;
        // Whenever the menu list itself gets focused from the outside world, it is the current selection
        // that should be focused. If there is no current selection, the first item should be focused.
        if (currentSelection) {
            this.focusItem(currentSelection);
        } else {
            const items = this.items;
            if (items.length > 0) {
                this.focusItem(items[0]);
            }
        }
    }

    private onSlotChange(event: Event) {
        // TODO Do I need to remove the old listeners or will this leak memory / cause double listeners?
        this.items.forEach((item) => {
            item.addEventListener("click", this.onItemClick.bind(this));
            item.tabIndex = -1;
        });
    }

    private onItemClick(event: MouseEvent) {
        if (event.currentTarget instanceof MenuItem) {
            this.selectItem(<MenuItem>event.currentTarget);
        }
    }
}

@customElement("menu-item")
export class MenuItem extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }

            [part=menu-item] {
                display: block;
                outline: none;
                background-color: transparent;
            }
        `;
    }

    private _selected: boolean = false;

    @property({ type: Boolean, reflect: true })
    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        const oldValue = this._selected;
        if (oldValue === value) {
            return;
        }
        this._selected = value;
        if (this.fireSelectionChangeEvent()) {
            this.requestUpdate("selected", oldValue);
        } else {
            this._selected = oldValue;
        }
    }

    private fireSelectionChangeEvent(): boolean {
       let event = new CustomEvent(this.selected ? "select" : "unselect", {
           cancelable: true
       }); 
       return this.dispatchEvent(event);
    }

    render() {
        return html`
            <div part="menu-item"><slot></slot></div>
        `;
    }
}