import React from 'react'
import { View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TimeStamp } from '../utils'

export default withNavigation(({ actor, post, navigation, createdAt }) => {
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
        <Text>&nbsp;liked&nbsp;</Text>
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
      <TimeStamp createdAt={createdAt} />
    </View>
  )
})
