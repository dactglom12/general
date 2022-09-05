import * as Types from "../base-graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type GetTestQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetTestQuery = {
  __typename?: "Query";
  getTest?:
    | { __typename?: "Test"; optionalField?: string | null | undefined }
    | null
    | undefined;
};

export type AddTestMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.TestInput>;
}>;

export type AddTestMutation = {
  __typename?: "Mutation";
  addTest?:
    | { __typename?: "Test"; optionalField?: string | null | undefined }
    | null
    | undefined;
};

export const GetTestDocument = gql`
  query GetTest {
    getTest {
      optionalField
    }
  }
`;

/**
 * __useGetTestQuery__
 *
 * To run a query within a React component, call `useGetTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTestQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTestQuery, GetTestQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTestQuery, GetTestQueryVariables>(
    GetTestDocument,
    options
  );
}
export function useGetTestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTestQuery, GetTestQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTestQuery, GetTestQueryVariables>(
    GetTestDocument,
    options
  );
}
export type GetTestQueryHookResult = ReturnType<typeof useGetTestQuery>;
export type GetTestLazyQueryHookResult = ReturnType<typeof useGetTestLazyQuery>;
export type GetTestQueryResult = Apollo.QueryResult<
  GetTestQuery,
  GetTestQueryVariables
>;
export const AddTestDocument = gql`
  mutation AddTest($input: TestInput) {
    addTest(input: $input) {
      optionalField
    }
  }
`;
export type AddTestMutationFn = Apollo.MutationFunction<
  AddTestMutation,
  AddTestMutationVariables
>;

/**
 * __useAddTestMutation__
 *
 * To run a mutation, you first call `useAddTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTestMutation, { data, loading, error }] = useAddTestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTestMutation,
    AddTestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddTestMutation, AddTestMutationVariables>(
    AddTestDocument,
    options
  );
}
export type AddTestMutationHookResult = ReturnType<typeof useAddTestMutation>;
export type AddTestMutationResult = Apollo.MutationResult<AddTestMutation>;
export type AddTestMutationOptions = Apollo.BaseMutationOptions<
  AddTestMutation,
  AddTestMutationVariables
>;
