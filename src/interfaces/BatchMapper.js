import Interface from "./Interface";

/**
 * Takes a batch of stems and turns it into a mini inverted index
 */
export default class BatchMapper extends Interface {
    constructor() {
        super();
    }

    /** Given a batch of stems and a docId, returns a mini inverted index */
    run({ docId, stems }) {}

    /** Default method version of run() */
    static run({ docId, stems, postingsListFactory, postingFactory }) {
        const batchMap = new Map();
        for (let stem of stems) {
            if (!batchMap.has(stem)) {
                batchMap.set(stem, postingsListFactory.create());
            }
            const posting = postingFactory.create({ docId, tf: 1 });
            batchMap.get(stem).add(posting);
        }
        return batchMap;
    }
}
