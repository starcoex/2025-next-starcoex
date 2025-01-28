import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  DateTime: { input: any; output: any; }
};

export type Avatars = {
  __typename?: 'Avatars';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  public_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type CardInput = {
  cvc: Scalars['String']['input'];
  expMonth: Scalars['Float']['input'];
  expYear: Scalars['Float']['input'];
  number: Scalars['String']['input'];
};

export type CreateChargeInput = {
  amount: Scalars['Float']['input'];
  card: CardInput;
};

export type CreatePaymentInput = {
  impUid?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReservationInput = {
  endDate: Scalars['DateTime']['input'];
  payment: CreateChargeInput;
  startDate: Scalars['DateTime']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation?: InputMaybe<Scalars['String']['input']>;
  phone_number: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  access_token?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type ForgotPasswordOutput = {
  __typename?: 'ForgotPasswordOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  access_token?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type LogoutInput = {
  id: Scalars['Int']['input'];
};

export type MeUserOutput = {
  __typename?: 'MeUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPayment: Payment;
  createReservation: Reservation;
  createUser: User;
  createUserGql: CreateUserOutput;
  forgotPassword: ForgotPasswordOutput;
  logOut: LoginOutput;
  loginGraphql: LoginOutput;
  refreshGraphql: TokensOutput;
  removePayment: Payment;
  removeReservation: Reservation;
  removeUserGql: User;
  resetPassword: ResetPasswordOutput;
  updatePayment: Payment;
  updateReservation: Reservation;
  updateUserGql: UpdateOutput;
  verifyEmailGql: VerityEmailOutput;
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateReservationArgs = {
  createReservationInput: CreateReservationInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateUserGqlArgs = {
  createUserInput: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationLogOutArgs = {
  logoutInput: LogoutInput;
};


export type MutationLoginGraphqlArgs = {
  loginInput: LoginInput;
};


export type MutationRefreshGraphqlArgs = {
  refresh_token: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationRemovePaymentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveReservationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationUpdatePaymentArgs = {
  updatePaymentInput: UpdatePaymentInput;
};


export type MutationUpdateReservationArgs = {
  updateReservationInput: UpdateReservationInput;
};


export type MutationUpdateUserGqlArgs = {
  updateInput: UpdateInput;
};


export type MutationVerifyEmailGqlArgs = {
  verifyEmailInput: VerityEmailInput;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  impUid?: Maybe<Scalars['String']['output']>;
  merchantUid: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  paidAt: Scalars['DateTime']['output'];
  paymentStatus: PaymentStatus;
};

export enum PaymentStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Paid = 'PAID',
  Ready = 'READY'
}

export type Query = {
  __typename?: 'Query';
  meGql: MeUserOutput;
  payment: Payment;
  payments: Array<Payment>;
  reservation: Reservation;
  reservations: Array<Reservation>;
  user: User;
  users: Array<User>;
};


export type QueryPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReservationArgs = {
  id: Scalars['Int']['input'];
};

export type Reservation = {
  __typename?: 'Reservation';
  created_at: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  timestamp: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type ResetPasswordInput = {
  activation_code?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type ResetPasswordOutput = {
  __typename?: 'ResetPasswordOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type TokensOutput = {
  __typename?: 'TokensOutput';
  access_token?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
};

export type UpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOutput = {
  __typename?: 'UpdateOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UpdatePaymentInput = {
  id: Scalars['Int']['input'];
  impUid?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReservationInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  payment?: InputMaybe<CreateChargeInput>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User = {
  __typename?: 'User';
  access_token?: Maybe<Scalars['String']['output']>;
  avatars?: Maybe<Avatars>;
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  passwordConfirmation?: Maybe<Scalars['String']['output']>;
  phone_number: Scalars['String']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  updated_at: Scalars['DateTime']['output'];
};

export type VerityEmailInput = {
  activation_code: Scalars['String']['input'];
  activation_token: Scalars['String']['input'];
};

export type VerityEmailOutput = {
  __typename?: 'VerityEmailOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type VerifyEmailGqlMutationVariables = Exact<{
  verifyEmailInput: VerityEmailInput;
}>;


export type VerifyEmailGqlMutation = { __typename?: 'Mutation', verifyEmailGql: { __typename?: 'VerityEmailOutput', ok: boolean, error?: string | null } };

export type CreateUserGqlMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserGqlMutation = { __typename?: 'Mutation', createUserGql: { __typename?: 'CreateUserOutput', access_token?: string | null, ok: boolean, error?: string | null, refresh_token?: string | null, user?: { __typename?: 'User', name: string, email: string, phone_number: string } | null } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', access_token?: string | null, email: string, id: number, name: string, phone_number: string, refresh_token?: string | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, id: number, access_token?: string | null, phone_number: string, refresh_token?: string | null, name: string }> };

export type LoginGraphqlMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginGraphqlMutation = { __typename?: 'Mutation', loginGraphql: { __typename?: 'LoginOutput', access_token?: string | null, error?: string | null, refresh_token?: string | null, ok: boolean, user?: { __typename?: 'User', name: string, email: string, access_token?: string | null, refresh_token?: string | null, phone_number: string, id: number } | null } };

export type MeGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type MeGqlQuery = { __typename?: 'Query', meGql: { __typename?: 'MeUserOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', name: string, id: number, email: string, phone_number: string, refresh_token?: string | null } | null } };

export type RefreshGraphqlMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshGraphqlMutation = { __typename?: 'Mutation', refreshGraphql: { __typename?: 'TokensOutput', access_token?: string | null, error?: string | null, ok: boolean, refresh_token?: string | null } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', access_token?: string | null, email: string, id: number, name: string, phone_number: string, refresh_token?: string | null } };


export const VerifyEmailGqlDocument = gql`
    mutation VerifyEmailGql($verifyEmailInput: VerityEmailInput!) {
  verifyEmailGql(verifyEmailInput: $verifyEmailInput) {
    ok
    error
  }
}
    `;
export type VerifyEmailGqlMutationFn = Apollo.MutationFunction<VerifyEmailGqlMutation, VerifyEmailGqlMutationVariables>;

/**
 * __useVerifyEmailGqlMutation__
 *
 * To run a mutation, you first call `useVerifyEmailGqlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailGqlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailGqlMutation, { data, loading, error }] = useVerifyEmailGqlMutation({
 *   variables: {
 *      verifyEmailInput: // value for 'verifyEmailInput'
 *   },
 * });
 */
export function useVerifyEmailGqlMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailGqlMutation, VerifyEmailGqlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailGqlMutation, VerifyEmailGqlMutationVariables>(VerifyEmailGqlDocument, options);
      }
export type VerifyEmailGqlMutationHookResult = ReturnType<typeof useVerifyEmailGqlMutation>;
export type VerifyEmailGqlMutationResult = Apollo.MutationResult<VerifyEmailGqlMutation>;
export type VerifyEmailGqlMutationOptions = Apollo.BaseMutationOptions<VerifyEmailGqlMutation, VerifyEmailGqlMutationVariables>;
export const CreateUserGqlDocument = gql`
    mutation CreateUserGql($createUserInput: CreateUserInput!) {
  createUserGql(createUserInput: $createUserInput) {
    access_token
    ok
    error
    refresh_token
    user {
      name
      email
      phone_number
    }
  }
}
    `;
export type CreateUserGqlMutationFn = Apollo.MutationFunction<CreateUserGqlMutation, CreateUserGqlMutationVariables>;

/**
 * __useCreateUserGqlMutation__
 *
 * To run a mutation, you first call `useCreateUserGqlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserGqlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserGqlMutation, { data, loading, error }] = useCreateUserGqlMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserGqlMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserGqlMutation, CreateUserGqlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserGqlMutation, CreateUserGqlMutationVariables>(CreateUserGqlDocument, options);
      }
export type CreateUserGqlMutationHookResult = ReturnType<typeof useCreateUserGqlMutation>;
export type CreateUserGqlMutationResult = Apollo.MutationResult<CreateUserGqlMutation>;
export type CreateUserGqlMutationOptions = Apollo.BaseMutationOptions<CreateUserGqlMutation, CreateUserGqlMutationVariables>;
export const UserDocument = gql`
    query User {
  user {
    access_token
    email
    id
    name
    phone_number
    refresh_token
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    email
    id
    access_token
    phone_number
    refresh_token
    name
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginGraphqlDocument = gql`
    mutation LoginGraphql($loginInput: LoginInput!) {
  loginGraphql(loginInput: $loginInput) {
    access_token
    error
    refresh_token
    ok
    user {
      name
      email
      access_token
      refresh_token
      phone_number
      id
    }
  }
}
    `;
export type LoginGraphqlMutationFn = Apollo.MutationFunction<LoginGraphqlMutation, LoginGraphqlMutationVariables>;

/**
 * __useLoginGraphqlMutation__
 *
 * To run a mutation, you first call `useLoginGraphqlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGraphqlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGraphqlMutation, { data, loading, error }] = useLoginGraphqlMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginGraphqlMutation(baseOptions?: Apollo.MutationHookOptions<LoginGraphqlMutation, LoginGraphqlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginGraphqlMutation, LoginGraphqlMutationVariables>(LoginGraphqlDocument, options);
      }
export type LoginGraphqlMutationHookResult = ReturnType<typeof useLoginGraphqlMutation>;
export type LoginGraphqlMutationResult = Apollo.MutationResult<LoginGraphqlMutation>;
export type LoginGraphqlMutationOptions = Apollo.BaseMutationOptions<LoginGraphqlMutation, LoginGraphqlMutationVariables>;
export const MeGqlDocument = gql`
    query MeGql {
  meGql {
    ok
    error
    user {
      name
      id
      email
      phone_number
      refresh_token
    }
  }
}
    `;

/**
 * __useMeGqlQuery__
 *
 * To run a query within a React component, call `useMeGqlQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeGqlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeGqlQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeGqlQuery(baseOptions?: Apollo.QueryHookOptions<MeGqlQuery, MeGqlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeGqlQuery, MeGqlQueryVariables>(MeGqlDocument, options);
      }
export function useMeGqlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeGqlQuery, MeGqlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeGqlQuery, MeGqlQueryVariables>(MeGqlDocument, options);
        }
export function useMeGqlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeGqlQuery, MeGqlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeGqlQuery, MeGqlQueryVariables>(MeGqlDocument, options);
        }
export type MeGqlQueryHookResult = ReturnType<typeof useMeGqlQuery>;
export type MeGqlLazyQueryHookResult = ReturnType<typeof useMeGqlLazyQuery>;
export type MeGqlSuspenseQueryHookResult = ReturnType<typeof useMeGqlSuspenseQuery>;
export type MeGqlQueryResult = Apollo.QueryResult<MeGqlQuery, MeGqlQueryVariables>;
export const RefreshGraphqlDocument = gql`
    mutation RefreshGraphql($userId: Float!, $refreshToken: String!) {
  refreshGraphql(userId: $userId, refresh_token: $refreshToken) {
    access_token
    error
    ok
    refresh_token
  }
}
    `;
export type RefreshGraphqlMutationFn = Apollo.MutationFunction<RefreshGraphqlMutation, RefreshGraphqlMutationVariables>;

/**
 * __useRefreshGraphqlMutation__
 *
 * To run a mutation, you first call `useRefreshGraphqlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshGraphqlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshGraphqlMutation, { data, loading, error }] = useRefreshGraphqlMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshGraphqlMutation(baseOptions?: Apollo.MutationHookOptions<RefreshGraphqlMutation, RefreshGraphqlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshGraphqlMutation, RefreshGraphqlMutationVariables>(RefreshGraphqlDocument, options);
      }
export type RefreshGraphqlMutationHookResult = ReturnType<typeof useRefreshGraphqlMutation>;
export type RefreshGraphqlMutationResult = Apollo.MutationResult<RefreshGraphqlMutation>;
export type RefreshGraphqlMutationOptions = Apollo.BaseMutationOptions<RefreshGraphqlMutation, RefreshGraphqlMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    access_token
    email
    id
    name
    phone_number
    refresh_token
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;