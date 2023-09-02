/**
 * 
 * 
다음은 순차 심볼 테이블의 API입니다.

| 메서드 | 설명 |
| --- | --- |
| ST() | 심볼 테이블을 생성합니다 |
| get(key): Item? | 키와 연관된 값을 반환한다. 해당하는 키가 없으면 undefined를 반환 |
| put(key, value): void | 키/값 쌍을 테이블에 넣는다. |
| delete(key): void | 키에 해당하는 키/값 쌍을 삭제한다 |
| contains(key): Boolean | 키와 연관된 값이 존재하면 true, 존재하지 않으면 false를 반환한다 |
| isEmpty(): Boolean | 심볼 테이블이 비어있으면 true, 비어있지 않으면 false를 반환한다 |
| size(): Number | 테이블에 저장된 키/값 쌍의 개수를 반환한다 |
| min(): Key? | 가장 작은 키를 반환한다 |
| max(): Key? | 가장 큰 키를 반환한다 |
| floor(Key): Key? | 키보다 작거나 같은 값 중에 가장 큰 키를 반환 |
| ceiling(Key): Key? | 주어진 키보다 크거나 같은 가장 작은 키를 반환 |
| rank(Key): Key? | 주어진 키보다 작은 키의 개수 반환 |
| select(k): Key? | k번째 순위의 키를 반환 |
| deleteMin(): void | 가장 작은 키를 삭제한다 |
| deleteMax(): void | 가장 큰 키를 삭제한다 |
| keys(): Iterable | 테이블에 저장된 모든 키 목록 배열을 반환 |
| keysRange(low, high): Iterable | [low..high] 범위에 속하는 키 목록 배열 반환 |

위 API를 참고하여 아래 기능들을 구현해 주세요. `rank()`를 활용해서 구현해야 합니다.

* contains
* floor
* ceiling
* keysRange

*/

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
    }
    if (key > this.#keys[mid]) {
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
    return !!this.get(key);
  }

  floor(key) {
    if (this.isEmpty()) {
      return;
    }
    const i = this.rank(key);
    if (i === 0) {
      return this.#keys[i] === key ? key : undefined;
    }

    if (key === this.#keys[i]) {
      return key;
    }

    return this.#keys[i - 1];
  }

  ceiling(key) {
    if (this.isEmpty()) {
      return;
    }
    const i = this.rank(key);
    if (i >= this.#n) {
      return;
    }

    return this.#keys[i];
  }

  keysRange(start, end) {
    const startIndex = this.rank(start);
    const endIndex = this.rank(end);

    const array = [];

    for (let i = startIndex; i < endIndex; i++) {
      array.push(this.#keys[i]);
    }

    if (this.#keys[endIndex] === end) {
      array.push(end);
    }

    return array;
    /*
   return endIndex === end
      ? this.#keys.slice(startIndex, endIndex )
      : this.#keys.slice(startIndex, endIndex + 1);
      */
  }
}

module.exports = {
  SymbolTable,
};
