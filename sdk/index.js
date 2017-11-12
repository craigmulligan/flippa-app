import gql from 'graphql-tag'

export const listUsers = gql`
  query ListUsers {
    Users {
      id
      phoneNumber
    }
  }
`
