import { createContext, useContext, useState } from "react";
import PorterBasedStemmer from "../../database/token-preprocessing/stemming/PorterBasedStemmer";
import NtlkStopwordChecker from "../../database/token-preprocessing/stopword-checking/NtlkStopwordChecker";
import SimplePreprocessor from "../../database/token-preprocessing/SimplePreprocessor";
import SimplePostingsListFactory from "../../domain/entities/postings/SimplePostingsList";
import SimpleIndexBatchMapper from "../../database/batch-mapping/SimpleIndexBatchMapper";
import { PostingFactory } from "../../domain/entities/postings/Posting";
import SimpleInvertedIndex from "../../database/inverted-index/SimpleInvertedIndex";
import MockMorScoreCalculator from "../../database/scoring/MockMorScoreCalculator";

const SystemContext = createContext();

export function SystemProvider({ children }) {
  const stemmer = new PorterBasedStemmer();
  const stopwordChecker = new NtlkStopwordChecker();
  const preprocessor = new SimplePreprocessor(stemmer, stopwordChecker);
  const postingsListFactory = new SimplePostingsListFactory();
  const batchMapper = new SimpleIndexBatchMapper({
    postingsListFactory,
    postingFactory: PostingFactory,
  });

  const [morScoreResult, setMorScoreResult] = useState({});
  const scoreTextSource = (textSource) => {
    const index = new SimpleInvertedIndex({
      preprocessor,
      batchMapper,
      postingsListFactory,
    });
    index.add(textSource);
    const scorer = new MockMorScoreCalculator(index);
    setMorScoreResult(scorer.calculate());
  };

  const value = { morScoreResult, scoreTextSource };

  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
}

export default function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw Error("useSystem must be used in provider");
  }
  return context;
}

/**
 *   const fileData = new FileReader();
   fileData.onloadend = async (e) => {
     setText("hiii");
     const source = new BrowserFileTextSource({
       docId: 1851,
       fileReaderResult: e.target.result,
     });
     const stemmer = new PorterBasedStemmer();
     const stopwordChecker = new NtlkStopwordChecker();
     const preprocessor = new SimplePreprocessor(stemmer, stopwordChecker);
     const postingsListFactory = new SimplePostingsListFactory();
 
     const batchMapper = new SimpleIndexBatchMapper({
       postingsListFactory,
       postingFactory: PostingFactory,
     });
 
     const index = new SimpleInvertedIndex({
       preprocessor,
       batchMapper,
       postingsListFactory,
     });
 
     index.add(source);
     const scorer = new MockMorScoreCalculator(index);
     console.log("score is", scorer.calculate());
     setText("hiii");
 */
