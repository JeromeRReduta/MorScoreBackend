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
