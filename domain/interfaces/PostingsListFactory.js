import Interface from "../interfaces/Interface.js";

import PostingsList from "../interfaces/PostingsList.js";

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
