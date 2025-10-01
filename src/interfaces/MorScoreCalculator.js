import Interface from "./Interface";

/** Given an index, scores the index and returns a MorScoreResult */
export default class MorScoreCalculator extends Interface {
    constructor() {
        super("MorScoreCalculator", ["calculate"]);
    }
    /**
     * Score a given index (implementation should hold it) and returns a MorScoreResult
     * @returns a MorScoreResult, which has at minimum this format:
     *
     * {score: #, category: str, offenses: str[]}
     * */
    calculate() {}
}
