import React from 'react'
import Expo from 'expo'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import PhoneNumber from 'awesome-phonenumber'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Login from '../components/auth/Login.js'
import Verify from '../components/auth/Verify'

class Auth extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      step: 0,
      phoneNumber: '+44',
      verificationCode: null
    }
  }

  setPhoneNumber = async (value) => {
    this.setState({ phoneNumber: value })
    const pn = PhoneNumber(value, 'UK')
    if (pn.isValid()) {
      await this.props.login({
        variables: { phoneNumber: value }
      })
      this.setState({ step: 1 })
    }
  }

  setVerificationCode = async (value) => {
    this.setState({ verificationCode: value })
    if (value.length === 6) {
      try {
        const { data } = await this.props.verify({
          variables: {
            phoneNumber: this.state.phoneNumber,
            verificationCode: value
          }
        })
        await Expo.SecureStore.setItemAsync('token', data.verifyCode)
        this.setState({ step: 2 })
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    switch (this.state.step) {
      case 1:
        return(
          <View>
            <Verify
            verificationCode={this.state.verificationCode}
            setVerificationCode={this.setVerificationCode}
            />
          </View>
        )
      case 2:
        return(
          <View>
            {this.props.children}
          </View>
        )
      default:
        return(
          <View>
            <Login
              phoneNumber={this.state.phoneNumber}
              setPhoneNumber={this.setPhoneNumber}
              />
          </View>
        )
    }
  }
}

const LoginMutation = gql`
  mutation($phoneNumber: String!){
    login(phoneNumber: $phoneNumber)
  }
`

const VerifyMutation =  gql`
  mutation($phoneNumber: String!, $verificationCode: String!){
    verifyCode(phoneNumber: $phoneNumber, verificationCode: $verificationCode)
  }
`

export default compose(
  graphql(LoginMutation, { name: 'login' }),
  graphql(VerifyMutation, { name: 'verify' })
)(Auth);
