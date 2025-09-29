import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BrowserFileTextSource from "./database/text-sources/BrowserFileTextSource.js";
import SimplePreprocessor from "./database/token-preprocessing/SimplePreprocessor.js";
import PorterStemmer from "./database/token-preprocessing/stemming/PorterStemmer.js";
import StopwordChecker from "./database/token-preprocessing/stopword-checking/StopwordChecker.js";
import SimplePartitioner from "./database/corpus-partitioning/SimplePartitioner.js";
import { PostingFactory, PostingsList } from "./domain/Postings.js";
import NtlkStopwordChecker from "./database/token-preprocessing/stopword-checking/NtlkStopwordChecker.js";
import SimpleIndexBatchMapper from "./database/batch-mapping/SimpleIndexBatchMapper.js";

function App() {
  const [count, setCount] = useState(0);
  test();

  return (
    <>
      <FileInput />
      <h1>File Reader</h1>
      <input type="file" id="file-input" />
      <div id="message"></div>
      <pre id="file-content"></pre>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function FileInput() {
  const [text, setText] = useState("");
  return (
    <>
      <input
        type="file"
        accept=".txt"
        onChange={(e) => handleChangeFile(e.target.files[0], setText)}
      />
      <div>{text}</div>
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

const handleChangeFile = (file, setText) => {
  const fileData = new FileReader();
  fileData.onloadend = async (e) => {
    setText("hiii");
    const source = new BrowserFileTextSource(1851, e.target.result);
    const stemmer = new PorterStemmer();
    const stopwordChecker = new NtlkStopwordChecker();
    const preprocessor = new SimplePreprocessor(stemmer, stopwordChecker);
    source
      .asArray()
      .map((batch) => preprocessor.run(batch))
      .map((stems) => SimpleIndexBatchMapper.run(source.getDocId(), stems))
      .forEach((map) => console.log("batched map", map));
    console.log("source is", source);
    //     const preprocessor = new SimplePreprocessor(
    //       new PorterStemmer(),
    //       new StopwordChecker(stopwordRegexes.Ntlk)
    //     );
    //     const index = new SimpleInvertedIndex(
    //       preprocessor,
    //       new SimplePartitioner()
    //     );
    //     index.read(source);
    //     console.log(index);
    //     console.log(
    //       index.searchAnyMatch([
    //         "ishmael",
    //         "a",
    //         " ",
    //         "bubba",
    //         "whale",
    //         "sailor",
    //         "hill",
    //       ])
    //     );
  };
  fileData.readAsText(file);
};

function test() {
  console.log("BEGINNING TEST");
  /**
   * TODO: test addTerms() and addPostings(), then refactor inv index, then work on data reading (w/ strategy pattern)
   */
  //   const fileInput = document.getElementById("file-input");
  //   const fileContentDisplay = document.getElementById("file-content");
  //   const source = new BrowserFileTextSource(fileInput, fileContentDisplay);
}

export default App;
