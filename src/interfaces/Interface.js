/** Based on the interface implementation from Harmes's and Diaz's "Pro Javascript Design Patterns" */

/** Generic interface implementation */
export default class Interface {
    constructor() {}
    static get ignoredNames() {
        const ignored = new Set([
            "arguments",
            "callee",
            "caller",
            "constructor",
            "apply",
            "bind",
            "call",
        ]);
        let current = new Interface();
        while (current) {
            const propertyNames = Object.getOwnPropertyNames(current);
            for (let name of propertyNames) {
                ignored.add(name);
            }
            current = Object.getPrototypeOf(current);
        }
        Object.getOwnPropertyNames(Interface).forEach((name) =>
            ignored.add(name)
        );
        return ignored;
    }

    static getAllFuncs(o, isInstance) {
        const props = new Set();
        const ignored = Interface.ignoredNames;
        let current = o;
        while (current) {
            // apparently if I delete "let current = o" and type "while (o)" and "Object.getPrototypeOf(o)" it attempts to access private variables and crashes? Maybe it's b/c o is a parameter and is special somehow
            const propertyNames = Object.getOwnPropertyNames(current);
            for (let name of propertyNames) {
                if (!ignored.has(name)) {
                    props.add(name);
                }
            }
            current = isInstance
                ? Object.getPrototypeOf(current)
                : current.prototype;
        }
        return props;
    }

    /** Asserts that an object implements a given interface. Meant for type-checking, so WILL CRASH PROGRAM if interface is not implemented */
    static implements(interfaceName, objClassName) {
        const objMethods = Interface.getAllFuncs(objClassName, true);
        const interfaceMethods = Interface.getAllFuncs(interfaceName, false);
        const missing = [...interfaceMethods].filter(
            (e) => !objMethods.has(e) && !Interface.ignored.has(e)
        );
        if (missing.length > 0) {
            throw new Error(`missing functions: ${missing.join(", ")}`);
        }
    }
}
