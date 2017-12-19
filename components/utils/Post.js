import React from 'react'
import { View } from 'react-native'
import { Text, Divider, Card, Button, Icon } from 'react-native-elements'
import Image from './Image'
import UserSummary from './UserSummary'
import constants from '../../constants'
import Like from './Like'
import { distanceInWordsToNow } from 'date-fns'

export default ({
  id,
  title,
  likes,
  createdAt,
  price,
  description,
  files,
  user
}) => {
  return (
    <View
      style={{
        paddingBottom: 10,
        backgroundColor: '#FFFFFF'
      }}
    >
      <UserSummary {...user} />
      <Image source={{ uri: files[0] && files[0].url }} />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10
        }}
      >
        <View>
          <Text h5>{title}</Text>
          <Text h4>R {price}</Text>
        </View>
    <Text style={{
      fontSize: 12,
      color: constants.theme.colors.grayLight
    }}>
          {createdAt && distanceInWordsToNow(Date.parse(createdAt))} ago
        </Text>
      </View>

      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Like likes={likes} id={id} />
        <Button
          containerViewStyle={{
            marginRight: 0
          }}
          backgroundColor={constants.theme.colors.green}
          title="Make an Offer"
        />
      </View>
    </View>
  )
}
