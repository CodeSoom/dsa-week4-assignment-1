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
    return this.#items.find((item) => item.key === key)?.item;
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

  values() {
    return this.#items.map(({ item }) => item);
  }

  keys() {
    const data = [...this.#items];
    let index = 0;

    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (index >= data.length) {
              return { done: true };
            }

            const { key } = data[index];

            index += 1;

            return { done: false, value: key };
          },
        };
      },
    };
  }
}

module.exports = {
  SymbolTable,
};
