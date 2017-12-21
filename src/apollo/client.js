import { SecureStore } from 'expo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import store, { actions } from '../redux'
import constants from '../../constants'

const addAuthHeader = token => {
  return token
    ? {
        Authorization: `Bearer ${token}`
      }
    : undefined
}

// cache token so we don't have to look up for every request
const withToken = setContext(async (operation, { headers }) => {
  let token = store.getState().currentUser.token
  if (!token) {
    token = await SecureStore.getItemAsync('token')
    store.dispatch(actions.setCurrentUser(token))
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
    store.dispatch(actions.deleteCurrentUser)
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

export const isCurrentUser = id => {
  return store.getState().currentUser.id === Number(id)
}

export default client
