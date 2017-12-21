import React from 'react'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { List } from '../components'
import { posts_per_page } from '../../constants'
import { StackNavigator } from 'react-navigation'
import Grid from './Grid'
import Post from './Post'
import Store from '../Profile/Store'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const ExploreNav = StackNavigator(
  {
    Grid: {
      screen: Grid
    },
    Post: {
      screen: Post,
      path: '/Post/:id'
    },
    Store: {
      screen: Store,
      path: '/Store/:id'
    }
  },
  {
    initialroutename: 'Grid'
  }
)

Grid.navigationOptions = {
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: () => <Icon name="explore" />
}

export default Grid 
