import React from 'react'
import { Avatar } from 'react-native-elements'
import { View, Text, TouchableHighlight } from 'react-native'
import { withNavigation } from 'react-navigation'

export default withNavigation(({ displayName, id, navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(`Store`, {
          id
        })
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Avatar small rounded title="MT" activeOpacity={0.7} />
        <Text>{displayName}</Text>
      </View>
    </TouchableHighlight>
  )
})
