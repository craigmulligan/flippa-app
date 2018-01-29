import React from 'react'
import { View } from 'react-native'
import { AppLoading, SecureStore } from 'expo'
import { graphql } from 'react-apollo'
import * as queries from './apollo/queries'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isReady: false
    }
  }

  _checkAuth = async () => {
    const token = await SecureStore.getItemAsync('token')
    if (token) {
      await this.props.updateCurrentUser({
        variables: {
          user: {
            token
          }
        }
      })

      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._checkAuth}
          onFinish={() => this.setState({ isReady: true })}
          onError={() => {}}
        />
      )
    }
    // this should never be rendered
    return <View style={{ flex: 1 }} />
  }
}

export default graphql(queries.UPDATE_CURRENT_USER, {
  name: 'updateCurrentUser'
})(App)
