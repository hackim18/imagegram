import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

// const client = new ApolloClient({
//   uri: "https://dbd5-2a09-bac5-3a57-88c-00-da-89.ngrok-free.app/",
//   cache: new InMemoryCache(),
// });
// export default client;

const httpLink = createHttpLink({
  // uri: "https://08c7-182-3-70-123.ngrok-free.app/",
  uri: "https://imagegram.hackimtech.com/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
