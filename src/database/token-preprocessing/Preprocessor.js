class Preprocessor {
  /** Converts tokens into a stem count map */
  run(tokens) {}

  runWithSource(source) {
    while (!source.isEmpty()) {
      const tokens = source.next();
      this.run(tokens);
    }
  }
}
