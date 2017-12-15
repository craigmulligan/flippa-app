import React from 'react'
import { Text, View } from 'react-native'
import { Divider, Card, Button, Icon } from 'react-native-elements'
import Image from './Image'
import Profile from './Profile'
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
        backgroundColor: '#FFFFFF'
      }}
    >
      <Profile {...user} />
      <Text>{title}</Text>
      <Text style={{ marginBottom: 10 }}>{description}</Text>
      <Image source={{ uri: files[0] && files[0].url }} />
      <Like likes={likes} id={id} />
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 15,
          marginRight: 15
        }}
      >
        <Text>{createdAt && distanceInWordsToNow(Date.parse(createdAt))}</Text>
        <Text>{price}</Text>
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
