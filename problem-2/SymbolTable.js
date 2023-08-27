class SymbolTable {
  #keys;

  #values;

  #n;

  constructor(capacity) {
    this.#keys = new Array(capacity);
    this.#values = new Array(capacity);
    this.#n = 0;
  }

  size() {
    return this.#n;
  }

  get(key) {
    if (this.isEmpty()) {
      return;
    }

    const i = this.rank(key);
    if (i >= this.#n) {
      return;
    }

    if (key !== this.#keys[i]) {
      return;
    }

    return this.#values[i];
  }

  put(key, value) {
    const i = this.rank(key);
    if (i < this.#n && key === this.#keys[i]) {
      this.#values[i] = value;
      return;
    }

    for (let j = this.#n; j > i; j--) {
      this.#keys[j] = this.#keys[j - 1];
      this.#values[j] = this.#values[j - 1];
    }

    this.#keys[i] = key;
    this.#values[i] = value;
    this.#n++;
  }

  delete(key) {
    const i = this.rank(key);
    if (i >= this.#n || key !== this.#keys[i]) {
      return;
    }

    for (let j = i; j < this.#n - 1; j++) {
      this.#keys[j] = this.#keys[j + 1];
      this.#values[j] = this.#values[j + 1];
    }

    this.#n--;
  }

  rank(key, start = 0, end = this.#n - 1) {
    if (start > end) {
      return start;
    }

    const mid = start + Math.floor((end - start) / 2);
    if (key < this.#keys[mid]) {
      return this.rank(key, start, mid - 1);
    } if (key > this.#keys[mid]) {
      return this.rank(key, mid + 1, end);
    }
    return mid;
  }

  min() {
    if (this.isEmpty()) {
      return;
    }

    return this.#keys[0];
  }

  max() {
    if (this.isEmpty()) {
      return;
    }

    return this.#keys[this.#n - 1];
  }

  select(k) {
    return this.#keys[k];
  }

  isEmpty() {
    return this.#n === 0;
  }

  keys() {
    return [...this.#keys];
  }

  contains(key) {
  }

  floor(key) {
  }

  ceiling(key) {
  }

  keysRange(start, end) {
  }
}

module.exports = {
  SymbolTable,
};
