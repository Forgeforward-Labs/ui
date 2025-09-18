import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: string; output: string; }
};

export type Lock = {
  __typename?: 'Lock';
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  lockAddress: Scalars['String']['output'];
  lockTimeEnd: Scalars['BigInt']['output'];
  lockingAmount: Scalars['BigInt']['output'];
  owner: Scalars['String']['output'];
  projectImageUrl: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type LockWhereInput = {
  lockAddress?: InputMaybe<StringWhereInput>;
  owner?: InputMaybe<StringWhereInput>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PlatformStats = {
  __typename?: 'PlatformStats';
  id: Scalars['ID']['output'];
  totalLPLockers: Scalars['BigInt']['output'];
  totalSales: Scalars['BigInt']['output'];
  totalTokenLockers: Scalars['BigInt']['output'];
  totalTokens: Scalars['BigInt']['output'];
};

export type Query = {
  __typename?: 'Query';
  Lock: Lock;
  PlatformStats?: Maybe<PlatformStats>;
  Tokens: Array<Tokens>;
};


export type QueryLockArgs = {
  where?: InputMaybe<LockWhereInput>;
};


export type QueryTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<TokensOrderByInput>;
  where?: InputMaybe<TokensWhereInput>;
};

export type StringWhereInput = {
  _eq?: InputMaybe<Scalars['String']['input']>;
};

export enum TokenType {
  Fee = 'FEE',
  Standard = 'STANDARD'
}

export type Tokens = {
  __typename?: 'Tokens';
  createdAt: Scalars['BigInt']['output'];
  decimalPlaces: Scalars['BigInt']['output'];
  fee?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  token: Scalars['String']['output'];
  tokenType: TokenType;
  totalSupply: Scalars['BigInt']['output'];
  transferTax?: Maybe<Scalars['BigInt']['output']>;
};

export type TokensOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
};

export type TokensWhereInput = {
  owner?: InputMaybe<StringWhereInput>;
};

export type GetPlatformStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlatformStatsQuery = { __typename?: 'Query', PlatformStats?: { __typename?: 'PlatformStats', totalTokens: string, totalTokenLockers: string, totalLPLockers: string, totalSales: string } };

export type GetRecentTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentTokensQuery = { __typename?: 'Query', Tokens: Array<{ __typename?: 'Tokens', id: string, token: string, name: string, symbol: string, totalSupply: string, decimalPlaces: string, owner: string, tokenType: TokenType, createdAt: string, fee?: string, transferTax?: string }> };

export type GetUserTokensQueryVariables = Exact<{
  owner: Scalars['String']['input'];
}>;


export type GetUserTokensQuery = { __typename?: 'Query', Tokens: Array<{ __typename?: 'Tokens', id: string, token: string, name: string, symbol: string, totalSupply: string, decimalPlaces: string, owner: string, tokenType: TokenType, createdAt: string, fee?: string, transferTax?: string }> };

export type GetUserLocksQueryVariables = Exact<{
  owner: Scalars['String']['input'];
}>;


export type GetUserLocksQuery = { __typename?: 'Query', Lock: { __typename?: 'Lock', id: string, token: string, owner: string, lockingAmount: string, lockTimeEnd: string, projectImageUrl: string, createdAt: string, lockAddress: string } };

export type GetLockQueryVariables = Exact<{
  lockAddress: Scalars['String']['input'];
}>;


export type GetLockQuery = { __typename?: 'Query', Lock: { __typename?: 'Lock', id: string, token: string, owner: string, lockingAmount: string, lockTimeEnd: string, projectImageUrl: string, createdAt: string, lockAddress: string } };


export const GetPlatformStatsDocument = gql`
    query GetPlatformStats {
  PlatformStats {
    totalTokens
    totalTokenLockers
    totalLPLockers
    totalSales
  }
}
    `;

