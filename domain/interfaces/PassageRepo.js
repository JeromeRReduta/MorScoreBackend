import Interface from "./Interface.js";
import Passage from "../passages/Passage.js";

/**
 * Repository pattern for stored Passage info
 */
export default class PassageRepo extends Interface {
  constructor() {
    super();
  }

  async getAllAsync() {}

  async getByIdAsync(docId) {}

  async createAsync({ passage, opMorScoreResult }) {}

  async deleteByIdAsync(docId) {}
}
