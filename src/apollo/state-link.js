import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import decode from 'jwt-decode'
import { SecureStore } from 'expo'

export const cache = new InMemoryCache()

const defaults = {
  CurrentUser: {
    __typename: 'CurrentUser',
    phoneNumber: null,
    token: null,
    displayName: null,
    __id: null
  }
}

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateCurrentUser: async (_, { user }, { cache }) => {
        let tokenData = {}

        if (user.token) {
          tokenData = decode(user.token)
          tokenData._id = tokenData.id
          await SecureStore.setItemAsync('token', user.token)
        }

        if (user.id) {
          user._id = user.id
        }

        const data = {
          currentUser: {
            __typename: 'CurrentUser',
            ...user,
            ...tokenData,
            // we only want a single current user so we save the actual id as ._id
            id: 1
          }
        }

        cache.writeData({ data })
        return
      },
      logout: () => {
        return SecureStore.deleteItemAsync('token')
      }
    },
    CurrentUser: {
      id: user => user._id
    }
  },
  defaults
})

export default stateLink
