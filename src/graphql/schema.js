const { buildSchema } = require("graphql");

// type -> object (or class in terms of OOP)
// two top-level types - Query, Mutation

const schema = /* Graphql */ `
  input TestInput {
    anyField: String
  }

  type Test {
    optionalField: String
    requiredField: String!
  }

  type Query {
    getTest: Test
  }

  type Mutation {
    addTest(input: TestInput): Test
  }
`;

module.exports = buildSchema(schema);
