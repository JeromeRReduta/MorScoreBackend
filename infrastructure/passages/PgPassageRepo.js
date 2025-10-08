import Interface from "./Interface.js";
import PassageRepo from "../../domain/interfaces/PassageRepo.js";
import Passage from "../../domain/passages/Passage.js";

export default class PgPassageRepo {
  #db;

  constructor({ pgClient }) {
    this.#db = pgClient;
    Interface.implements(PassageRepo, PgPassageRepo);
  }

  async getAllAsync() {
    const { rows } = await this.#db.query({
      text: `SELECT * FROM passages`,
    });
    return rows.map((row) => this.#pgToPassage(row));
  }

  async getByIdAsync(docId) {
    const {
      rows: [row],
    } = await this.#db.query({
      text: `
        SELECT * FROM passages
        WHERE id = $1
        `,
      values: [docId],
    });
    return this.#pgToPassage(row);
  }

  async createAsync({ title, content, isPublic }) {
    const {
      rows: [passageRow],
    } = await this.#db.query({
      text: `
            INSERT INTO passages (title, content, is_public)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
      values: [title, content, isPublic],
    });

    const {
        rows: []
    }
    


    /**
     * Consider returning passage AND result
     */
    return this.#pgToPassage(row);
  }

  async deleteByIdAsync(docId) {
    const {
      rows: [row],
    } = this.#db.query({
      text: `
            DELETE FROM passages
            WHERE id = $1
            RETURNING *
        `,
      values: [docId],
    });
    return this.#pgToPassage(row);
  }

  #pgToPassage(row) {
    if (!row) {
      return null;
    }
    const { id: docId, title, content, is_public: isPublic } = row;
    return new Passage({ docId, title, content, isPublic });
  }
}
