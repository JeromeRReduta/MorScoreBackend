export class InvertedIndex {
  /** Note that any string (input from text source or query) must be preprocessed w/ the same preprocessor or behavior will be undefined */

  /** reads a TextSource into index */
  read(source) {}

  searchAnyMatch(queryTokens) {}

  searchAllMatch(queryTokens) {}
}
