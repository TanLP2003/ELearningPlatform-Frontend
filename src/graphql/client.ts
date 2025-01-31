import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL
const httpLink = new HttpLink({
  uri: `http://${GRAPHQL_URL}/graphql`
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${GRAPHQL_URL}/graphql`
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
