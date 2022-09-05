interface IProduct {
  calculatePrice: () => number;
}

type ProductConstructor = {
  price: number;
};

type BoxConstructor = {
  children?: IProduct[];
};

class Product implements IProduct {
  private price: number;

  constructor(props: ProductConstructor) {
    this.price = props.price;
  }

  calculatePrice() {
    return this.price;
  }
}

class Box implements IProduct {
  private children: IProduct[];

  constructor(props: BoxConstructor) {
    this.children = props.children ?? [];
  }

  calculatePrice() {
    return this.children.reduce((sum, current) => {
      return sum + current.calculatePrice();
    }, 0);
  }

  add(item: IProduct) {
    this.children.push(item);
  }
}

const simpleProducts = [10, 20, 30].map((price) => new Product({ price }));

const simpleBox1 = new Box({ children: simpleProducts });
const simpleBox2 = new Box({ children: [new Product({ price: 35 })] });

const compoundBox = new Box({ children: [simpleBox1, simpleBox2] });

console.log(compoundBox.calculatePrice());
