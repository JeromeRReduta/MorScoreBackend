import BatchMapper from "../../interfaces/BatchMapper.js";
import Interface from "../../interfaces/Interface.js";

export default class SimpleIndexBatchMapper {
  #postingsListFactory;
  #postingFactory;

  constructor({ postingsListFactory, postingFactory }) {
    this.#postingsListFactory = postingsListFactory;
    this.#postingFactory = postingFactory;
    Interface.implements(BatchMapper, this);
  }

  run({ docId, stems }) {
    console.log("list factory", this.#postingsListFactory);
    console.log("thing factory", this.#postingFactory);
    return BatchMapper.run({
      docId,
      stems,
      postingsListFactory: this.#postingsListFactory,
      postingFactory: this.#postingFactory,
    });
  }
}
