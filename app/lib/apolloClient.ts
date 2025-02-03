import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { API_AUTH_URL } from "@/app/constants/api";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${API_AUTH_URL}/graphql`,
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      access_token: Cookies.get("access_token"),
      refresh_token: Cookies.get("refresh_token"),
    },
  });
  return forward(operation);
});

const authLink = setContext(async (_, { headers }) => {
  console.log(headers);
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");
  console.log("access_token", access_token);
  console.log("refresh_token", refresh_token);
  return {
    headers: {
      ...headers,
      access_token: access_token,
      refresh_token: refresh_token,
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions?.code == "UNAUTHENTICATED") {
          return new Observable((observer) => {});
        }
      }
    }
    if (networkError) {
      console.log(`Network error: ${networkError}`);
    }
  },
);

// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(({ message, locations, path }) => {
//         console.log(
//           `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,
//         );
//       });
//     }
//     if (networkError) {
//       console.log(`Network error: ${networkError}`);
//     }
//   },
// );

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return false;
            },
          },
        },
      },
    },
  }),
});

export default client;
