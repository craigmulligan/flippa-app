import React from 'react'
import { Avatar } from 'react-native-elements'
import { View, Text, TouchableOpacity } from 'react-native'
// we don't use connect because that causes side effects we rendering App.js
import store from '../../src/redux'
import get from 'lodash/get'
import { graphql } from 'react-apollo' 
import gql from 'graphql-tag'

const User_QUERY = gql`
  query UserQuery($id: ID) { 
    User(id: $id) {
      phoneNumber
      displayName
      file {
        url
      }
      id
    }
  }
`

const UserSummary = ({ data, id }) => {
  const displayName = get(data, 'User.displayName')
  return (
    <TouchableOpacity
      onPress={() => {
        store.getState().navigation.rootNavigation.navigate(`Store`, {
          id
        })
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10
        }}
      >
        <Avatar
          small
          rounded
          source={{ uri: get(data, 'User.file.url') }}
          title={displayName && displayName.slice(0, 2).toUpperCase()}
          activeOpacity={0.7}
        />
        <View
          style={{
            marginLeft: 5
          }}
        >
          <Text>{displayName}</Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 12
            }}
          >
            {get(data, 'User.phoneNumber')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default graphql(User_QUERY, {
  options: ({ id }) => ({ variables: { id } })
})(UserSummary)
