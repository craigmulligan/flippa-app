import React from 'react'
import { FormLabel, FormInput } from 'react-native-elements'
import { View } from 'react-native'

export default ({ phoneNumber, setPhoneNumber }) => {
  return (
    <View>
      <FormLabel>Enter phone number:</FormLabel>
      <FormInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder={'Phone number ... '}
      />
    </View>
  )
}
