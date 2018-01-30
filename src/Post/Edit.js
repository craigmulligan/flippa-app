import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import * as queries from '../apollo/queries'
import { PostForm } from '../components'

const UPDATE_POST_MUTATION = gql`
  mutation($input: PostInput!) {
    updatePost(input: $input) {
      id
    }
  }
`

const GET_POST = gql`
  query GET_POST($id: ID) {
    Post(id: $id) {
      id
      title
      description
      price
      files {
        id
        url
      }
    }
  }
`

const DELETE_POST = gql`
  mutation DELETE_POST($id: ID!) {
    deletePost(id: $id)
  }
`

export default compose(
  graphql(UPDATE_POST_MUTATION),
  graphql(GET_POST, {
    options: ({ navigation }) => ({
      variables: {
        id: navigation.state.params.id
      }
    })
  }),
  graphql(DELETE_POST, { name: 'delete' })
)(PostForm)
