import express from "express";
import requireBody from "../middleware/requireBody.js";
import PorterBasedStemmer from "../../infrastructure/token-preprocessing/stemming/PorterBasedStemmer.js";
import NtlkStopwordChecker from "../../infrastructure/token-preprocessing/stopword-checking/NtlkStopwordChecker.js";
import SimplePreprocessor from "../../infrastructure/token-preprocessing/SimplePreprocessor.js";
import SimplePostingsListFactory from "../../domain/postings/SimplePostingsList.js";
import BrowserFileTextSource from "../../infrastructure/text-sources/BrowserFileTextSource.js";
import SimpleInvertedIndex from "../../infrastructure/inverted-index/SimpleInvertedIndex.js";
import MockMorScoreCalculator from "../../infrastructure/scoring/MockMorScoreCalculator.js";
import OriginalPuritanAlgorithm from "../../infrastructure/scoring/OriginalPuritanAlgorithm.js";

function scoreTextFile(req, res) {
  const { text, algorithm } = req.body;
  let morScoreAlgorithm;
  /** Check against alternate algos (for when we have those) */
  morScoreAlgorithm = new OriginalPuritanAlgorithm();
  const json = req.scoreTextUseCase
    .run({ text, algorithm: morScoreAlgorithm })
    .toJson();
  res.status(200).send(json);
}

const router = express.Router();

router
  .route("/")

  .get((req, res) => {
    return res.status(200).send({ text: "TODO: Fix this I think?" });
  })

  .post(requireBody("algorithm", "text"), scoreTextFile);

export default router;