/**
 * __useGetPlatformStatsQuery__
 *
 * To run a query within a React component, call `useGetPlatformStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlatformStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlatformStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlatformStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetPlatformStatsQuery, GetPlatformStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlatformStatsQuery, GetPlatformStatsQueryVariables>(GetPlatformStatsDocument, options);
      }
export function useGetPlatformStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlatformStatsQuery, GetPlatformStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlatformStatsQuery, GetPlatformStatsQueryVariables>(GetPlatformStatsDocument, options);
        }
export function useGetPlatformStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlatformStatsQuery, GetPlatformStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlatformStatsQuery, GetPlatformStatsQueryVariables>(GetPlatformStatsDocument, options);
        }
export type GetPlatformStatsQueryHookResult = ReturnType<typeof useGetPlatformStatsQuery>;
export type GetPlatformStatsLazyQueryHookResult = ReturnType<typeof useGetPlatformStatsLazyQuery>;
export type GetPlatformStatsSuspenseQueryHookResult = ReturnType<typeof useGetPlatformStatsSuspenseQuery>;
export type GetPlatformStatsQueryResult = Apollo.QueryResult<GetPlatformStatsQuery, GetPlatformStatsQueryVariables>;
export const GetRecentTokensDocument = gql`
    query GetRecentTokens {
  Tokens(order_by: {createdAt: desc}, limit: 3) {
    id
    token
    name
    symbol
    totalSupply
    decimalPlaces
    owner
    tokenType
    createdAt
    fee
    transferTax
  }
}
    `;

/**
 * __useGetRecentTokensQuery__
 *
 * To run a query within a React component, call `useGetRecentTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentTokensQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentTokensQuery, GetRecentTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentTokensQuery, GetRecentTokensQueryVariables>(GetRecentTokensDocument, options);
      }
export function useGetRecentTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentTokensQuery, GetRecentTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentTokensQuery, GetRecentTokensQueryVariables>(GetRecentTokensDocument, options);
        }
export function useGetRecentTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRecentTokensQuery, GetRecentTokensQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecentTokensQuery, GetRecentTokensQueryVariables>(GetRecentTokensDocument, options);
        }
export type GetRecentTokensQueryHookResult = ReturnType<typeof useGetRecentTokensQuery>;
export type GetRecentTokensLazyQueryHookResult = ReturnType<typeof useGetRecentTokensLazyQuery>;
export type GetRecentTokensSuspenseQueryHookResult = ReturnType<typeof useGetRecentTokensSuspenseQuery>;
export type GetRecentTokensQueryResult = Apollo.QueryResult<GetRecentTokensQuery, GetRecentTokensQueryVariables>;
export const GetUserTokensDocument = gql`
    query GetUserTokens($owner: String!) {
  Tokens(where: {owner: {_eq: $owner}}) {
    id
    token
    name
    symbol
    totalSupply
    decimalPlaces
    owner
    tokenType
    createdAt
    fee
    transferTax
  }
}
    `;

/**
 * __useGetUserTokensQuery__
 *
 * To run a query within a React component, call `useGetUserTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTokensQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useGetUserTokensQuery(baseOptions: Apollo.QueryHookOptions<GetUserTokensQuery, GetUserTokensQueryVariables> & ({ variables: GetUserTokensQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTokensQuery, GetUserTokensQueryVariables>(GetUserTokensDocument, options);
      }
export function useGetUserTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTokensQuery, GetUserTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTokensQuery, GetUserTokensQueryVariables>(GetUserTokensDocument, options);
        }
export function useGetUserTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserTokensQuery, GetUserTokensQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTokensQuery, GetUserTokensQueryVariables>(GetUserTokensDocument, options);
        }
export type GetUserTokensQueryHookResult = ReturnType<typeof useGetUserTokensQuery>;
export type GetUserTokensLazyQueryHookResult = ReturnType<typeof useGetUserTokensLazyQuery>;
export type GetUserTokensSuspenseQueryHookResult = ReturnType<typeof useGetUserTokensSuspenseQuery>;
export type GetUserTokensQueryResult = Apollo.QueryResult<GetUserTokensQuery, GetUserTokensQueryVariables>;
export const GetUserLocksDocument = gql`
    query GetUserLocks($owner: String!) {
  Lock(where: {owner: {_eq: $owner}}) {
    id
    token
    owner
    lockingAmount
    lockTimeEnd
    projectImageUrl
    createdAt
    lockAddress
  }
}
    `;

/**
 * __useGetUserLocksQuery__
 *
 * To run a query within a React component, call `useGetUserLocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLocksQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useGetUserLocksQuery(baseOptions: Apollo.QueryHookOptions<GetUserLocksQuery, GetUserLocksQueryVariables> & ({ variables: GetUserLocksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserLocksQuery, GetUserLocksQueryVariables>(GetUserLocksDocument, options);
      }
export function useGetUserLocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLocksQuery, GetUserLocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserLocksQuery, GetUserLocksQueryVariables>(GetUserLocksDocument, options);
        }
export function useGetUserLocksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserLocksQuery, GetUserLocksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserLocksQuery, GetUserLocksQueryVariables>(GetUserLocksDocument, options);
        }
export type GetUserLocksQueryHookResult = ReturnType<typeof useGetUserLocksQuery>;
export type GetUserLocksLazyQueryHookResult = ReturnType<typeof useGetUserLocksLazyQuery>;
export type GetUserLocksSuspenseQueryHookResult = ReturnType<typeof useGetUserLocksSuspenseQuery>;
export type GetUserLocksQueryResult = Apollo.QueryResult<GetUserLocksQuery, GetUserLocksQueryVariables>;
export const GetLockDocument = gql`
    query GetLock($lockAddress: String!) {
  Lock(where: {lockAddress: {_eq: $lockAddress}}) {
    id
    token
    owner
    lockingAmount
    lockTimeEnd
    projectImageUrl
    createdAt
    lockAddress
  }
}
    `;

/**
 * __useGetLockQuery__
 *
 * To run a query within a React component, call `useGetLockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLockQuery({
 *   variables: {
 *      lockAddress: // value for 'lockAddress'
 *   },
 * });
 */
export function useGetLockQuery(baseOptions: Apollo.QueryHookOptions<GetLockQuery, GetLockQueryVariables> & ({ variables: GetLockQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLockQuery, GetLockQueryVariables>(GetLockDocument, options);
      }
export function useGetLockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLockQuery, GetLockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLockQuery, GetLockQueryVariables>(GetLockDocument, options);
        }
export function useGetLockSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLockQuery, GetLockQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLockQuery, GetLockQueryVariables>(GetLockDocument, options);
        }
export type GetLockQueryHookResult = ReturnType<typeof useGetLockQuery>;
export type GetLockLazyQueryHookResult = ReturnType<typeof useGetLockLazyQuery>;
export type GetLockSuspenseQueryHookResult = ReturnType<typeof useGetLockSuspenseQuery>;
export type GetLockQueryResult = Apollo.QueryResult<GetLockQuery, GetLockQueryVariables>;