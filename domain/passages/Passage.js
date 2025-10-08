export default class Passage {
  #docId;
  #title;
  #content;
  #isPublic;

  constructor({ docId, title, content, isPublic }) {
    this.#docId = docId;
    this.#title = title;
    this.#content = content;
    this.#isPublic = isPublic;
  }

  get docId() {
    return this.#docId;
  }

  get title() {
    return this.#title;
  }

  get content() {
    return this.#content;
  }

  get isPublic() {
    return this.#isPublic;
  }

  toJson() {
    return JSON.stringify({
      docId: this.#docId,
      title: this.#title,
      content: this.#content,
      isPublic: this.#isPublic,
    });
  }
}
