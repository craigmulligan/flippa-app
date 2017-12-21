import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import constants from '../../constants'
import { Like, TimeStamp, UserSummary, Image } from './'

export default ({ id, title, likes, createdAt, price, files, user }) => {
  return (
    <View
      style={{
        paddingBottom: 10,
        backgroundColor: '#FFFFFF'
      }}
    >
      <UserSummary {...user} />
      <View style={{ flex: 1 }}>
        <Image source={{ uri: files && files[0].url }} />
      </View>
      <View style={{ flex: 1 }}>
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
      </View>
    </View>
  )
}
