/**
 * TODO Document me
 */
export class AppContext { // TODO Turn into interface and expose only that?

    private _name: string;
    private _objects: any = {};

    constructor(name: string) {
        this._name = name;
    }

    /**
     * The name of this app context.
     */
    get name() {
        return this._name;
    }

    /**
     * Stores the given object in this app context. If an object with the given name already exists, an error is thrown.
     * 
     * @param name the name of the object.
     * @param object either the object itself or a function that will return the object when needed.
     * @returns the passed in object or function.
     */
    put(name: string, object: Function | Object): Function | Object {
        if (this._objects[name]) {
            throw new Error(`An object with the name "${name}" already exists in app context "${this.name}"`);
        }
        console.debug(`Adding new object "${name}" to app context "${this.name}"`);
        this._objects[name] = object;
        return object;
    }

    /**
     * Gets the object with the given name from this app context. If no object with the given name exists, an error is thrown.
     * 
     * @param name the name of the object.
     * @returns the object.
     */
    get(name: string): any {
        console.debug(`Looking for object "${name}" in app context "${this.name}"`);
        const o = this._objects[name];
        if (typeof o === "function") {
            console.debug(`Object "${name}" is a function`);
            return o();
        } else {
            if (!o) {
                throw new Error(`Could not find object "${name}" in app context "${this.name}"`);
            }
            return o;
        }
    }
}

let contexts: any = {
    default: new AppContext("default")
};

/**
 * TODO Document me
 * 
 * @param name 
 */
export function appContext(name: string = ""): AppContext {
    if (name.length === 0) {
        return contexts.default;
    } else {
        let context = contexts[name];
        if (!context) {
            context = new AppContext(name);
            contexts[name] = context;
            console.log(`Registering new app context "${name}"`);
        }
        return context;
    }
}

/**
 * TODO Document me
 */
export interface ObjectDefinition {
    readonly name: string;
    readonly appContext?: string;
}

/**
 * TODO Document me
 * 
 * @param definition 
 */
export function inject(definition: ObjectDefinition) {
    return (target: any, propertyKey: PropertyKey): any => {
        const descriptor = {
            get(this: any) {
                return appContext(definition.appContext).get(definition.name);
            },
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, propertyKey, descriptor);
    };
}
