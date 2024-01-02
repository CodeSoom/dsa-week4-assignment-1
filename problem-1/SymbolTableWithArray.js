class SymbolTable {
  #keys = [];

  #values = [];

  #n = 0;

  constructor(max = 10) {
    this.#keys = new Array(max);
    this.#values = new Array(max);
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
        this.#values[i] = null;

        for (let j = i; j < this.#n - 1; j++) {
          this.#keys[j] = this.#keys[j + 1];
          this.#values[j] = this.#values[j + 1];
        }

        this.#n--;
        return;
      }
    }
  }

  contains(key) {
    if (this.get(key)) {
      return true;
    }
    return false;
  }

  isEmpty() {
    if (this.#n === 0) {
      return true;
    } return false;
  }

  size() {
    return this.#n;
  }

  keys() {
    return this.#keys;
  }

  values() {
    return this.#values;
  }
}

module.exports = {
  SymbolTable,
};
