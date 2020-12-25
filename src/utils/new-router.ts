import { RouterEventType } from "./router";

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
    navigate: (() => Promise<Element>);
    postNavigate?: (() => Promise<any>);
}

/**
 * TODO Document me
 */
export interface RouteContext {
    parentContext(): RouteContext | undefined;
    contextPath(): string;
    findRouteById(routeId: RouteId): Route | undefined;
    findRouteByPath(path: String): Route | undefined;
}

/**
 * TODO Document me
 */
export interface RouteRegistry{
    withRoute(route: Route): RouteRegistry;
    add(route: Route): void;
}

/**
 * TODO Document me
 */
export interface RouteRenderer {
    render(element: Element, route: Route, context: RouteContext): Promise<void>;
}

/**
 * 
 */
export interface Router {
    navigateToPath(path: string): Promise<void>;
    navigateToRoute(route: RouteId, context?: RouteContext): Promise<void>;
}

/**
 * 
 */
export interface HasRoutes {
    registerRoutes(registry: RouteRegistry): void;
}

/**
 * 
 */
class DefaultRouter implements Router {

    private rootContext?: RouteContext;

    navigateToPath(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    navigateToRoute(route: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

/**
 * 
 */
