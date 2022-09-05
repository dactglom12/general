interface TransportVisitor {
  exportCar: (car: Car) => void;
  exportSUV: (suv: SUV) => void;
}

interface Transport {
  accept: (visitor: TransportVisitor) => void;
  drive: () => void;
}

class TransportVisitorImplementation implements TransportVisitor {
  exportCar(car: Car) {
    console.log(`exporting car: it drives from visitor`);
    car.drive();
  }

  exportSUV(suv: SUV) {
    console.log(`exporting suv: it drives from visitor`);
    suv.drive();
  }
}

class Car implements Transport {
  // another business logic

  accept(visitor: TransportVisitor) {
    visitor.exportCar(this);
  }

  drive() {
    console.log("driving car");
  }
}
class SUV implements Transport {
  accept(visitor: TransportVisitor) {
    visitor.exportSUV(this);
  }

  drive() {
    console.log("driving SUV");
  }
}

const transports: Transport[] = [
  new SUV(),
  new Car(),
  new Car(),
  new SUV(),
  new Car(),
];

const visitor = new TransportVisitorImplementation();

transports.forEach((t) => t.accept(visitor));
