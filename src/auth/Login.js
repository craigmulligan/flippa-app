import React, { Component } from 'react'
import { FormLabel, FormInput, Text } from 'react-native-elements'
import { View, StyleSheet, Platform, Dimensions } from 'react-native'
import PhoneNumber from 'awesome-phonenumber'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import CountryPicker from 'react-native-country-picker-modal'
import { theme } from '../constants'
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: { 
    flexDirection: 'row',
    alignItems:'center',
    padding: 20
  },
  countryPicker: {
    marginRight: 20,
  },
  input: {
    width: (width - 100),
    fontSize: 30
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


const LoginMutation = gql`
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
        await this.props.mutate({
          variables: { phoneNumber: value }
        })

        this.props.navigation.navigate('Verify', {
          phoneNumber: value
        })
      } catch (err) {
        this.setState({ error: err })
        setTimeout(() => this.setState({ error: null }), 2000) 
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText} h4>Welcome to Flippa</Text>
        <View style={styles.wrapper}>
          <View style={styles.countryPicker}>
             <CountryPicker
              countryList={['GB', 'ZA']}
              onChange={value => {
                this.setState({ cca2: value.cca2, callingCode: value.callingCode })
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
            containerStyle={{ marginLeft: 0, marginRight: 0 }} 
            inputStyle={[styles.input, { color: this.state.error ? theme.colors.red : null }]}
          />
        </View>
        <View>
          <Text style={styles.footerText}>By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
        </View>
      </View>
    )
  }
}

export default graphql(LoginMutation)(Login)
