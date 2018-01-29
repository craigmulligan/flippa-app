import React, { Component } from 'react'
import { FormInput, Text } from 'react-native-elements'
import { View, StyleSheet, Platform, Dimensions } from 'react-native'
import PhoneNumber from 'awesome-phonenumber'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import CountryPicker from 'react-native-country-picker-modal'
import { theme } from '../constants'
import { compose } from 'react-apollo'
import * as queries from '../apollo/queries'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  countryPicker: {
    marginRight: 20
  },
  input: {
    width: width - 100,
    fontSize: 20
  },
  inputContainer: {
    marginRight: 0,
    marginLeft: 0
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: 20
  },
  welcomeText: {
    justifyContent: 'center'
  },
  footerText: {
    color: theme.colors.gray
  }
})

const LOGIN_MUTATION = gql`
  mutation($phoneNumber: String!) {
    login(phoneNumber: $phoneNumber)
  }
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      cca2: 'GB',
      callingCode: '44',
      error: null
    }
  }

  static navigationOptions = {
    // hide header on login page
    header: null
  }

  setPhoneNumber = async value => {
    const num = value.slice(this.state.callingCode.length + 1)
    this.setState({ phoneNumber: num })

    const pn = PhoneNumber(value, this.state.cca2)
    if (pn.isValid()) {
      try {
        await this.props.updateCurrentUser({
          variables: {
            user: {
              phoneNumber: value
            }
          }
        })

        await this.props.login({
          variables: { phoneNumber: value }
        })

        this.props.navigation.navigate('Verify')
      } catch (err) {
        console.log(err)
        this.setState({ error: err })
        setTimeout(() => this.setState({ error: null }), 2000)
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText} h4>
          What's your phone number?
        </Text>
        <View style={styles.wrapper}>
          <View style={styles.countryPicker}>
            <CountryPicker
              countryList={['GB', 'ZA']}
              onChange={value => {
                this.setState({
                  cca2: value.cca2,
                  callingCode: value.callingCode
                })
              }}
              cca2={this.state.cca2}
              filterable
            />
          </View>
          <FormInput
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            shake={this.state.error}
            blur={this.props.loading}
            autoFocus
            value={`+${this.state.callingCode}${this.state.phoneNumber}`}
            onChangeText={this.setPhoneNumber}
            placeholder={'Phone number ... '}
            containerStyle={styles.inputContainer}
            inputStyle={[
              styles.input,
              { color: this.state.error ? theme.colors.red : null }
            ]}
          />
        </View>
        <View>
          <Text style={styles.footerText}>
            We will send you an SMS to confirm your phone number. Message &amp;
            data rates may apply.
          </Text>
        </View>
      </View>
    )
  }
}

export default compose(
  graphql(LOGIN_MUTATION, { name: 'login' }),
  graphql(queries.UPDATE_CURRENT_USER, { name: 'updateCurrentUser' })
)(Login)
