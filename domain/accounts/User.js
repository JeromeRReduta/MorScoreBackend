export default class User {
  #name;

  #email;

  #morScoreScore;

  constructor({ name, email, morScoreScore }) {
    this.#name = name;
    this.#email = email;
    this.#morScoreScore = morScoreScore;
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
