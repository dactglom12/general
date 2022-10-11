type Fish = {
  swim: () => void;
};

type Bird = {
  fly: () => void;
};

const getSmallPet = () => {
  const fish: Fish = {
    swim() {
      console.log("I'm swiming");
    },
  };

  const bird: Bird = {
    fly() {
      console.log("I'm flying");
    },
  };

  const entities = [fish, bird];

  const index = Math.round(Math.random());

  return entities[index];
};

// guards

// predicate

const isFish = (pet: Fish | Bird): pet is Fish => {
  return (pet as Fish).swim !== undefined;
};

const pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const onlyFish = zoo.filter(isFish);

// typeof type guard

const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

const generateValue = () => {
  const values = ['string', 10, { value: 'I am object' }];

  const index = Math.floor(Math.random() * (values.length - 1));

  return values[index];
};

const value = generateValue();

if (isNumber(value)) {
  value.toFixed();
} else {
  console.log('Not a number');
}

// in type guard

type HouseDescription = {
  address: string;
  area: number;
  owner?: string;
};

const hasOwner = (description: HouseDescription) => {
  return 'address' in description;
};

// equality narrowing type guard

const getValues = (val1: string | number, val2: string) => {
  if (val1 === val2) {
    console.log(typeof val1); // is always string
  } else {
    console.log(typeof val1); // string or number
  }
};
