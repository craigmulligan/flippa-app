import React from 'react'
import { View, Text } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const UserList = ({ data }) => {
  const loading = data.loading;
  const error = data.error;
  const users = data.Users;

  if (loading) {
    console.log(loading)
  }
  if (error) {
    console.log(error)
  }
  if (users) {
    console.log(users)
  }
  return(
    <View>
      <Text>Hii</Text>
    </View>
  )
}

export default graphql(gql`
  query ListUsers {
    Users {
      id
      phoneNumber
    }
  }
`)(UserList)
