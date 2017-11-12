import React from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import PhoneNumber from 'awesome-phonenumber'

class Auth extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      step: 0,
      phoneNumber: null,
      verificationCode: null
    }
  }

  setPhoneNumber = (value) => {
    const pn = PhoneNumber(value)
    if (pn.isValid()) {
      this.setState({ step: 1 })
    }
    this.setState({ phoneNumber: value })
  }

  setVerificationCode = (value) => {
    this.setState({ verificationCode: value })
  }

  render() {
    return (
      <View style={{ padding: 25 }}>
        <FormLabel>Enter phone number:</FormLabel>
        <FormInput
          value={this.state.phoneNumber}
          onChangeText={this.setPhoneNumber}
          placeholder={'Phone number ... '}
        />
        <FormLabel>Enter verificationCode:</FormLabel>
        <FormInput
          value={this.state.verificationCode}
          onChangeText={this.setVerificationCode}
          placeholder={'Verification Code'}
        />
      </View>
    )
  }
}

export default Auth
