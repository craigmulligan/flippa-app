import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'react-native-elements'

export default ({ message }) => {
  return (
    <View style={{
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon name='tonality' />
      <Text h4>{message || 'Nothing to see here'}</Text>
    </View>
  )
}
