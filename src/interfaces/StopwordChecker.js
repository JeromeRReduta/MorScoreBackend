import Interface from "./Interface";

export default class StopwordChecker extends Interface {
    constructor() {
        super("StopwordChecker", ["isStopword"]);
    }

    static isStopword(stem, stopwordRegex) {
        return Boolean(stem.match(stopwordRegex));
    }

    isStopword(stem) {}
}
