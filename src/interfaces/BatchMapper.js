import Interface from "./Interface";

export default class BatchMapper extends Interface {
    constructor() {
        super("BatchMapper", ["run"]);
    }

    run({ docId, stems }) {}

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
