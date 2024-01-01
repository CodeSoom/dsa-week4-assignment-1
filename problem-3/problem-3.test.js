const { SymbolTable } = require('./SymbolTable');

describe('isEmpty', () => {
  it('비어있으면 true를 반환한다', () => {
    const st = new SymbolTable();

    expect(st.isEmpty()).toBe(true);
  });

  it('비어있지 않으면 false를 반환한다', () => {
    const st = new SymbolTable();

    st.put('foo', 'bar');

    expect(st.isEmpty()).toBe(false);
  });
});

describe('put', () => {
  it('테이블의 사이즈가 증가한다', () => {
    const st = new SymbolTable();

    const oldSize = st.size();

    st.put('foo', 'bar');

    const newSize = st.size();

    expect(newSize - oldSize).toBe(1);
  });

  it('이미 있는 키 값에 값을 추가하면 사이즈가 증가하지 않는다.', () => {
    const st = new SymbolTable();

    st.put('foo', 'bar');

    const oldSize = st.size();

    st.put('foo', 'other');

    const newSize = st.size();

    expect(newSize - oldSize).toBe(0);
  });

  it('이미 있는 키 값에 값을 추가하면 이전 값을 덮어쓴다', () => {
    const st = new SymbolTable();

    st.put('foo', 'bar');

    expect(st.get('foo')).toBe('bar');

    st.put('foo', 'other');

    expect(st.get('foo')).toBe('other');
  });
});

describe('get', () => {
  it('키에 해당하는 값을 반환한다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);

    expect(st.get('A')).toBe(undefined);
    expect(st.get('B')).toBe(0);
    expect(st.get('C')).toBe(undefined);
    expect(st.get('D')).toBe(1);
    expect(st.get('E')).toBe(undefined);
    expect(st.get('F')).toBe(2);
    expect(st.get('G')).toBe(undefined);
  });
});

describe('delete', () => {
  it('삭제한 키를 조회하면 undefined를 반환한다', () => {
    const st = new SymbolTable();

    st.put('foo', 'bar');

    expect(st.get('foo')).toBe('bar');

    st.delete('foo');

    expect(st.get('foo')).toBeUndefined();
  });

  it('키를 삭제하면 사이즈가 감소한다', () => {
    const st = new SymbolTable();

    st.put('foo', 'bar');

    const oldSize = st.size();

    st.delete('foo');

    const newSize = st.size();

    expect(newSize - oldSize).toBe(-1);
  });

  it('없는 키를 삭제하면 사이즈가 감소하지 않는다', () => {
    const st = new SymbolTable();

    st.put('foo', 'bar');

    const oldSize = st.size();

    st.delete('other');

    const newSize = st.size();

    expect(newSize - oldSize).toBe(0);
  });

  it('중간에 있는 키를 삭제하면 순서가 바뀐다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);

    st.delete('D');

    expect(st.select(1)).toBe('F');
  });
});

describe('contains', () => {
  it('해당하는 키와 값이 존재할 경우 true를 반환한다', () => {
    const st = new SymbolTable();

    st.put('foo', 'bar');

    expect(st.contains('foo')).toBe(true);
  });

  it('해당하는 키와 값이 없을 경우 false를 반환한다', () => {
    const st = new SymbolTable();

    expect(st.contains('foo')).toBe(false);
  });
});

describe('floor', () => {
  it('주어진 키보다 작거나 같은 가장 큰 키를 반환한다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);

    expect(st.floor('A')).toBe(undefined);
    expect(st.floor('B')).toBe('B');
    expect(st.floor('C')).toBe('B');
    expect(st.floor('D')).toBe('D');
    expect(st.floor('E')).toBe('D');
    expect(st.floor('F')).toBe('F');
    expect(st.floor('G')).toBe('F');
  });

  it('비어있으면 undefined를 반환한다', () => {
    const st = new SymbolTable();

    expect(st.floor('A')).toBe(undefined);
  });
});

