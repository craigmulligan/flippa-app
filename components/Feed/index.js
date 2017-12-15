import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon, SearchBar } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import List from './List'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/
const POSTS_PER_PAGE = 10

const PostList = props => {
  return <List {...props} />
}

PostList.navigationOptions = {
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor }) => <Icon name="home" />
}

export default graphql(
  gql`
    query PostList($limit: Int, $offset: Int) {
      Posts(limit: $limit, offset: $offset) {
        id
        title
        description
        price
        createdAt
        likes {
          id
        }
        user {
          id
          displayName
          phoneNumber
        }
        files {
          id
          url
        }
      }
    }
  `,
  {
    options: {
      variables: {
        offset: 0,
        limit: POSTS_PER_PAGE
      }
    }
  }
)(PostList)
