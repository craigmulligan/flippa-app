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
    id: null
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
          await SecureStore.setItemAsync('token', user.token)
        }

        const data = {
          currentUser: {
            __typename: 'CurrentUser',
            ...user,
            ...tokenData
          }
        }

        cache.writeData({ data })
        return
      },
      logout: async (_, $, { cache }) => {
        await SecureStore.deleteItemAsync('token')
        return
      },
    },
   },
   defaults
})

export default stateLink
