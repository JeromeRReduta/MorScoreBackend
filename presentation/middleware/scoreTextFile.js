import OriginalPuritanAlgorithm from "../../infrastructure/scoring/OriginalPuritanAlgorithm.js";

export default function scoreTextFile(req, res, next) {
  const { text, algorithm } = req.body;
  let morScoreAlgorithm;
  /** Check against alternate algos (for when we have those) */
  morScoreAlgorithm = new OriginalPuritanAlgorithm();
  req.text = text;
  req.result = req.scoreTextUseCase.run({ text, algorithm: morScoreAlgorithm });
  next();
}
