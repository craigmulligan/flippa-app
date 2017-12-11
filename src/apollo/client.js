import { SecureStore } from 'expo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'

import { createUploadLink } from 'apollo-upload-client'

import constants from '../../constants'

const addAuthHeader = token => {
  return token
    ? {
        Authorization: `Bearer ${token}`
      }
    : undefined
}
// cache token so we don't have to look up for every request
let token
const withToken = setContext(async (operation, { headers }) => {
  if (!token) {
    token = await SecureStore.getItemAsync('token')
  }
  return {
    headers: {
      ...headers,
      ...addAuthHeader(token)
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
    createUploadLink({ uri: constants.api })
  ]),
  cache: new InMemoryCache()
})

export default client
