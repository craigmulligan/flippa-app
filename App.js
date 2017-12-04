import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View } from 'react-native'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import UserList from './containers/UserList'
import Auth from './containers/Auth'

const gqlEndpoint = 'http://192.168.1.108:4000/api'

const authLink = setContext(async (_, { headers }) => {
  const token = await Expo.SecureStore.getItemAsync('token')
  const ctx = {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri: gqlEndpoint })),
  cache: new InMemoryCache()
})

export default class App extends React.Component {
  state = {
    client: client
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Auth>
            <UserList />
          </Auth>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
