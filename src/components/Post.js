import React from 'react'
import { View, ScrollView, Linking } from 'react-native'
import { Text, Button } from 'react-native-elements'
import constants from '../constants'
import { Like, TimeStamp, UserSummary, Image } from './'
import get from 'lodash/get'
import { getCurrentUser } from '../apollo/client'
import store from '../redux'

const getMessage = ({ title, id }) =>
  `Hey I'm really interested in your flippa post - ${title}! https://flippa.co.za/posts/${id}`

export default ({ id, title, likes, createdAt, price, files, user }) => {
  const msg = getMessage({ title, id })
  return (
    <ScrollView>
      <UserSummary {...user} />
      <Image files={files} />
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
        {getCurrentUser().id == user.id ? (
          <Button
            containerViewStyle={{
              marginRight: 0
            }}
            onPress={() => {
              store.getState().navigation.rootNavigation.navigate('EditPost', {
                id: id
              })
            }}
            backgroundColor={constants.theme.colors.green}
            title="Edit"
          />
        ) : (
          <Button
            containerViewStyle={{
              marginRight: 0
            }}
            onPress={() => {
              Linking.openURL(
                `whatsapp://send?phone=${
                  user.phoneNumber
                }&text=${msg}&uri=https://facebook.com`
              )
            }}
            backgroundColor={constants.theme.colors.green}
            title="Make an Offer"
          />
        )}
      </View>
    </ScrollView>
  )
}
