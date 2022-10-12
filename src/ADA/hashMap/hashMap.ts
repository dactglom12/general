class HashTable<T = number> {
  private keyMap: [string, T][][];

  constructor(size: number) {
    this.keyMap = new Array(size);
  }

  private hash(str: string): number {
    let total = 0;
    const PRIME = 31;
    const LIMIT = 100;

    for (let i = 0; i < Math.min(str.length, LIMIT); i++) {
      const char = str[i];
      const value = char.charCodeAt(0);
      total = (total * PRIME + value) % this.keyMap.length;
    }

    return total;
  }

  set(key: string, value: T) {
    const index = this.hash(key);

    console.log(index);

    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }

    this.keyMap[index].push([key, value]);

    return index;
  }

  get(key: string) {
    const index = this.hash(key);

    if (!this.keyMap[index]) {
      return undefined;
    }

    let result = undefined;

    this.keyMap[index].forEach((value) => {
      if (value[0] === key) {
        result = value[1];
      }
    });

    return result;
  }

  getMap() {
    return this.keyMap;
  }

  keys() {
    const keysArr = [];

    this.keyMap.forEach((set) => {
      set.forEach((val) => {
        keysArr.push(val[0]);
      });
    });

    return keysArr;
  }

  values() {
    const valuesArr = [];

    this.keyMap.forEach((set) => {
      set.forEach((val) => {
        if (!valuesArr.includes(val[1])) {
          valuesArr.push(val[1]);
        }
      });
    });

    return valuesArr;
  }
}

const hashTable = new HashTable<string>(20);

hashTable.set('pink', '#fff');
hashTable.set('blue', '#000');
hashTable.set('blue', '#000');

console.log(hashTable.get('pink'));
console.log(hashTable.get('blue'));
console.log(hashTable.keys());
console.log(hashTable.values());
