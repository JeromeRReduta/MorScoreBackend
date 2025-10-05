/** Based on the interface implementation from Harmes's and Diaz's "Pro Javascript Design Patterns" */

/** Generic interface implementation */
/** Todo: give class chain from static class, so as to get instance Methods AND static methods */
export default class Interface {
    static ignored = new Set(["length", "name", "prototype", "constructor"]);
    constructor() {}

    static methodNamesOf(className) {
        const names = new Set();
        let current = className;
        while (current) {
            const props = Object.getOwnPropertyNames(current);
            for (let prop of props) {
                if (Interface.#isValidName(current, prop)) {
                    names.add(prop);
                }
            }
            current = current.prototype;
        }
        return names;
    }

    static #isValidName(current, prop) {
        if (Interface.ignored.has(prop)) {
            return false;
        }
        try {
            return typeof current[prop] === "function";
        } catch (e) {
            if (
                !e.message
                    .toLowerCase()
                    .startsWith("cannot read private member")
            ) {
                // can't find a way to avoid reading a private var so w/ Object.getOwnPropertyNames() or Reflect.ownKeys() and can't actually check if a given var is private so we just ignore private var read errors
                console.error(e);
            }
            return false;
        }
    }

    /** Asserts that an object implements a given interface. Meant for type-checking, so WILL CRASH PROGRAM if interface is not implemented */
    static implements(interfaceName, objClassName) {
        const objMethods = Interface.methodNamesOf(objClassName);
        const interfaceMethods = Interface.methodNamesOf(interfaceName);
        const missing = [...interfaceMethods].filter(
            (e) => !objMethods.has(e) && !Interface.ignored.has(e)
        );
        if (missing.length > 0) {
            throw new Error(`missing functions: ${missing.join(", ")}`);
        }
    }
}
