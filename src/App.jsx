import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import InvertedIndex from "./domain/InvertedIndex.js";

function App() {
  const [count, setCount] = useState(0);
  test();

  return (
    <>
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

function test() {
  console.log("BEGINNING TEST");

  const invIndex = new InvertedIndex();

  /**
   * TODO: test addTerms() and addPostings(), then refactor inv index, then work on data reading (w/ strategy pattern)
   */

  const letters = ["a", "b", "c", "d", "e", "f", "g"];
  const docIds = [1, 100, 3, 2];
  for (let letter of letters) {
    for (let docId of docIds) {
      invIndex.add(letter, docId);
    }
  }

  console.log(invIndex.toString());
  console.log("adding a-1 100 times");
  for (let i = 0; i < 100; i++) {
    invIndex.add("a", 1);
  }
  console.log(invIndex.toString());

  console.log("TEST COMPLETE");
}

export default App;
