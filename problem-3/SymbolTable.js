class Node {
  key;

  value;

  left;

  right;

  n;

  constructor(key, value, n) {
    this.key = key;
    this.value = value;
    this.n = n;
  }
}

class SymbolTable {
  #root;

  isEmpty() {
    return this.#root === undefined;
  }

  // 테이블의 사이즈 반환 = 모든 노드의 개수
  size() {
    return this.#size(this.#root);
  }

  // eslint-disable-next-line class-methods-use-this
  #size(node) {
    if (node === undefined) {
      return 0;
    }

    return node.n;
  }

  get(key) {
    return this.#get(this.#root, key);
  }

  #get(node, key) {
    if (node === undefined) {
      return;
    }

    if (key < node.key) {
      return this.#get(node.left, key);
    } if (key > node.key) {
      return this.#get(node.right, key);
    }
    return node.value;
  }

  put(key, value) {
    this.#root = this.#put(this.#root, key, value);
  }

  #put(node, key, value) {
    if (node === undefined) {
      return new Node(key, value, 1);
    }

    if (key < node.key) {
      node.left = this.#put(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.#put(node.right, key, value);
    } else {
      node.value = value;
    }

    node.n = this.#size(node.left) + this.#size(node.right) + 1;
    return node;
  }

  min() {
    if (this.#root === undefined) {
      return;
    }

    return this.#min(this.#root).key;
  }

  max() {
    if (this.#root === undefined) {
      return;
    }

    return this.#max(this.#root).key;
  }

  floor(key) {
    return this.#floor(this.#root, key)?.key;
  }

  #floor(node, key) {
    if (node === undefined) {
      return;
    }

    if (key < node.key) {
      return this.#floor(node.left, key);
    }

    if (key === node.key) {
      return node;
    }

    const t = this.#floor(node.right, key);
    return t !== undefined ? t : node;
  }

  ceiling(key) {
    return this.#ceiling(this.#root, key)?.key;
  }

  #ceiling(node, key) {
    if (node === undefined) {
      return;
    }

    if (key > node.key) {
      return this.#ceiling(node.right, key);
    }

    if (key === node.key) {
      return node;
    }

    const t = this.#ceiling(node.left, key);
    return t !== undefined ? t : node;
  }

  select(k) {
    return this.#select(this.#root, k)?.key;
  }

  #select(node, k) {
    if (node === undefined) {
      return;
    }

    const t = this.#size(node.left);
    if (t > k) {
      return this.#select(node.left, k);
    } if (t < k) {
      return this.#select(node.right, k - t - 1);
    }
    return node;
  }

  rank(key) {
    return this.#rank(this.#root, key);
  }

  #rank(node, key) {
    if (node === undefined) {
      return 0;
    }

    if (key < node.key) {
      return this.#rank(node.left, key);
    }

    if (key > node.key) {
      return 1 + this.#size(node.left) + this.#rank(node.right, key);
    }

    return this.#size(node.left);
  }

  deleteMin() {
    if (this.#root === undefined) {
      return;
    }

    this.#root = this.#deleteMin(this.#root);
  }

  #deleteMin(node) {
    if (node.left === undefined) {
      return node.right;
    }

    node.left = this.#deleteMin(node.left);
    node.n = this.#size(node.left) + this.#size(node.right) + 1;
    return node;
  }

  delete(key) {
    this.#root = this.#delete(this.#root, key);
  }

  #delete(node, key) {
    if (node === undefined) {
      return;
    }

    if (key < node.key) {
      node.left = this.#delete(node.left, key);
    } else if (key > node.key) {
      node.right = this.#delete(node.right, key);
    } else {
      if (node.right === undefined) {
        return node.left;
      }

      if (node.left === undefined) {
        return node.right;
      }

      const t = node;
      node = this.min(t.right);
      node.right = this.#deleteMin(t.right);
      node.left = t.left;
    }

    node.n = this.#size(node.left) + this.#size(node.right) + 1;
    return node;
  }

  contains(key) {
    return !!this.#get(this.#root, key);
  }

  keys() {
    return this.#keys(this.min(), this.max());
  }

  #keys(start, end) {
    const array = [];
    this.#keysRange(this.#root, array, start, end);
    return array;
  }

  keysRange(start, end) {
    const array = [];
    this.#keysRange(this.#root, array, start, end);
    return array;
  }

  #keysRange(node, array, start, end) {
    if (node === undefined) {
      return;
    }

    if (start < node.key) {
      this.#keysRange(node.left, array, start, end);
    }

    if (start <= node.key && end >= node.key) {
      array.push(node.key);
    }

    if (end > node.key) {
      this.#keysRange(node.right, array, start, end);
    }
  }

  #min(node) {
    if (node.left === undefined) {
      return node;
    }

    return this.#min(node.left);
  }

  #max(node) {
    if (node.right === undefined) {
      return node;
    }

    return this.#max(node.right);
  }

  height() {
    if (this.isEmpty()) {
      return -1;
    }

    // 재귀적인 방법으로 트리의 높이 구하기
    return this.#height(this.#root);
  }

  // #height(node, h = 0) {
  //   if (node === undefined) {
  //     return h - 1;
  //   }

  //   return Math.max(this.#height(node.left, 1 + h), this.#height(node.right, 1 + h));
  // }

  #height(node) {
    if (!node) {
      return 0;
    }

    if (!node.left && !node.right) {
      return 0;
    }

    return 1 + Math.max(this.#height(node.left), this.#height(node.right));
  }
}

module.exports = {
  SymbolTable,
};
