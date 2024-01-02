class LinearProbingHashTable {
  #N = 0;

  #M = 0;

  #keys = [];

  #values = [];

  constructor(maxCount = 16) {
    this.#M = maxCount;
    this.#keys = new Array(this.#M);
    this.#values = new Array(this.#M);
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
    for (let i = this.#hash(key); this.#keys[i] !== undefined; i = (i + 1) % this.#M) {
      if (this.#keys[i] === key) {
        return this.#values[i];
      }
    }
  }

  put(key, value) {
    let i = this.#hash(key);
    while (true) {
      if (this.#keys[i] === key) {
        this.#values[i] = value;
        return;
      }

      if (this.#keys[i] === undefined) {
        this.#N++;
        this.#keys[i] = key;
        this.#values[i] = value;

        if (this.#N >= this.#M / 2) {
          this.#resize(this.#M * 2);
        }

        return;
      }

      i = (i + 1) % this.#M;
    }
  }

  delete(key) {
    for (let i = this.#hash(key); this.#keys[i] !== undefined; i = (i + 1) % this.#M) {
      if (this.#keys[i] === key) {
        // 찾았다.
        this.#keys[i] = undefined;
        this.#values[i] = undefined;
        this.#N--;

        i = (i + 1) % this.#M;
        while (this.#keys[i] !== undefined) {
          const beforeKey = this.#keys[i];
          const beforeValuse = this.#values[i];

          this.#keys[i] = undefined;
          this.#values[i] = undefined;
          this.#N--;
          if (this.#N <= this.#M / 2) {
            this.#resize(this.#M / 2);
          }
          this.put(beforeKey, beforeValuse);
          i = (i + 1) % this.#M;
        }
        return;
      }
    }
  }

  contains(key) {
    return this.get(key) !== undefined;
  }

  keys() {
    return this.#keys.filter((key) => key !== undefined);
  }

  // 크기를 2배로 키운다.
  #resize(capacity) {
    // 이전 배열의 크기의 2배인 새로운 배열 하나 만든다.
    // 이전에 배열을 꺼내서 다시 새로운 배열에 넣는다.

    const newTable = new LinearProbingHashTable(capacity);

    for (let i = 0; i < this.#M; i++) {
      const key = this.#keys[i];
      const value = this.#values[i];

      if (key !== undefined) {
        newTable.put(key, value);
      }
    }

    this.#keys = newTable.#keys;
    this.#values = newTable.#values;
    this.#M = capacity;
  }
}

const randomString = (max) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  const length = Math.floor(Math.random() * max) + 1;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};

test('이미 있는 키 값에 값을 추가하면 이전 값을 덮어쓴다', () => {
  const st = new LinearProbingHashTable();

  st.put('foo', 'bar');

  expect(st.get('foo')).toBe('bar');

  st.put('foo', 'other');

  expect(st.get('foo')).toBe('other');
});

test('삭제한 키를 조회하면 undefined를 반환한다', () => {
  const st = new LinearProbingHashTable();

  st.put('foo', 'bar');

  expect(st.get('foo')).toBe('bar');

  st.delete('foo');

  expect(st.get('foo')).toBeUndefined();
});

test('없는 키를 조회하면 undefined를 반환한다', () => {
  const st = new LinearProbingHashTable();

  expect(st.get('foo')).toBeUndefined();
});

test('contains 해당하는 키와 값이 존재할 경우 true를 반환한다', () => {
  const st = new LinearProbingHashTable();

  st.put('foo', 'bar');

  expect(st.contains('foo')).toBe(true);
});

test('contains 해당하는 키와 값이 없을 경우 false를 반환한다', () => {
  const st = new LinearProbingHashTable();

  expect(st.contains('foo')).toBe(false);
});

test('심볼 테이블은 키에 해당하는 값을 저장한다', () => {
  const st = new LinearProbingHashTable();

  st.put('foo', 'bar');
  st.put('something', 'that');
  st.put('this', 'is');

  expect(st.get('foo')).toBe('bar');
  expect(st.get('something')).toBe('that');
  expect(st.get('this')).toBe('is');

  st.delete('this');
  st.delete('something');
  st.delete('foo');

  expect(st.get('foo')).toBeUndefined();
  expect(st.get('something')).toBeUndefined();
  expect(st.get('this')).toBeUndefined();
});

test('해시의 결과 같더라도, 키에 해당하는 값이 저장된다.', () => {
  const st = new LinearProbingHashTable();

  let a;
  let b;

  while (true) {
    a = randomString(10);
    b = randomString(10);
    if (st.hash(a) === st.hash(b) && a !== b) {
      break;
    }
  }

  st.put(a, '123');
  st.put(b, '456');

  expect(st.get(a)).toBe('123');
  expect(st.get(b)).toBe('456');
});

test('keys는 모든 키 목록을 담은 배열을 반환한다', () => {
  const st = new LinearProbingHashTable();

  let a;
  let b;

  while (true) {
    a = randomString(10);
    b = randomString(10);
    if (st.hash(a) === st.hash(b) && a !== b) {
      break;
    }
  }

  st.put(a, '123');
  st.put(b, '456');
  st.put('FOO', 'bar');
  st.put('HELLO', 'world');

  const keys = st.keys();

  expect(keys.length).toBe(4);
  expect(keys.includes(a)).toBe(true);
  expect(keys.includes(b)).toBe(true);
  expect(keys.includes('FOO')).toBe(true);
  expect(keys.includes('HELLO')).toBe(true);
});
