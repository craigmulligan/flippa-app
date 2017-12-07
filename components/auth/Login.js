import React, { Component } from 'react'
import { FormLabel, FormInput } from 'react-native-elements'
import { View } from 'react-native'
import PhoneNumber from 'awesome-phonenumber'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const LoginMutation = gql`
  mutation($phoneNumber: String!) {
    login(phoneNumber: $phoneNumber)
  }
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: ''
    }
  }

  static navigationOptions = {
    headerMode: 'float',
    headerLeft: null
  }

  setPhoneNumber = async value => {
    this.setState({ phoneNumber: value })
    const pn = PhoneNumber(value, 'UK')
    if (pn.isValid()) {
      await this.props.mutate({
        variables: { phoneNumber: value }
      })

      this.props.navigation.navigate('Verify', {
        phoneNumber: value
      })
    }
  }

  render() {
    return (
      <View>
        <FormLabel>Enter phone number:</FormLabel>
        <FormInput
          value={this.state.phoneNumber}
          onChangeText={this.setPhoneNumber}
          placeholder={'Phone number ... '}
        />
      </View>
    )
  }
}

export default graphql(LoginMutation)(Login)
