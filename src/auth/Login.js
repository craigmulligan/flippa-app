import React, { Component } from 'react'
import { FormLabel, FormInput, Text } from 'react-native-elements'
import { View, StyleSheet, Platform } from 'react-native'
import PhoneNumber from 'awesome-phonenumber'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import CountryPicker from 'react-native-country-picker-modal'

const styles = StyleSheet.create({
  wrapper: { 
    flexDirection: 'row',
    alignItems:'center',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20
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
      <View style={styles.container}>
        <Text h2>Welcome to Flippa</Text>
        <View style={styles.wrapper}>
          <CountryPicker
            style={styles.countryPicker} 
            onChange={value => {
              this.setState({ cca2: value.cca2, callingCode: value.callingCode })
            }}
            cca2={this.state.cca2}
            filterable
          />
          <FormInput
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'} 
            shake={this.props.error}  
            blur={this.props.loading} 
            autoFocus
            value={`+${this.state.callingCode}${this.state.phoneNumber}`}
            onChangeText={this.setPhoneNumber}
            placeholder={'Phone number ... '}
          />
        </View>
      </View>
    )
  }
}

export default graphql(LoginMutation)(Login)
