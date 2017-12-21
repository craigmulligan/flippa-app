import React, { Component } from 'react'
import { SecureStore } from 'expo'
import { FormLabel, FormInput } from 'react-native-elements'
import { View } from 'react-native'
import constants from '../../constants'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const VerifyMutation = gql`
  mutation($phoneNumber: String!, $verificationCode: String!) {
    verifyCode(phoneNumber: $phoneNumber, verificationCode: $verificationCode)
  }
`

class Verify extends Component {
  constructor(props) {
    super()
    this.state = {
      phoneNumber: props.navigation.state.params.phoneNumber,
      verificationCode: ''
    }
  }

  static navigationOptions = {
    headerMode: 'float'
  }

  setVerificationCode = async value => {
    this.setState({ verificationCode: value })
    if (value.length === constants.verificationCodeLength) {
      try {
        const { data } = await this.props.mutate({
          variables: {
            phoneNumber: this.state.phoneNumber,
            verificationCode: value
          }
        })
        await SecureStore.setItemAsync('token', data.verifyCode)

        this.props.navigation.navigate('App')
      } catch (err) {
        // console.log(err)
      }
    }
  }

  render() {
    return (
      <View>
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

export default graphql(VerifyMutation)(Verify)
