class SymbolTable {
  #arr = [];
  #size;

  constructor() {
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  getKey(key) {
    let idx;
    this.#arr.forEach((item, arrIdx) => {
      if (item.key === key) {
        idx = arrIdx;
      }
    });
    return idx;
  }

  put(key, value) {
    if (this.#size === 0 || this.getKey(key) === undefined) {
      const obj = { key: key, value: value };
      this.#arr.push(obj);
      this.#size++;
    } else if (this.#size > 0 && this.getKey(key) !== undefined) {
      // 좀 더 조건식을 고칠 수 있을 거 같은데 널체크나 0 길이 체크 시 계속 || && 에러낸다..
      this.#arr[this.getKey(key)].value = value;
    }
  }

  get(key) {
    const arrKey = this.getKey(key);
    console.log(999, this.#arr);
    return arrKey === undefined ? undefined : this.#arr[arrKey].value;
  }

  delete(key) {
    const arrKey = this.getKey(key);
    if (arrKey !== undefined) {
      delete this.#arr[arrKey];
      this.#size--;
    }
  }

  contains(key) {
    const arrKey = this.getKey(key);
    return arrKey !== undefined;
  }
}

module.exports = {
  SymbolTable,
};
