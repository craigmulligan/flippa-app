import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import List from '../utils/List'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

export default graphql(
  gql`
    query LikedPosts($limit: Int, $offset: Int, $filter: JSON) {
      Posts: PostsByLikers(limit: $limit, offset: $offset, filter: $filter) {
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
    options: ({ screenProps }) => ({
      variables: {
        offset: 0,
        limit: 10,
        filter: {
          likers: screenProps.userId
        }
      }
    })
  }
)(List)
