import React, { Component } from 'react'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

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
      phoneNumber: ''
    }
  }
  
  static navigationOptions = {
    tabBarIcon: () => {
      return(<Icon name="person" />)
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.data)
    this.setState(newProps.data.User)
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView>
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
              }
            })
          }}
        />
      </ScrollView>
    )
  }
}

export default compose(
  graphql(updateUserMutation, { name: 'updateUser' }),
  graphql(userQuery)
)(Profile)
