class Node {
  key;

  item;

  next;

  constructor(key, item, next) {
    this.key = key;
    this.item = item;
    this.next = next;
  }
}

class SymbolTableWithLinkedList {
  #first;

  #size;

  constructor() {
    this.#size = 0;
  }

  get(key) {
    for (let i = this.#first; i !== undefined; i = i.next) {
      if (i.key === key) {
        return i.item;
      }
    }
  }

  put(key, value) {
    for (let i = this.#first; i !== undefined; i = i.next) {
      if (i.key === key) {
        i.item = value;
        return;
      }
    }

    this.#first = new Node(key, value, this.#first);
    this.#size++;
  }

  delete(key) {
    let prev;

    for (let curr = this.#first; curr !== undefined; curr = curr.next) {
      if (curr.key === key) {
        if (prev) {
          prev.next = curr.next;
        } else {
          this.#first = curr.next;
        }

        this.#size--;
        return;
      }

      prev = curr;
    }
  }

  contains(key) {
    for (let i = this.#first; i !== undefined; i = i.next) {
      if (i.key === key) {
        return true;
      }
    }

    return false;
  }

  isEmpty() {
    return this.#size === 0;
  }

  size() {
    return this.#size;
  }

  keys() {
    let current = this.#first;
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (current === undefined) {
              return { done: true };
            }

            const value = current.key;

            current = current.next;

            return { done: false, value };
          },
        };
      },
    };
  }

  values() {
    const array = [];

    for (let i = this.#first; i !== undefined; i = i.next) {
      array.push(i.item);
    }

    return array;
  }
}

module.exports = {
  SymbolTableWithLinkedList,
};
