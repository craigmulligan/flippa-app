import React from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Icon } from 'react-native-elements'

import constants from '../constants'

export default ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon iconStyle={styles.text} name="camera" size={20} />
        <Text style={styles.text}>Upload Image</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.theme.colors.grayDark,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 5
  },
  text: {
    color: 'white'
  }
})
