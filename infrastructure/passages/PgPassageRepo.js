import Interface from "../../domain/interfaces/Interface.js";
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

  async createAsync({ passage, opMorScoreResult }) {
    const { title, content, isPublic } = passage;
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

    const newPassage = new Passage({
      docId: passageRow.id,
      content: passageRow.content,
      isPublic: passageRow.is_public,
    });
    const { score, category, offenses } = opMorScoreResult;
    const categoryCounts = offenses
      .map((str) => str.split("s+")[0])
      .map((num) => Number.parseInt(num));
    console.log(offenses.map((str) => str.split("s+")[0]));
    console.log("counts", categoryCounts);
    const {
      rows: [resultRow],
    } = await this.#db.query({
      text: `
                INSERT INTO op_mor_score_results (score, category, cat_1_count, cat_2_count, cat_3_count, cat_4_count, cat_5_count)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `,
      values: [score, category, ...categoryCounts],
    });

    const {
      rows: [linkRow],
    } = await this.#db.query({
      text: `
                INSERT INTO passages_op_results (passage_id, op_result_id)
                VALUES ($1, $2)
                RETURNING *
            `,
      values: [passageRow.id, resultRow.id],
    });

    console.log(
      "db query results\n",
      "passage",
      passageRow,
      "\nresultRow",
      resultRow,
      "\nlinkRow",
      linkRow
    );

    return { passage, opMorScoreResult, linkRow };
  }

  async deleteByIdAsync(docId) {
    const {
      rows: [row],
    } = this.#db.query({
      text: `
            DELETE FROM passages
            WHERE id = $1
            CASCADE
            RETURNING *
        `,
      values: [docId],
    });

    console.log("Deleted stuff", row);
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
