import React from 'react'
import { FormLabel, FormInput } from 'react-native-elements'
import { View } from 'react-native'

export default ({ setVerificationCode, verificationCode }) => {
  return (
    <View>
      <FormLabel>Enter verificationCode:</FormLabel>
      <FormInput
        value={verificationCode}
        onChangeText={setVerificationCode}
        placeholder={'Verification Code'}
      />
    </View>
  )
}
