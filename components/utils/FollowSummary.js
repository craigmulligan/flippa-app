import React from 'react'
import { Avatar, Text } from 'react-native-elements'
import { View, Button, StyleSheet } from 'react-native'

export default ({ followers, following }) => {
  return (
    <View
      style={{
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Text>
        <Text h4>{followers && followers.length}</Text>
        <Text style={styles.textSmall}> Followers </Text>
        <Text h4>{following && following.length}</Text>
        <Text style={styles.textSmall}> Following</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 12
  }
})
