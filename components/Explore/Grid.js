import React from 'react'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { List } from '../utils'
import { posts_per_page } from '../../constants'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const Grid = props => <List grid {...props} />

export default graphql(
  gql`
    query List($limit: Int, $offset: Int) {
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
        limit: posts_per_page
      }
    }
  }
)(Grid)
