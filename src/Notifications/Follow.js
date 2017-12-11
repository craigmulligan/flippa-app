import React from 'react'
import { View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TimeStamp } from '../components'

export default withNavigation(({ actor, navigation, createdAt }) => {
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
          {actor.displayName || actor.phoneNumber}&nbsp;
        </Text>
        <Text>followed you</Text>
      </Text>
      <TimeStamp createdAt={createdAt} />
    </View>
  )
})
