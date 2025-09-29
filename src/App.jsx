import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BrowserFileTextSource from "./database/text-sources/BrowserFileTextSource.js";

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
    const thing = new BrowserFileTextSource(e.target.result);

    while (!thing.isEmpty()) {
      await sleep(2000);
      const next = thing.next().join(", ");
      setText(next);
    }
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
