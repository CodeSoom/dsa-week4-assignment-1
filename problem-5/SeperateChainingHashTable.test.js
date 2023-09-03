const {
  SymbolTableWithLinkedList,
} = require("../problem-1/SymbolTableWithLinkedList");

class SeperateChainingHashTable {
  #M;
  #st;

  constructor(maxCount = 997) {
    this.#M = maxCount;

    this.#st = new Array(maxCount);
    for (let i = 0; i < this.#M; i++) {
      this.#st[i] = new SymbolTableWithLinkedList();
    }
  }

  #hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (31 * hash + key.charCodeAt(i)) % this.#M;
    }
    return hash;
  }

  hash(key) {
    return this.#hash(key);
  }

  get(key) {
    return this.#st[this.#hash(key)].get(key);
  }

  put(key, value) {
    this.#st[this.#hash(key)].put(key, value);
  }

  delete(key, value) {
    this.#st[this.#hash(key)].delete(key);
  }

  contains(key) {
    return !!this.get(key);
  }

  keys() {
    const array = [];

    for (let i = 0; i < this.#M; i++) {
      const currentKeys = this.#st[i].keys();
      array.push(...currentKeys);
    }

    return array;
  }
}

const randomString = (max) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  const length = Math.floor(Math.random() * max) + 1;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};

test("이미 있는 키 값에 값을 추가하면 이전 값을 덮어쓴다", () => {
  const st = new SeperateChainingHashTable();

  st.put("foo", "bar");

  expect(st.get("foo")).toBe("bar");

  st.put("foo", "other");

  expect(st.get("foo")).toBe("other");
});

test("삭제한 키를 조회하면 undefined를 반환한다", () => {
  const st = new SeperateChainingHashTable();

  st.put("foo", "bar");

  expect(st.get("foo")).toBe("bar");

  st.delete("foo");

  expect(st.get("foo")).toBeUndefined();
});

test("없는 키를 조회하면 undefined를 반환한다", () => {
  const st = new SeperateChainingHashTable();

  expect(st.get("foo")).toBeUndefined();
});

test("contains 해당하는 키와 값이 존재할 경우 true를 반환한다", () => {
  const st = new SeperateChainingHashTable();

  st.put("foo", "bar");

  expect(st.contains("foo")).toBe(true);
});

test("contains 해당하는 키와 값이 없을 경우 false를 반환한다", () => {
  const st = new SeperateChainingHashTable();

  expect(st.contains("foo")).toBe(false);
});

test("심볼 테이블은 키에 해당하는 값을 저장한다", () => {
  const st = new SeperateChainingHashTable();

  st.put("foo", "bar");
  st.put("something", "that");
  st.put("this", "is");

  expect(st.get("foo")).toBe("bar");
  expect(st.get("something")).toBe("that");
  expect(st.get("this")).toBe("is");

  st.delete("this");
  st.delete("something");
  st.delete("foo");

  expect(st.get("foo")).toBeUndefined();
  expect(st.get("something")).toBeUndefined();
  expect(st.get("this")).toBeUndefined();
});

test("해시의 결과 같더라도, 키에 해당하는 값이 저장된다.", () => {
  const st = new SeperateChainingHashTable();

  let a;
  let b;

  while (true) {
    a = randomString(10);
    b = randomString(10);
    if (st.hash(a) === st.hash(b) && a !== b) {
      break;
    }
  }

  st.put(a, "123");
  st.put(b, "456");

  expect(st.get(a)).toBe("123");
  expect(st.get(b)).toBe("456");
});

test("keys는 모든 키 목록을 담은 배열을 반환한다", () => {
  const st = new SeperateChainingHashTable();

  let a;
  let b;

  while (true) {
    a = randomString(10);
    b = randomString(10);
    if (st.hash(a) === st.hash(b) && a !== b) {
      break;
    }
  }

  st.put(a, "123");
  st.put(b, "456");
  st.put("FOO", "bar");
  st.put("HELLO", "world");

  const keys = st.keys();

  expect(keys.length).toBe(4);
  expect(keys.includes(a)).toBe(true);
  expect(keys.includes(b)).toBe(true);
  expect(keys.includes("FOO")).toBe(true);
  expect(keys.includes("HELLO")).toBe(true);
});
