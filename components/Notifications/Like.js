import React from 'react'
import { View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'

export default withNavigation(({ actor, post, navigation }) => {
  return (
    <View
      style={{
        padding: 20
      }}
    >
      <Text>
        <Text
          onPress={() => {
            navigation.navigate('Store', { id: actor.id })
          }}
          style={{
            fontWeight: 'bold'
          }}
        >
          {actor.displayName || actor.phoneNumber}
        </Text>
        <Text>liked</Text>
        <Text
          style={{
            fontWeight: 'bold'
          }}
          onpress={() => {
            navigation.navigate('post', { id: post.id })
          }}
        >
          {post.title}
        </Text>
      </Text>
    </View>
  )
})
