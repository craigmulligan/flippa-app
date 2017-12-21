import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Post } from '../utils'
import { View } from 'react-native'

const P = props => (
  <View>
    <Post {...props} />
  </View>
)
export default graphql(
  gql`
    query Post($id: ID) {
      Post(id: $id) {
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
    options: ({ navigation }) => {
      return {
        variables: {
          id: navigation.state.params.id
        }
      }
    },
    props: ({ ownProps, data: { loading, Post, refetch } }) => {
      return Post
    }
  }
)(P)
