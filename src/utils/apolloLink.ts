import { ApolloClient, InMemoryCache, type DefaultOptions } from '@apollo/client/core'


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
       
export const apolloClient = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_GRAFBASE_API_URL,
  headers:{
    'x-api-key': import.meta.env.VITE_GRAFBASE_API_KEY
  },
  defaultOptions: defaultOptions,
})


