import SortedSet from "collections/sorted-set";
import Interface from "../interfaces/Interface.js";
import PostingsList from "../interfaces/PostingsList.js";
import Cloneable from "../interfaces/Cloneable.js";
import PostingsListFactory from "../interfaces/PostingsListFactory.js";

class SimplePostingsList {
  #set;

  constructor() {
    this.#set = new SortedSet();
    Interface.implements(PostingsList, SimplePostingsList);
    Interface.implements(Cloneable, SimplePostingsList);
  }

  getPostings() {
    const cloneSet = new SortedSet();
    this.#set
      .map((posting) => posting.clone())
      .forEach((posting) => cloneSet.add(posting));
    return cloneSet;
  }

  has(posting) {
    return this.#set.has(posting);
  }

  add(posting) {
    const found = this.#set.get(posting);
    if (!found) {
      this.#set.add(posting);
    } else {
      found.tf = found.tf + posting.tf;
    }
  }

  mergeWith(other) {
    try {
      Interface.implements(PostingsList, Object.getPrototypeOf(other));
      other.getPostings().forEach((posting) => this.add(posting));
    } catch (e) {
      console.error("Attempting to merge w/ non-PostingsList - cancelling");
      return;
    }
  }

  clone() {
    const clone = new SimplePostingsList();
    this.#set
      .map((posting) => posting.clone())
      .forEach((posting) => clone.add(posting));
    return clone;
  }

  toString() {
    return this.#set.map((elem) => elem.toString()).join(", ");
  }
}

export default class SimplePostingsListFactory {
  constructor() {
    Interface.implements(PostingsListFactory, SimplePostingsListFactory);
  }

  create() {
    return new SimplePostingsList();
  }
}
