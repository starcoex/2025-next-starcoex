import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { API_AUTH_URL } from "@/app/constants/api";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    // errorLink,
    new HttpLink({ uri: `${API_AUTH_URL}/graphql`, credentials: "include" }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
