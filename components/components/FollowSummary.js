import React from 'react'
import { Text } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'

export default ({ followers, following }) => {
  return (
    <View style={styles.container}>
      <Text>
        <Text h4>{followers && followers.length}</Text>
        <Text style={styles.textSmall}> Followers </Text>
      </Text>
      <Text>
        <Text h4>{following && following.length}</Text>
        <Text style={styles.textSmall}> Following</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 12
  },
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%'
  }
})