describe('rank', () => {
  it('주어진 키보다 작은 키의 개수를 반환한다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);

    expect(st.rank('A')).toBe(0);
    expect(st.rank('B')).toBe(0);
    expect(st.rank('C')).toBe(1);
    expect(st.rank('D')).toBe(1);
    expect(st.rank('E')).toBe(2);
    expect(st.rank('F')).toBe(2);
    expect(st.rank('G')).toBe(3);
  });
});

describe('ceiling', () => {
  it('주어진 키보다 크거나 같은 가장 작은 키를 반환한다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);

    expect(st.ceiling('A')).toBe('B');
    expect(st.ceiling('B')).toBe('B');
    expect(st.ceiling('C')).toBe('D');
    expect(st.ceiling('D')).toBe('D');
    expect(st.ceiling('E')).toBe('F');
    expect(st.ceiling('F')).toBe('F');
    expect(st.ceiling('G')).toBe(undefined);
  });

  it('비어있으면 undefined를 반환한다', () => {
    const st = new SymbolTable();

    expect(st.ceiling()).toBe(undefined);
  });
});

describe('min', () => {
  it('가장 작은 키를 반환한다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('F', 2);
    st.put('D', 1);

    expect(st.min()).toBe('B');
  });

  it('심볼테이블이 비어있으면 undefined를 반환한다', () => {
    const st = new SymbolTable();

    expect(st.min()).toBe(undefined);
  });
});

describe('max', () => {
  it('가장 큰 키를 반환한다', () => {
    const st = new SymbolTable();

    st.put('F', 2);
    st.put('D', 1);
    st.put('B', 0);

    expect(st.max()).toBe('F');
  });

  it('심볼테이블이 비어있으면 undefined를 반환한다', () => {
    const st = new SymbolTable();

    expect(st.max()).toBe(undefined);
  });
});

describe('keys', () => {
  it('키 목록을 반환한다', () => {
    const st = new SymbolTable();

    st.put('F', 2);
    st.put('D', 1);
    st.put('B', 0);

    expect(st.keys()).toEqual(['B', 'D', 'F']);
  });
});

describe('keysRange', () => {
  it('주어진 범위에 있는 키 목록을 반환합니다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);
    st.put('H', 3);
    st.put('J', 0);

    expect(st.keysRange('C', 'I')).toEqual(['D', 'F', 'H']);
  });

  it('시작과, 끝도 포함한다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);
    st.put('H', 3);
    st.put('J', 0);

    expect(st.keysRange('D', 'H')).toEqual(['D', 'F', 'H']);
  });
});

describe('select', () => {
  it('주어진 순위의 키를 반환한다', () => {
    const st = new SymbolTable();

    st.put('S', 0);
    st.put('E', 1);
    st.put('X', 2);
    st.put('A', 3);
    st.put('C', 4);
    st.put('R', 5);
    st.put('H', 6);
    st.put('M', 7);

    expect(st.select(0)).toBe('A');
    expect(st.select(1)).toBe('C');
    expect(st.select(2)).toBe('E');
    expect(st.select(3)).toBe('H');
    expect(st.select(4)).toBe('M');
    expect(st.select(5)).toBe('R');
    expect(st.select(6)).toBe('S');
    expect(st.select(7)).toBe('X');
    expect(st.select(8)).toBe(undefined);
  });
});

describe('deleteMin', () => {
  it('가장 작은 키를를 삭제한다', () => {
    const st = new SymbolTable();

    st.put('B', 0);
    st.put('D', 1);
    st.put('F', 2);

    expect(st.min()).toBe('B');

    st.deleteMin();

    expect(st.min()).toBe('D');
  });
});

describe('height', () => {
  it('트리가 비어있으면 -1을 반환한다', () => {
    const st = new SymbolTable();

    expect(st.height()).toBe(-1);
  });

  it('트리의 높이를 반환한다', () => {
    const st = new SymbolTable();

    st.put('F', 1);

    expect(st.height()).toBe(0);

    st.put('C', 2);

    expect(st.height()).toBe(1);

    st.put('G', 3);

    expect(st.height()).toBe(1);

    st.put('H', 4);
    st.put('H', 10);

    expect(st.height()).toBe(2);

    st.delete('Z');

    expect(st.height()).toBe(2);
  });
});
