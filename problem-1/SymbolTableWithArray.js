/*
다음은 비순차 심볼 테이블의 API입니다. 이 API를 지원하는 심볼 테이블을 구현해
주세요.
내부 데이터 구조는 순서가 없는 배열을 사용해서 구현해 주세요.

| 메서드 | 설명 |
| --- | --- |
| LinkedListST() | 심볼 테이블을 생성합니다 |
| get(key): Item? | 키와 연관된 값을 반환한다. 해당하는 키가 없으면 undefined를 반환 |
| put(key, value): void | 키/값 쌍을 테이블에 넣는다. |
| delete(key): void | 키에 해당하는 키/값 쌍을 삭제한다 |
| contains(key): Boolean | 키와 연관된 값이 존재하면 true, 존재하지 않으면 false를 반환한다 |
| isEmpty(): Boolean | 심볼 테이블이 비어있으면 true, 비어있지 않으면 false를 반환한다 |
| size(): Number | 테이블에 저장된 키/값 쌍의 개수를 반환한다 |
| keys(): Iterable | 테이블에 저장된 모든 키 목록 배열을 반환 |
| values(): Iterable | 테이블에 저장된 모든 값 목록 배열을 반환 |

*/
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
      if (key === this.#keys[i]) {
        return this.#values[i];
      }
    }
  }

  put(key, value) {
    for (let i = 0; i < this.#n; i++) {
      if (key === this.#keys[i]) {
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
      if (key === this.#keys[i]) {
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
    return !!this.get(key);
  }

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.#n === 0;
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
