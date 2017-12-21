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

import { updateFocus } from '@patwoz/react-navigation-is-focused-hoc'
import client from './src/apollo/client'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Store from './components/Profile/Store'
import Post from './components/Explore/Post'
import NavigationProvider from './Providers/RootNavigation'
import withRootNav from './Providers/withRootNav'

console.log(withRootNav)
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
    Profile: {
      screen: Profile,
      path: '/profile/:id'
    }
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: 'Explore',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
      showLabel: false
    }
  }
)

const RootNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Verify: { screen: Verify },
    App: { screen: App },
    Post: {
      screen: Post,
      path: '/Post/:id'
    },
    Store: {
      screen: Store,
      path: '/Store/:id'
    },
    Loading: { screen: Loading }
  },
  {
    initialRouteName: 'Loading',
    navigationOptions: ({navigation}) => {
      withRootNav.update(navigation) 
      return {}
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
        <RootNavigator
          onNavigationStateChange={(prevState, currentState) => {
            updateFocus(currentState)
          }}
        />
      </ApolloProvider>
    )
  }
}
