interface IPrototype {
  clone: () => IPrototype;
}

type CarConfiguration = {
  withFan?: boolean;
  withAutomaticWindowsControl?: boolean;
};

type CarConstructor = {
  seats: number;
  wheelsCount: number;
  price: number;
  configuration: CarConfiguration;
};

export class Car implements IPrototype {
  private wheelsCount: number;
  private price: number;
  public seats: number;
  public configuration: CarConfiguration;

  constructor(properties: CarConstructor) {
    this.price = properties.price;
    this.wheelsCount = properties.wheelsCount;
    this.seats = properties.seats;
    this.configuration = properties.configuration;
  }

  clone() {
    const { price, seats, wheelsCount, configuration } = this;
    const copy = new Car({
      price,
      seats,
      wheelsCount,
      // we should always DEEP-COPY any nested objects, so that prototypes always use 'separate' fields
      configuration: {
        ...configuration,
      },
    });

    return copy;
  }

  drive() {
    console.log('driving');
  }
}

const cr_v = new Car({
  wheelsCount: 4,
  seats: 3,
  price: 5000,
  configuration: {
    withAutomaticWindowsControl: false,
    withFan: true,
  },
});
const hr_v = cr_v.clone();
const new_hr_v = hr_v.clone();
