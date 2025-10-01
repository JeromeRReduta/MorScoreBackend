import Interface from "./Interface";

export default class Cloneable extends Interface {
    constructor() {
        super("Cloneable", ["clone"]);
    }

    clone() {}
}
