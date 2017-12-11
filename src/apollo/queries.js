import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser @client {
      phoneNumber
      id 
      displayName
      createdAt
    }
  }
`

export const UPDATE_CURRENT_USER = gql`
  mutation($user: User) {
    updateCurrentUser(user: $user) @client
  }
`

export const LOGOUT = gql`
  mutation {
    logout @client
  }
`
