// index signature
type Horse = {
  [key: string]: never;
};

type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  b: {},
};

// mapped type
type OptionsFlags<Type> = {
  [Prop in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;

// removes readonly modifier from all object properties
type CreateMutable<Type> = {
  -readonly [Prop in keyof Type]: Type[Prop];
};

type LockedAccount = {
  readonly name: string;
  readonly email: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// makes all properties of object required
type WithRequiredProperties<Type> = {
  [Prop in keyof Type]-?: Type[Prop];
};

type OptionalAddresses = {
  address1: string;
  address2?: string;
  address3?: string;
};

type RequiredAddresses = WithRequiredProperties<OptionalAddresses>;

// key remapping (WHAT A COOL FEATURE)
type Getters<Type> = {
  [Prop in keyof Type as `get${Capitalize<string & Prop>}`]: () => Type[Prop];
};

type Person = {
  name: string;
  age: number;
  location: string;
};

type PersonGetters = Getters<Person>;

// property removal
type RemoveField<Type, Field extends keyof Type> = {
  [Prop in keyof Type as Exclude<Prop, Field>]: Type[Prop];
};

type AgelessPerson = RemoveField<Person, 'age'>;

// map over arbitrary unions
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E['kind']]: (event: E) => void;
};

type SquareEvent = { kind: 'square'; x: number; y: number };
type CircleEvent = { kind: 'circle'; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;
