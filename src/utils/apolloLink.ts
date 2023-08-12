import { ApolloClient, InMemoryCache } from '@apollo/client/core'


const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_GRAFBASE_API_URL,
  headers:{
    'x-api-key': ``
  }
})


