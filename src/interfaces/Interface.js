/** Based on the interface implementation from Harmes's and Diaz's "Pro Javascript Design Pattners" */

export default class Interface {
  name;
  methodNames;

  constructor(name, methodNames) {
    if (arguments.length != 2) {
      throw new Error(
        "Interface constructor called w/" +
          arguments.length +
          "arguments; expects 2"
      );
    }
    this.name = name;
    this.methodNames = [];
    for (let methodName of methodNames) {
      if (typeof methodName !== "string") {
        throw new Error(
          "Interface constructor expects method names as strings"
        );
      }
      this.methodNames.push(methodName);
    }
  }

  static complies(InterfaceName, obj) {
    if (arguments.length != 2) {
      throw new Error(
        "Function 'complies' has " + arguments.length + " arguments; expects 2"
      );
    }
    const myInterface = new InterfaceName(); // TODO: kind of unholy
    for (let methodName of myInterface.methodNames) {
      if (!obj[methodName] || typeof obj[methodName] !== "function") {
        throw new Error(
          `Object does not implement ${myInterface.name}.${methodName}`
        );
      }
    }
  }
}
