export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  addTest?: Maybe<Test>;
};

export type MutationAddTestArgs = {
  input?: InputMaybe<TestInput>;
};

export type Query = {
  __typename?: "Query";
  getTest?: Maybe<Test>;
};

export type Test = {
  __typename?: "Test";
  optionalField?: Maybe<Scalars["String"]>;
  requiredField: Scalars["String"];
};

export type TestInput = {
  anyField?: InputMaybe<Scalars["String"]>;
};

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
