import { gql } from "@apollo/client";

export const testQuery = gql`
  query GetTest {
    getTest {
      optionalField
    }
  }

  mutation AddTest($input: TestInput) {
    addTest(input: $input) {
      optionalField
    }
  }
`;
