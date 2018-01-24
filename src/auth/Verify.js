import React, { Component } from 'react'
import { SecureStore } from 'expo'
import { FormLabel, FormInput } from 'react-native-elements'
import { View, StyleSheet, Platform, Text } from 'react-native'
import constants from '../constants'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import CodeInput from 'react-native-confirmation-code-input';
import { theme } from '../constants'

const VerifyMutation = gql`
  mutation($phoneNumber: String!, $verificationCode: String!) {
    verifyCode(phoneNumber: $phoneNumber, verificationCode: $verificationCode)
  }
`

const styles = StyleSheet.create({
  center: { 
    alignItems:'center',
    justifyContent: 'center',
  }, 
  errorText: {
    color: theme.colors.red
  }
})

class Verify extends Component {
  constructor(props) {
    super()
    this.state = {
      phoneNumber: props.navigation.state.params.phoneNumber,
      verificationCode: '',
      error: '' 
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
        this.setState({ error: err })
        setTimeout(() => {
          this.setState({ error: null })
        }, 2000)
      }
    }
  }

  render() {
    return (
      <View>
        {
          !!this.state.error && 
          <View style={styles.center}>
            <Text style={styles.errorText}>
              Oops something went wrong, please try again
            </Text>
          </View>
        }
        <View>
          <CodeInput
            secureTextEntry
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'} 
            codeLength={4}
            space={10}
            size={70}
            activeColor={theme.colors.blueDark}
            inactiveColor={this.state.error ? theme.colors.red : theme.colors.gray}
            onFulfill={(code) => this.setVerificationCode(code)}
          />
        </View> 
      </View>
    )
  }
}

export default graphql(VerifyMutation)(Verify)
