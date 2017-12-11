import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import Login from './components/auth/Login'
import Verify from './components/auth/Verify'
import Loading from './components/Loading'
import Feed from './components/Feed'
import Explore from './components/Explore'
import Profile from './components/Profile'
import Sell from './components/Sell'
import Notifications from './components/Notifications'

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
    Sell: {
      screen: Sell
    },
    Notifications: {
      screen: Notifications 
    },
    Store: {
      screen: Profile
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
      showLabel: false,
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
    },
    cardStyle: {
      // https://github.com/react-community/react-navigation/issues/1478
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
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
