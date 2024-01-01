class SymbolTable {
  #keys = [];
  #values = [];
  #n = 0;

  constructor(maxCount = 10) {
    this.#keys = new Array(maxCount);
    this.#values = new Array(maxCount);
  }

  get(key) {
    for (let i = 0; i < this.#n; i++) {
      if (this.#keys[i] === key) {
        return this.#values[i];
      }
    }
  }

  put(key, value) {
    for (let i = 0; i < this.#n; i++) {
      if (this.#keys[i] === key) {
        this.#values[i] = value;
        return;
      }
    }

    this.#keys[this.#n] = key;
    this.#values[this.#n] = value;
    this.#n++;
  }

  delete(key) {
    for (let i = 0; i < this.#n; i++) {
      if (this.#keys[i] === key) {
        for (let j = i; j < this.#n - 1; j++) {
          this.#keys[j] = this.#keys[j + 1];
          this.#values[j] = this.#values[j + 1];
        }
        this.#n--;
        return;
      }
    }
  }

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.#n === 0;
  }

  contains(key) {
    return !!this.get(key);
  }
}

module.exports = {
  SymbolTable,
};
