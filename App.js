import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import UserList from './containers/UserList'
import Auth from './containers/Auth'
import client from './src/apollo/client'

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Auth>
            <UserList />
          </Auth>
        </View>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
