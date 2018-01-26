import React, { Component } from 'react'
import { SecureStore } from 'expo'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { View } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import * as queries from '../apollo/queries'
import Upload from '../components/Upload'

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
      file {
        url
      }
    }
  }
`

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      phoneNumber: '',
      fileId: null, 
      error: null,
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
      <Upload uploadHandler={(err, upload) => {
        if (err) {
          this.setState({ error: err })
        } else {
          this.setState({ fileId: upload.id }) 
        } 
      }} />
        <Button
          icon={{ name: 'save' }}
          title={'Save'}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          displayName="Post"
          onPress={async () => {
            const { displayName, fileId } = this.state
            await this.props.updateUser({
              variables: {
                input: {
                  displayName,
                  fileId
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
              this.setState({ error: err })
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
