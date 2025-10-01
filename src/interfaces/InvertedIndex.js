import Interface from "./Interface";

export default class InvertedIndex extends Interface {
  constructor() {
    super("InvertedIndex", ["add", "getPostingsListsFor"]);
  }

  add(textSource) {}

  getPostingsListsFor(tokens) {}
}
