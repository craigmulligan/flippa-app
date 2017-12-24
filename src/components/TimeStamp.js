import React from 'react'
import { Text } from 'react-native-elements'
import { distanceInWordsToNow } from 'date-fns'
import constants from '../constants'

export default ({ createdAt }) => {
  return (
    <Text
      style={{
        fontSize: 12,
        color: constants.theme.colors.grayLight
      }}
    >
      {createdAt && distanceInWordsToNow(Date.parse(createdAt))} ago
    </Text>
  )
}
