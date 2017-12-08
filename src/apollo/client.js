import { SecureStore } from 'expo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'

import constants from '../../constants'

// cache token so we don't have to look up for every request
let token
const withToken = setContext(async (operation, { headers }) => {
  if (!token) {
    token = await SecureStore.getItemAsync('token')
  }

  // console.log('op', operation)
  // console.log('headers', headers)
  // console.log('req', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    // remove cached token on 401 from the server
    token = null
  }
})

const debugLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // do response debugging here
    return response
  })
})

const client = new ApolloClient({
  link: from([
    withToken.concat(resetToken),
    debugLink,
    new HttpLink({ uri: constants.api })
  ]),
  cache: new InMemoryCache()
})

export default client
