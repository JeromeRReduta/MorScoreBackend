import SimpleInvertedIndex from "../infrastructure/inverted-index/SimpleInvertedIndex.js";
import BrowserFileTextSource from "../infrastructure/text-sources/BrowserFileTextSource.js";
import MockMorScoreCalculator from "../infrastructure/scoring/MockMorScoreCalculator.js";

export default class ScoreTextUseCase {
  #preprocessor;
  #postingsListFactory;

  constructor({ preprocessor, postingsListFactory }) {
    this.#preprocessor = preprocessor;
    this.#postingsListFactory = postingsListFactory;
  }

  run({ text, algorithm }) {
    const textSource = new BrowserFileTextSource({
      docId: -1,
      fileReaderResult: text,
    });
    const index = new SimpleInvertedIndex({
      preprocessor: this.#preprocessor,
      postingsListFactory: this.#postingsListFactory,
    });
    index.add(textSource);
    const calculator = new MockMorScoreCalculator(algorithm, index);
    return calculator.calculate();
  }
}
