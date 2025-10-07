import Interface from "./Interface";
import PostingsList from "./PostingsList";

/**
 * Factory pattern for creating PostingsLists
 */
export default class PostingsListFactory extends Interface {
    constructor() {
        super();
    }

    /**
     * Creates a PostingsList
     * @returns new PostingsList
     */
    create() {}
}
