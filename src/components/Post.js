import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-elements'
import constants from '../constants'
import { Like, TimeStamp, UserSummary, Image } from './'
import get from 'lodash/get'

export default ({ id, title, likes, createdAt, price, files, user }) => {
  return (
    <ScrollView>
      <UserSummary {...user} />
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: files && get(files, '[0].url') }} />
      </View>
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
        <TimeStamp createdAt={createdAt} />
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
    </ScrollView>
  )
}
