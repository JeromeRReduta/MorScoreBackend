import Interface from "./Interface";

export default class PostingsList extends Interface {
    constructor() {
        super("PostingsList", ["getPostings", "has", "add", "mergeWith"]);
    }

    getPostings() {}

    has(posting) {}

    add(posting) {}

    mergeWith(other) {}
}
