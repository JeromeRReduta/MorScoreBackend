import SortedSet from "collections/sorted-set";
import Interface from "../../../interfaces/Interface";
import PostingsList from "../../../interfaces/PostingsList";
import Cloneable from "../../../interfaces/Cloneable";
import PostingsListFactory from "../../../interfaces/PostingsListFactory";

class SimplePostingsList {
  #set;

  constructor() {
    this.#set = new SortedSet();
    Interface.implements(PostingsList, this);
    Interface.implements(Cloneable, this);
  }

  getPostings() {
    const cloneSet = new SortedSet();
    console.log("set", this.#set);
    this.#set
      .map((posting) => posting.clone())
      .forEach((posting) => cloneSet.add(posting));
    console.log("clone set is now", cloneSet);
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
      Interface.implements(PostingsList, other);
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
    Interface.implements(PostingsListFactory, this);
  }

  create() {
    return new SimplePostingsList();
  }
}
