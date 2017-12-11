import React, { Component } from 'react'
import { Text } from 'react-native-elements'
import { View, StyleSheet, Platform } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import CodeInput from 'react-native-confirmation-code-input'
import { theme } from '../constants'
import { compose } from 'react-apollo'
import * as queries from '../apollo/queries'

const VerifyMutation = gql`
  mutation($phoneNumber: String!, $verificationCode: String!) {
    verifyCode(phoneNumber: $phoneNumber, verificationCode: $verificationCode)
  }
`

const GET_CURRENT_USER_PHONE_NUMBER = gql`
  query phoneNumber {
    currentUser @client {
      phoneNumber
    }
  }
`

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center'
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: 20
  },
  errorText: {
    marginTop: 20,
    textAlign: 'center',
    color: theme.colors.red
  }
})

class Verify extends Component {
  constructor() {
    super()
    this.state = {
      error: false,
      success: false
    }
  }

  static navigationOptions = {
    headerMode: 'float'
  }

  setVerificationCode = async value => {
    try {
      const { currentUser } = this.props.data
      const { data } = await this.props.verify({
        variables: {
          phoneNumber: currentUser.phoneNumber,
          verificationCode: value
        }
      })

      this.setState({ success: true })
      await this.props.updateCurrentUser({
        variables: {
          user: {
            token: data.verifyCode
          }
        }
      })

      this.props.navigation.navigate('App')
    } catch (err) {
      this.setState({ error: err })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  getColor = () => {
    if (this.state.success) {
      return theme.colors.green
    }
    if (this.state.error) {
      return theme.colors.red
    }
    return theme.colors.gray
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText} h4>
            What's your verification code?
          </Text>
          {!!this.state.error && (
            <Text style={styles.errorText}>
              Oops something went wrong, please try again
            </Text>
          )}
        </View>
        <View>
          <CodeInput
            secureTextEntry
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            codeLength={4}
            space={10}
            size={70}
            activeColor={theme.colors.blueDark}
            inactiveColor={this.getColor()}
            onFulfill={code => this.setVerificationCode(code)}
          />
        </View>
        <View />
      </View>
    )
  }
}

export default compose(
  graphql(GET_CURRENT_USER_PHONE_NUMBER),
  graphql(queries.UPDATE_CURRENT_USER, { name: 'updateCurrentUser' }),
  graphql(VerifyMutation, { name: 'verify' })
)(Verify)
