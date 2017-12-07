import React from 'react'
import { SecureStore } from 'expo'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const UserList = ({ navigation }) => {
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await SecureStore.deleteItemAsync('token')
          navigation.navigate('Login')
        }}
      />
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
