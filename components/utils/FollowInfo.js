import React from 'react'
import { Avatar } from 'react-native-elements'
import { View, Text, Button } from 'react-native'

export default ({ followers, following }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Text>Followers {followers && followers.length}</Text>
      <Text>Following {following && following.length}</Text>
    </View>
  )
}
