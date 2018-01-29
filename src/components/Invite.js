import React from 'react'
import { View, Linking } from 'react-native'
import { Button } from 'react-native-elements'
import constants from '../constants'

export default ({ phoneNumber }) => {
  return (
    <View>
      <Button
        buttonStyle={{ backgroundColor: constants.theme.colors.blue }}
        onPress={() => {
          Linking.openURL(
            `whatsapp://send?phone=${phoneNumber}&text=${
              constants.INVITE_MESSAGE
            }&uri=http://flippa.co.za`
          )
        }}
        title={'Invite'}
      />
    </View>
  )
}
