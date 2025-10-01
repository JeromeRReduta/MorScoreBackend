import Interface from "./Interface";

export default class Stemmer extends Interface {
  constructor() {
    super("Stemmer", ["stem"]);
  }

  stem(word) {}
}
