import { css, customElement, html, LitElement, query, property, queryAssignedNodes } from "lit-element";

export type MenuListVariant = "sidebar" | "popup";

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
            }

            .sidebar ::slotted(menu-item:hover) {
                opacity: 1.0;
            }

            .sidebar ::slotted(menu-item[selected]) {
                border-left: 3px white solid;
                padding-left: 7px;
                opacity: 1.0;
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
    }

    render() {
        return html`
            <div part="up-button"></div>
            <div part="items" class="${this.variant}">
                <slot></slot>
            </div>
            <div part="down-button"></div>
        `;
    }

    private get items(): MenuItem[] {
        const slot = this.shadowRoot?.querySelector("slot");
        if (!slot) {
            return [];
        }
        const childNodes = slot.assignedNodes({ flatten: true });
        return <MenuItem[]>childNodes.filter((node) => node instanceof MenuItem);
    }

    private getSelectedItem(): MenuItem | undefined {
        return this.items.find((item) => item.selected);
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

    private select(item: MenuItem) {
        const currentSelection = this.getSelectedItem();
        if (currentSelection) {
            currentSelection.selected = false;
        }
        console.log(item);
        item.selected = true;
    }

    private onKeyDown(event: KeyboardEvent) {
        const selected = this.getSelectedItem();
        // TODO Actually, it is not the selection that is moving but the focus. Selection should change after you click an item
        if (selected) {
            if (event.code === "ArrowUp") {
                this.select(this.getSibling(selected, -1));
            } else if (event.code === "ArrowDown") {
                this.select(this.getSibling(selected, 1));
            } else if (event.code === "Space" || event.code === "Enter") {
                console.log('space'); // TODO This is where you select an item
            }    
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

    @property()
    href!: string;

    @property({ type: Boolean, reflect: true })
    selected: boolean = false;

    // TODO Click listener
    // TODO Icon
    // TODO Selected

    render() {
        return html`
            <div part="menu-item"><slot></slot></div>
        `;
    }

}