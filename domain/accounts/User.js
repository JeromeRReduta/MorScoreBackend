export default class User {
  #name;

  #email;

  #morScoreScore;

  #id;

  constructor({ id, name, email, morScoreScore }) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#morScoreScore = morScoreScore;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get morScoreScore() {
    return this.#morScoreScore;
  }

  toJson() {
    return JSON.stringify({
      name: this.#name,
      email: this.#email,
      morScoreScore: this.#morScoreScore,
    });
  }
}
