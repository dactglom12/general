// conditionals signature: Sometype extends OtherType ? TrueType : FalseType;

// When the type on the left of the extends is assignable to the one on the right, then you’ll get the type in the first branch (the “true” branch); otherwise you’ll get the type in the latter branch (the “false” branch).

type Animal = {
  eat: () => void;
};

type Machine = {
  refuel: () => void;
};

// conditionalType takes a type and checks whether it is assignable to Animal. If so - it's string, if not - number
type ConditionalType<TypeToCheck> = TypeToCheck extends Animal
  ? string
  : number;

type IdLabel = {
  id: number;
};

type NameLabel = {
  name: string;
};

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

const createLabel = <T extends string | number>(label: T): NameOrId<T> => {
  throw 'not implemented';
};

const stringLabel = createLabel('String Label');
const numberLabel = createLabel(20);

// conditional type constraints

// intentional incorrect example
// type MessageOf<T> = T['message']; // Type '"message"' cannot be used to index type 'T'.

// correct version

type MessageOf<T extends { message: unknown }> = T['message'];

type Email = {
  message: string;
};

type NumberEmail = {
  message: number;
};

type EmailMessageContents = MessageOf<Email>; // string
type NumberEMailMessageContents = MessageOf<NumberEmail>; // number

type StrictMessageOf<T> = T extends { message: string } ? T['message'] : never;

type Dog = {
  bark: () => void;
};

type StrictEmailMessageContents = StrictMessageOf<NumberEmail>; // never, message is a number
type StrictDogMessage = StrictMessageOf<Dog>; // never, has no message field

type Flatten<T> = T extends Array<infer Item> ? Item : T;

type Str = Flatten<Array<string>>;

type Num = Flatten<number>;

// inferring function return type

type GetReturnType<T> = T extends (...args: never[]) => infer ReturnType
  ? ReturnType
  : never;

type ReturnedStr = GetReturnType<(a: number) => string>;

// conditional types with union (distributive conditional types)

type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>; // string[] | number[]

// what happens above is: StrOrNum gets distributed on (string | number)
// then each type gets applied to ToArray generic
// -> ToArray<string>
// -> ToArray<number>
