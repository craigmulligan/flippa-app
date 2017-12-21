import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import Login from './src/auth/Login'
import Verify from './src/auth/Verify'
import Loading from './src/Loading'
import Feed from './src/Feed'
import Explore from './src/Explore'
import Profile from './src/Profile'
import Sell from './src/Sell'
import Notifications from './src/Notifications'

import { updateFocus } from '@patwoz/react-navigation-is-focused-hoc'
import client from './src/apollo/client'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Store from './src/Profile/Store'
import Post from './src/Explore/Post'
import store, { actions } from './src/redux'
import { Provider } from 'react-redux'

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
    navigationOptions: ({ navigation }) => {
      store.dispatch(
        actions.setNavigation({
          rootNavigation: navigation
        })
      ) 
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
      <Provider store={store}>
      <ApolloProvider client={client}>
      <RootNavigator
      onNavigationStateChange={(prevState, currentState) => {
        updateFocus(currentState)
      }}
      />
      </ApolloProvider>
      </Provider>
    )
  }
}
