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

const router = express.Router();

router.use((req, res, next) => {
  const stemmer = new PorterBasedStemmer();
  const stopwordChecker = new NtlkStopwordChecker();
  const preprocessor = new SimplePreprocessor(stemmer, stopwordChecker);
  const postingsListFactory = new SimplePostingsListFactory();
  req.score = (text, algorithm) => {
    const textSource = new BrowserFileTextSource({
      docId: 5,
      fileReaderResult: text,
    });
    const index = new SimpleInvertedIndex({
      preprocessor,
      postingsListFactory,
    });
    index.add(textSource);
    const calculator = new MockMorScoreCalculator(
      new OriginalPuritanAlgorithm(),
      index
    );
    return calculator.calculate();
  };
  next();
});

router
  .route("/")

  .get((req, res) => {
    return res.status(200).send({ text: "TODO: Fix this I think?" });
  })

  .post(
    requireBody("algorithm", "text"),

    (req, res) => {
      //   console.log("DOING STUFF HERE");
      const mock = {
        text: `Your algorithm is ${req.body.algorithm}. Your text begins with ${req.body.text[0]}`,
      };
      const data = req.score(req.body.text, req.body.algorithm).toJson();
      return res.status(200).send(JSON.stringify(data));
    }
  );

export default router;
