import Interface from "./Interface";

/** Represents something that can clone itself. Essential for deep copying data structures. */
export default class Cloneable extends Interface {
    constructor() {
        super("Cloneable", ["clone"]);
    }

    /** Returns a copy of itself. */
    clone() {}
}
