class Node {
  key;

  item;

  constructor(key, item) {
    this.key = key;
    this.item = item;
  }
}

class SymbolTable {
  #items = [];

  #n = 0;

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.size() === 0;
  }

  #findIndex(key) {
    return this.#items.findIndex((item) => item.key === key);
  }

  get(key) {
    const node = this.#items.find((item) => item.key === key);

    return node?.item;
  }

  put(key, item) {
    const curIndex = this.#findIndex(key);

    if (curIndex >= 0) {
      this.#items[curIndex].item = item;

      return;
    }

    const node = new Node(key, item);

    this.#items[this.#n] = node;

    this.#n += 1;
  }

  delete(key) {
    const index = this.#findIndex(key);

    if (index < 0) {
      return;
    }

    this.#items.splice(index, 1);

    this.#n -= 1;
  }

  contains(key) {
    return !!this.get(key);
  }
}

module.exports = {
  SymbolTable,
};
