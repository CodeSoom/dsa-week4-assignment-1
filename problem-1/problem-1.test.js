const { SymbolTable } = require('./SymbolTableWithArray');

test('심볼 테이블은 비어있다', () => {
  const st = new SymbolTable();

  expect(st.size()).toBe(0);
  expect(st.isEmpty()).toBe(true);
});

test('심볼 테이블에 아이템을 추가하면 사이즈가 증가한다.', () => {
  const st = new SymbolTable();

  const oldSize = st.size();

  st.put('foo', 'bar');

  const newSize = st.size();

  expect(newSize - oldSize).toBe(1);
});

test('이미 있는 키 값에 값을 추가하면 사이즈가 증가하지 않는다.', () => {
  const st = new SymbolTable();

  st.put('foo', 'bar');

  const oldSize = st.size();

  st.put('foo', 'other');

  const newSize = st.size();

  expect(newSize - oldSize).toBe(0);
});

test('이미 있는 키 값에 값을 추가하면 이전 값을 덮어쓴다', () => {
  const st = new SymbolTable();

  st.put('foo', 'bar');

  expect(st.get('foo')).toBe('bar');

  st.put('foo', 'other');

  expect(st.get('foo')).toBe('other');
});

test('삭제한 키를 조회하면 undefined를 반환한다', () => {
  const st = new SymbolTable();

  st.put('foo', 'bar');

  expect(st.get('foo')).toBe('bar');

  st.delete('foo');

  expect(st.get('foo')).toBeUndefined();
});

test('없는 키를 조회하면 undefined를 반환한다', () => {
  const st = new SymbolTable();

  expect(st.get('foo')).toBeUndefined();
});

test('키를 삭제하면 사이즈가 감소한다', () => {
  const st = new SymbolTable();

  st.put('foo', 'bar');

  const oldSize = st.size();

  st.delete('foo');

  const newSize = st.size();

  expect(newSize - oldSize).toBe(-1);
});

test('없는 키를 삭제하면 사이즈가 감소하지 않는다', () => {
  const st = new SymbolTable();

  st.put('foo', 'bar');

  const oldSize = st.size();

  st.delete('other');

  const newSize = st.size();

  expect(newSize - oldSize).toBe(0);
});

test('contains 해당하는 키와 값이 존재할 경우 true를 반환한다', () => {
  const st = new SymbolTable();

  st.put('foo', 'bar');

  expect(st.contains('foo')).toBe(true);
});

test('contains 해당하는 키와 값이 없을 경우 false를 반환한다', () => {
  const st = new SymbolTable();

  expect(st.contains('foo')).toBe(false);
});

test('심볼 테이블은 키에 해당하는 값을 저장한다', () => {
  const st = new SymbolTable();

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

test('키를 순회할 수 있다', () => {
  const st = new SymbolTable();

  st.put('foo', 'bar');
  st.put('something', 'that');
  st.put('this', 'is');

  const keys = [];

  for (const key of st.keys()) {
    keys.push(key);
  }

  expect(keys).toEqual(['foo', 'something', 'this']);
});
