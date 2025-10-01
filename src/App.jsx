import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BrowserFileTextSource from "./database/text-sources/BrowserFileTextSource.js";
import SimplePreprocessor from "./database/token-preprocessing/SimplePreprocessor.js";
import NtlkStopwordChecker from "./database/token-preprocessing/stopword-checking/NtlkStopwordChecker.js";
import SimpleIndexBatchMapper from "./database/batch-mapping/SimpleIndexBatchMapper.js";
import SimpleInvertedIndex from "./database/inverted-index/SimpleInvertedIndex.js";
import MockMorScoreCalculator from "./database/scoring/MockMorScoreCalculator.js";
import { PostingFactory } from "./domain/entities/postings/Posting.js";
import PorterBasedStemmer from "./database/token-preprocessing/stemming/PorterBasedStemmer.js";
import SimplePostingsListFactory from "./domain/entities/postings/SimplePostingsList.js";
import useSystem from "./presentation/contexts/SystemContext.jsx";

function App() {
  const {
    morScoreResult: { score, category, offenses },
    scoreTextSource,
  } = useSystem();

  return (
    <>
      <MorScoreCategory category={category} />
      <Details score={score} offenses={offenses} />
      <FileInput scoreTextSource={scoreTextSource} />
    </>
  );
}

function MorScoreCategory({ category }) {
  if (!category) {
    return <h1>Input a file to get your MorScore!</h1>;
  }
  return (
    <>
      <h1>{category.toUpperCase()}</h1>
    </>
  );
}

function Details({ score, offenses }) {
  if (!Number.isInteger(score)) {
    return;
  }
  const descriptor = score >= 80 ? "good" : "bad";
  const offenseList = (
    <ul>
      {offenses.map((offense) => (
        <li key={offense}>{offense.toUpperCase()}</li>
      ))}
    </ul>
  );
  return (
    <>
      <h3>Your score is:</h3>
      <h2>{score}</h2>
      <h3>(That's quite {descriptor}!)</h3>
      <h3>Here's a list of your offenses:</h3>
      {offenseList}
    </>
  );
}

function FileInput({ scoreTextSource }) {
  const fileData = new FileReader();
  fileData.onloadend = async (e) => {
    const textSource = new BrowserFileTextSource({
      docId: 2000,
      fileReaderResult: e.target.result,
    });
    scoreTextSource(textSource);
  };
  return (
    <>
      <input
        type="file"
        accept=".txt"
        onChange={(e) => fileData.readAsText(e.target.files[0])}
      />
    </>
  );
}

/**
 *
 * Given file input
 * On change, handleChangeFile
 * handleChangeFile takes file input and set text
 * put text in TextSource function
 * Take text and tokenize it and batch it
 * Becomes text source
 *
 */

/**
 * https://stackoverflow.com/questions/72376793/how-do-i-make-my-react-file-sleep-for-5-seconds-before-continuing
 */
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const handleChangeFile = (file, scoreTextSource) => {
  const fileData = new FileReader();
  fileData.onloadend = async (e) => {
    const textSource = new BrowserFileTextSource({
      docId: 2000,
      fileReaderResult: e.target.result,
    });
    scoreTextSource(textSource);
  };
  fileData.readAsText(file);
};

export default App;
