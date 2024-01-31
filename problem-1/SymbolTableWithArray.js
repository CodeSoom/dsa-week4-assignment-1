class SymbolTable {
  #keys = [];

  #values = [];

  #numberOfItems = 0;

  constructor(count = 20) {
    this.#keys = new Array(count);
    this.#values = new Array(count);
  }

  put(key, value) {
    for (let index = 0; index < this.#numberOfItems; index++) {
      if (key === this.#keys[index]) {
        this.#values[index] = value;
        return;
      }
    }

    this.#keys[this.#numberOfItems] = key;
    this.#values[this.#numberOfItems] = value;
    this.#numberOfItems += 1;
  }

  get(key) {
    for (let index = 0; index < this.#numberOfItems; index++) {
      if (key === this.#keys[index]) {
        return this.#values[index];
      }
    }
  }

  delete(key) {
    for (let index = 0; index < this.#numberOfItems; index++) {
      if (key === this.#keys[index]) {
        for (let j = index; j < this.#numberOfItems - 1; j++) {
          this.#keys[j] = this.#keys[j + 1];
          this.#values[j] = this.#values[j + 1];
        }

        this.#numberOfItems -= 1;
        return;
      }
    }
  }

  contains(key) {
    return !!this.get(key);
  }

  size() {
    return this.#numberOfItems;
  }

  isEmpty() {
    return this.#numberOfItems === 0;
  }

  keys() {
    return [...this.#keys];
  }

  values() {
    return [...this.#values];
  }
}

module.exports = {
  SymbolTable,
};
