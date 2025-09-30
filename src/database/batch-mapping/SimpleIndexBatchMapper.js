import { PostingsList, PostingFactory } from "../../domain/Postings";

export default class SimpleIndexBatchMapper {
  static run(docId, stems) {
    const map = new Map();
    for (let stem of stems) {
      if (!map.has(stem)) {
        map.set(stem, new PostingsList());
      }
      const posting = PostingFactory.create({ docId, tf: 1 });
      if (map.get(stem).has(posting)) {
      }
      map.get(stem).add(posting);
    }
    return map;
  }
}
