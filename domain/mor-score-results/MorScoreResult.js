import Interface from "../interfaces/Interface.js";
import Cloneable from "../interfaces/Cloneable.js";

export default class MorScoreResult {
  static MIN_LEVEL = 1;

  static MAX_LEVEL = 5;

  #category;

  #score;

  #offenseCounts;

  constructor({ category, score, offenseCounts }) {
    this.#category = category;
    this.#score = score;
    this.#offenseCounts = offenseCounts;
    Interface.implements(Cloneable, MorScoreResult);
  }
  get offenses() {
    const offenses = [];
    for (
      let i = MorScoreResult.MIN_LEVEL;
      i < MorScoreResult.MAX_LEVEL + 1;
      i++
    ) {
      offenses.push(
        `${this.#offenseCounts.get(i) ?? 0} category ${i} offenses`
      );
    }
    return offenses;
  }

  get category() {
    return this.#category;
  }

  get score() {
    return this.#score;
  }

  clone() {
    return new MorScoreResult({
      category: this.#category,
      score: this.#score,
      offenseCounts: new Map(this.#offenseCounts),
    });
  }

  toString() {
    return `
        category: ${this.#category},
        score: ${this.#score},
        offenses: ${this.offenses}
    `;
  }
}

export class MorScoreResultFactory {
  static create({ category, score, offenseCounts }) {
    return new MorScoreResult({ category, score, offenseCounts });
  }
}
