import { ApolloClient, InMemoryCache, type DefaultOptions, ApolloLink, createHttpLink, concat } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { createAuth0Client, type Auth0Client } from '@auth0/auth0-spa-js';

const cache = new InMemoryCache()

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin
  }
};

let auth0: Auth0Client;
createAuth0Client(auth0Config).then((client) => {
  auth0 = client;
});

const contextLink = setContext(async (_, { headers, ...context }) => {
  const token = localStorage.getItem('auth:token');
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    ...context,
  };
});

const httpLink = createHttpLink({ uri: import.meta.env.VITE_GRAFBASE_API_URL });

export const apolloClient = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_GRAFBASE_API_URL,
  link: concat(contextLink, httpLink),
  defaultOptions: defaultOptions,
  /*
    Add this line if you want to ignore Auth and go for Grafbase API KEY Authentication
    headers:{
        'x-api-key': import.meta.env.VITE_GRAFBASE_API_KEY
    },
   */
})