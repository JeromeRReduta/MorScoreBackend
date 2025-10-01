import Interface from "./Interface";

export default class InvertedIndex extends Interface {
  constructor() {
    super("InvertedIndex", ["add", "getPostingsList"]);
  }

  add(term, posting) {}

  getPostingsList(term) {}
}
