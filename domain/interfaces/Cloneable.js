import Interface from "./Interface.js";
/** Represents something that can clone itself. Essential for deep copying data structures. */
export default class Cloneable extends Interface {
  constructor() {
    super();
  }

  /** Returns a copy of itself. */
  clone() {}
}
