import React, { Component } from 'react'
import { SecureStore } from 'expo'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { View } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import * as queries from '../apollo/queries'
console.log(queries.LOGOUT)

const updateUserMutation = gql`
  mutation($input: UserInput!) {
    updateUser(input: $input) {
      displayName
    }
  }
`

const userQuery = gql`
  {
    User {
      id
      displayName
      phoneNumber
      avatar
    }
  }
`

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      phoneNumber: '',
      edit: false
    }
  }

  static navigationOptions = {
    tabBarIcon: () => {
      return <Icon name="person" />
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.data.User)
  }

  render() {

    console.log(this.props.logout)
    return (
      <View>
        <FormLabel>Store Name</FormLabel>
        <FormInput
          value={this.state.displayName}
          onChangeText={value => this.setState({ displayName: value })}
          placeholder={'displayName ... '}
        />
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          value={this.state.phoneNumber}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'PhoneNumber... '}
        />
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          displayName="Post"
          onPress={async () => {
            const { displayName } = this.state
            await this.props.updateUser({
              variables: {
                input: {
                  displayName
                }
              },
              refetchQueries: ['User']
            })
            this.props.navigation.navigate('Profile')
          }}
        />
        <Button
          title="Logout"
          onPress={async () => {
            try {
              await this.props.logout() 
              await this.props.navigation.navigate('Login')
            } catch (err) {
              console.log(err)
            }
          }}
        />
      </View>
    )
  }
}

export default compose(
  graphql(updateUserMutation, { name: 'updateUser' }),
  graphql(userQuery),
  graphql(queries.LOGOUT, { name: 'logout' })
)(Profile)
