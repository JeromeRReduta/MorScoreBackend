import User from "../../domain/accounts/User.js";
import Interface from "../../domain/interfaces/Interface.js";
import UserRepo from "../../domain/interfaces/UserRepo.js";
import bcrypt from "bcrypt";

export default class PgUserRepo {
  #db;

  static numSaltRounds = 10;

  constructor({ pgClient }) {
    this.#db = pgClient;
    Interface.implements(UserRepo, PgUserRepo);
  }

  async getAllAsync() {
    const { rows } = await this.#db.query({
      text: "SELECT * FROM users",
    });
    return rows.map((row) => this.#pgToUser(row));
  }

  async getByIdAsync(id) {
    const {
      rows: [row],
    } = await this.#db.query({
      text: `
            SELECT * FROM users
            WHERE id = $1
        
        `,
      values: [id],
    });
    return this.#pgToUser(row);
  }

  async getByLoginInfoAsync({ loginInfo: { email, password } }) {
    const {
      rows: [row],
    } = await this.#db.query({
      text: `
            SELECT * FROM users
            WHERE email = $1
            `,
      values: [email],
    });
    if (!row) {
      return null;
    }
    const hasMatchingPwHash = await bcrypt.compare(password, row.pw_hash);
    return hasMatchingPwHash ? this.#pgToUser(row) : null;
  }

  async createAsync({ email, name, password }) {
    const hash = await bcrypt.hash(password, PgUserRepo.numSaltRounds);
    const {
      rows: [row],
    } = await this.#db.query({
      text: `
            INSERT INTO users (email, name, pw_hash)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
      values: [email, name, hash],
    });
    return this.#pgToUser(row);
  }

  async deleteByIdAsync(id) {
    const {
      rows: [row],
    } = this.#db.query({
      text: `
            DELETE FROM users
            WHERE id = $1
            RETURNING *
        `,
      values: [id],
    });
    return this.#pgToUser(row);
  }

  async getByPasswordAsync(password) {
    const { rows } = await this.#db.query({
      text: `SELECT * FROM users`,
    });

    let found;
    for (let row of rows) {
      const isMatch = await bcrypt.compare(password, row.pw_hash);
      if (isMatch) {
        found = row;
        break;
      }
    }
    return this.#pgToUser(found);
  }

  #pgToUser(row) {
    if (!row) {
      return null;
    }
    const { id, email, name, mor_score_score: morScoreScore } = row;
    return new User({ id, name, email, morScoreScore });
  }
}
