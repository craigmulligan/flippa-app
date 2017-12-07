import React from 'react'
import { ApolloProvider } from 'react-apollo'

import Login from './components/auth/Login'
import Verify from './components/auth/Verify'
import Loading from './components/Loading'
import Feed from './components/Feed'
import Explore from './components/Explore'
import Profile from './components/Profile'

import client from './src/apollo/client'

import { StackNavigator, TabNavigator } from 'react-navigation'

const App = TabNavigator(
  {
    Feed: {
      screen: Feed
    },
    Explore: {
      screen: Explore
    },
    Notifications: {
      screen: Explore
    },
    Store: {
      screen: Profile
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63'
    }
  }
)

const RootNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Verify: { screen: Verify },
    App: { screen: App },
    Loading: { screen: Loading }
  },
  {
    initialRouteName: 'Loading',
    navigationOptions: {
      headerMode: 'none'
    }
  }
)

export default class Root extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootNavigator />
      </ApolloProvider>
    )
  }
}
