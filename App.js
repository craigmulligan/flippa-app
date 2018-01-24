import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import Login from './src/auth/Login'
import Verify from './src/auth/Verify'
import Loading from './src/Loading'
import Feed from './src/Feed'
import Explore from './src/Explore'
import Sell from './src/Sell'
import Notifications from './src/Notifications'
import client from './src/apollo/client'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Store from './src/Profile/Store'
import Post from './src/Explore/Post'
import Edit from './src/Profile/Edit'
import store, { actions } from './src/redux'
import { Provider } from 'react-redux'
import { theme } from './src/constants'
import styles from './src/styles'

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
      screen: Store,
      path: '/profile/:id'
    }
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: 'Explore',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: theme.colors.blue,
      showIcon: true,
      showLabel: false,
      style: styles.tabBar,
      indicatorStyle: {
        backgroundColor: 'transparent'
      }
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
    EditProfile: {
      screen: Edit,
      path: '/profile/:id/edit'
    },
    Loading: { screen: Loading }
  },
  {
    initialRouteName: 'Verify',
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
          <RootNavigator />
        </ApolloProvider>
      </Provider>
    )
  }
}
