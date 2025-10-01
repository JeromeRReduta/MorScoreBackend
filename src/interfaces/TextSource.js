import Interface from "./Interface";

export default class TextSource extends Interface {
    constructor() {
        super("TextSource", ["getDocId", "next", "done", "iterator"]);
    }

    getDocId() {}

    iterator() {}
}
