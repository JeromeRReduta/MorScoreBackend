import { PostingsList } from "../../domain/Postings";

export default class BatchMapper {
  static run(stems) {
    const map = new Map();
    for (let stem of stems) {
        if (!map.has(stem)) {
            map.set(stem, new PostingsList());
        }
        map.get(stem).
        const postingList = map.get(stem);
    }


  }
  export default class SimplePartitioner {
  constructor() {}

  partition(stems) {
    const stemCounts = new Map();
    for (let stem of stems) {
      const count = stemCounts.get(stem) ?? 0;
      stemCounts.set(stem, count + 1);
    }
    return stemCounts;
  }
}

}
