import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BrowserFileTextSource from "./database/text-sources/BrowserFileTextSource.js";
import SimplePreprocessor from "./database/token-preprocessing/SimplePreprocessor.js";
import PorterStemmer from "./database/token-preprocessing/stemming/PorterStemmer.js";
import NtlkStopwordChecker from "./database/token-preprocessing/stopword-checking/NtlkStopwordChecker.js";
import SimpleIndexBatchMapper from "./database/batch-mapping/SimpleIndexBatchMapper.js";
import SimpleInvertedIndex from "./database/inverted-index/SimpleInvertedIndex.js";
import MockMorScoreCalculator from "./database/scoring/MockMorScoreCalculator.js";
import Interface from "./interfaces/Interface.js";
import { PostingFactory } from "./domain/entities/postings/Posting.js";
import SimplePostingsList from "./domain/entities/postings/SimplePostingsList.js";

/** TODO:
 *
 *
 * research mixins and clean up code w/ them
 */
function App() {
  const [count, setCount] = useState(0);

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
  const list = new SimplePostingsList();
  for (let i = 0; i < 5; i++) {
    const newPosting = PostingFactory.create({ docId: i, tf: i });
    list.add(newPosting);
  }
  console.log("after adding 5 postings", list.toString());
  for (let i = 0; i < 5; i++) {
    const repeatedPosting = PostingFactory.create({ docId: 0, tf: 100 });
    list.add(repeatedPosting);
  }
  console.log(
    "after adding <0:100> 5 times - expect <0:500> || ",
    list.toString()
  );

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
    const source = new BrowserFileTextSource({
      docId: 1851,
      fileReaderResult: e.target.result,
    });
    const it = source.iterator();
    while (!it.done()) {
      console.log("it next", it.next());
    }
    // const source = new BrowserFileTextSource(1851, e.target.result);
    // const stemmer = new PorterStemmer();
    // const stopwordChecker = new NtlkStopwordChecker();
    // const preprocessor = new SimplePreprocessor(stemmer, stopwordChecker);
    // const index = new SimpleInvertedIndex(preprocessor, SimpleIndexBatchMapper);
    // index.read(source);
    // const scorer = new MockMorScoreCalculator();
    // const score = scorer.calculate(index);
    // console.log(score);
  };
  fileData.readAsText(file);
};

export default App;
