import Interface from "./Interface.js";

import PostingsList from "./PostingsList.js";

/**
 * Factory pattern for creating PostingsLists
 */
export default class PostingsListFactory extends Interface {
  constructor() {
    super();
  }

  /**
   * Creates a PostingsList
   * @returns {PostingsList} new PostingsList
   */
  create() {}
}
