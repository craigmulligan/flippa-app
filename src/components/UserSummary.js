import React from 'react'
import { Avatar } from 'react-native-elements'
import { View, Text, TouchableOpacity } from 'react-native'
// we don't use connect because that causes side effects we rendering App.js
import store from '../../src/redux'

export default ({ phoneNumber, displayName, id }) => {
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
            {phoneNumber}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
