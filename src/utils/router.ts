/**
 * TODO Document me
 */
export type RouteId = string;

/**
 * TODO Document me
 */
export interface Route {
    id: RouteId;
    path: string;
    preNavigate?: (() => Promise<any>);
    postNavigate?: (() => Promise<any>);
    tagName: string;
}

/**
 * TODO Document me
 */
export interface RouteRenderer {
    render(route: Route): Promise<void>;
}

/**
 * A route renderer that renders the route by adding it into another element.
 */
export class ElementRouteRenderer implements RouteRenderer {

    private _container: Element | (() => Element);

    /**
     * Creates a new renderer.
     * 
     * @param container either the element to render into or a function that will return said element.
     */
    constructor(container: Element | (() => Element)) {
        if (typeof container === "function") {
            console.log("Using a function to retrieve the container element");
        } else {
            console.log("Using container element", container);
        }
        this._container = container;
    }

    private get container(): Element {
        if (typeof this._container === "function") {
            return this._container();
        } else {
            return this._container;
        }
    }

    async render(route: Route): Promise<void> {
        const container = this.container;
        console.debug("Rendering into container", container);
        if (route.preNavigate) {
            console.debug("Invoking pre-navigation function");
            await route.preNavigate();
        }
        const element = document.createElement(route.tagName);
        console.debug("Rendering", element);
        while (container.lastElementChild) {
            container.removeChild(container.lastElementChild);
        }
        container.appendChild(element);
        if (route.postNavigate) {
            console.debug("Invoking post-navigation function");
            await route.postNavigate();
        }
    }
}

export class RouteRegistry {

    private routes: Map<RouteId, Route> = new Map();

    /**
     * 
     * @param routeId 
     */
    findRouteById(routeId: RouteId): Route | undefined {
        return this.routes.get(routeId);
    }

    /**
     * 
     * @param path 
     */
    findRouteByPath(path: string): Route | undefined {
        return Array.from(this.routes.values()).find(route => path.startsWith(route.path));
    }    
}

/**
 * TODO Document me
 */
export enum RouterEventType {
    prenavigate,
    postnavigate
}

/**
 * TODO Document me
 */
export interface RouterStateAdapter {
    currentRoute(): Route | undefined;
    attach(router: Router): void;
    detach(): void;
}

/**
 * TODO Document me
 */
export class Router extends EventTarget {

    // TODO Finish me!

    private routes: Map<RouteId, Route> = new Map();
    private renderer?: RouteRenderer;
    private stateAdapter?: RouterStateAdapter;

    /**
     * 
     * @param renderer 
     */
    withRenderer(renderer: RouteRenderer): Router {
        console.log("Using renderer", renderer);
        this.renderer = renderer;
        return this;
    }

    /**
     * 
     * @param stateAdapter 
     */
    withStateAdapter(stateAdapter: RouterStateAdapter): Router {
        console.log("Using state adapter", stateAdapter);
        if (this.stateAdapter) {
            this.stateAdapter.detach();
        }
        this.stateAdapter = stateAdapter;
        stateAdapter.attach(this);
        return this;
    }

    /**
     * 
     * @param route 
     */
    withRoute(route: Route): Router {
        console.log("Registering route", route);
        this.routes.set(route.id, route);
        return this;
    }

    /**
     * 
     * @param routeId 
     */
    withDefaultRoute(routeId: RouteId): Router {
        return this;
    }

    /**
     * 
     * @param route 
     */
    withErrorRoute(route: Route): Router {
        return this;
    }

    /**
     * 
     * @param window 
     * @param contextPath
     */
    attachToWindow(window: Window, contextPath: string): Router {
        return this.withStateAdapter(new WindowAdapter(window, contextPath));
    }

    /**
     * 
     */
    get currentRoute(): Route | undefined {
        return this.stateAdapter?.currentRoute();
    }

    /**
     * 
     * @param routeId 
     */
    isCurrentRoute(routeId: RouteId): boolean {
        const currentRoute = this.currentRoute;
        return currentRoute !== undefined && currentRoute.id === routeId;
    }

    /**
     * 
     * @param routeId 
     */
    async navigateTo(routeId: RouteId) {
        if (this.isCurrentRoute(routeId)) {
            return; // Do nothing, we are already here.
        }
        if (!this.renderer) {
            throw new Error("No renderer has been set");
        }
        try {
            const route = this.routes.get(routeId);
            if (!route) {
                throw new Error(`Route ${routeId} does not exist`);
            }
            const preNavigateEvent = new CustomEvent(RouterEventType.prenavigate.toString(), {
                cancelable: true,
                detail: {
                    old: this.currentRoute,
                    route: route
                }
            });
            if (this.dispatchEvent(preNavigateEvent)) {
                console.log("Navigating to", route);
                await this.renderer.render(route);
                const postNavigateEvent = new CustomEvent(RouterEventType.postnavigate.toString(), {
                    detail: {
                        route: route
                    }
                });
                this.dispatchEvent(postNavigateEvent);
            } else {
                console.log("Cancelled navigation to", route);
            }
        } catch (error) {
            await this.handleError(error);
        }
    }

    private async handleError(error: Error) {
        console.error(error); // TODO Implement me!
    }

    /**
     * 
     * @param route 
     */
    navigateOnEvent(route: RouteId): ((e: Event) => void) {
        return (e: Event) => {
            this.navigateTo(route);
        };
    }

    /**
     * 
     * @param routeId 
     */
    findRouteById(routeId: RouteId): Route | undefined {
        return this.routes.get(routeId);
    }

    /**
     * 
     * @param path 
     */
    findRouteByPath(path: string): Route | undefined {
        return Array.from(this.routes.values()).find(route => path.startsWith(route.path));
    }
}

class WindowAdapter implements RouterStateAdapter {

    private router?: Router;
    private window: Window;
    private contextPath: string;

    constructor(window: Window, contextPath: string) {
        this.window = window;
        this.contextPath = contextPath;
    }

    currentRoute(): Route | undefined {
        const currentPath = this.window.location.pathname;
        if (!currentPath.startsWith(this.contextPath)) {
            throw new Error("Current window location path does not start with the context path");
        }
        let relativePath = currentPath.substr(this.contextPath.length);
        if (relativePath.startsWith('/')) {
            relativePath = relativePath.substr(1);
        }
        return this.router?.findRouteByPath(relativePath);
    }

    attach(router: Router): void {
        this.router = router;
        router.addEventListener(RouterEventType.postnavigate.toString(), this.onPostNavigate);
        this.window.addEventListener("popstate", this.onPopState);
    }

    detach(): void {
        this.router?.removeEventListener(RouterEventType.postnavigate.toString(), this.onPostNavigate);
        this.router = undefined;
        this.window.removeEventListener("popstate", this.onPopState);
    }

    private onPostNavigate = (e: Event) => {
        const route = <Route>(<CustomEvent>e).detail.route;
        const path = this.buildPath(route);
        this.window.history.pushState({ id: route.id }, "", path);
    };

    private onPopState = (e: PopStateEvent) => {
        console.log(e);
    }

    private buildPath(route: Route): string {
        return route.path;
    }

}

