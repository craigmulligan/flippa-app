import { SecureStore } from 'expo'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import constants from '../constants'
import stateLink, { cache } from './state-link'
import * as queries from './queries'

const addAuthHeader = token => {
  return token
    ? {
      Authorization: `Bearer ${token}`
    }
    : undefined
}

// cache token so we don't have to look up for every request
const withToken = setContext(async (operation, { headers }) => {
  try {
    let token

    if (!token) {
      token = await SecureStore.getItemAsync('token')
    }

    return {
      headers: {
        ...headers,
        ...addAuthHeader(token)
      }
    }
  } catch (err) {
    return 
    console.log(err)
  }
})

const resetToken = onError(async ({ networkError }) => {
  if (networkError && networkError.message.includes('401')) {
    // remove cached token on 401 from the server
    return
  }
  return
})

const debugLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // do response debugging here
    return response
  })
})

const client = new ApolloClient({
  cache,
  link: from([
    withToken.concat(resetToken),
    stateLink,
    createUploadLink({ uri: constants.api })
  ]),
  defaultOptions: {
    watchquery: {
      // errorpolicy: 'ignore' 
    },
    query: {
      // errorPolicy: 'ignore' 
    }
  }
})

export const isCurrentUser = id => {
  try {
    const { currentUser } = cache.readQuery({ query: queries.GET_CURRENT_USER })
    return currentUser.id === Number(id)
  } catch (err) {
    console.error(err)
    return
  }
}

export default client
