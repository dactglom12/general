export class SinglyLinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: string) {
    const node = new ListNode(val);
    this.length++;

    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    return this;
  }

  pop() {
    if (!this.length) {
      return undefined;
    }

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  shift() {
    if (!this.length) {
      return undefined;
    }

    const currentHead = this.head;

    this.head = currentHead.next;
    this.length--;

    if (!this.length) {
      this.tail = null;
    }

    return currentHead;
  }

  unshift(val: string) {
    const node = new ListNode(val);

    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;

    return this;
  }

  get(index: number) {
    if (index >= this.length || index < 0) {
      return undefined;
    }

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  set(index: number, val: string) {
    const node = this.get(index);

    if (node) {
      node.value = val;
      return true;
    }

    return false;
  }

  insert(index: number, val: string) {
    if (index < 0 || index > this.length) {
      return false;
    }

    if (index === 0) {
      this.unshift(val);
      return true;
    }

    if (index === this.length) {
      this.push(val);
      return true;
    }

    const previous = this.get(index - 1);
    const node = new ListNode(val);
    node.next = previous.next;
    previous.next = node;

    this.length++;

    return true;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    const previous = this.get(index - 1);
    const current = previous.next;
    previous.next = current.next;
    this.length--;

    return current;
  }

  reverse() {
    let node = this.head;
    // swap head and tail
    this.head = this.tail;
    this.tail = node;
    // memorize tail next before erasing it
    let next = node.next;
    let prev = null;

    while (node) {
      node.next = prev;
      prev = node;
      node = next;
      if (next) {
        next = node.next;
      }
    }
  }
}

class ListNode<T = string> {
  value: T;
  next: null | ListNode<T>;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

const list = new SinglyLinkedList();

list.push('Goodbye').push('horses').push('I am flying over you');

list.reverse();

console.log(list);
