import React, { Component } from 'react'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { View, ScrollView } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import * as queries from '../apollo/queries'
import { Upload } from '../components'
import get from 'lodash/get'
import { getCurrentUser } from '../apollo/client'

const updateUserMutation = gql`
  mutation($input: UserInput!) {
    updateUser(input: $input) {
      displayName
    }
  }
`

const USER_QUERY = gql`
  query userQuery($id: ID) {
    User(id: $id) {
      id
      displayName
      phoneNumber
      file {
        id
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
      loadingSave: false,
      loadingLogout: false,
      uploading: false,
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
      <ScrollView>
        <FormLabel>Store Name {this.props.id}</FormLabel>
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
        <Upload
          multi={false}
          files={[ get(this.state, 'file') ]}
          uploadHandler={(error, files) => {
            if (error) {
              this.setState({ error })
            } else {
              this.setState({ fileId: get(files, '[0].id') })
            }
          }}
        />
        <Button
          icon={{ name: 'save' }}
          title={!this.state.loadingSave && 'Save'}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          loading={this.state.loadingSave}
          displayName="Post"
          disabled={this.state.uploading}
          onPress={async () => {
            try {
              this.setState({ loadingSave: true })
              const { displayName, fileId } = this.state
              await this.props.updateUser({
                variables: {
                  input: {
                    displayName,
                    fileId
                  }
                },
                refetchQueries: ['UserQuery']
              })
              this.setState({ loadingSave: false })
              this.props.navigation.navigate('Profile')
            } catch (error) {
              this.setState({ error, loadingSave: false })
            }
          }}
        />
        <Button
          title="Logout"
          loading={this.state.loadingLogout}
          onPress={async () => {
            try {
              await this.props.logout()
              await this.props.navigation.navigate('Login')
            } catch (err) {
              this.setState({ error: err })
            }
          }}
        />
      </ScrollView>
    )
  }
}

export default compose(
  graphql(updateUserMutation, { name: 'updateUser' }),
  graphql(USER_QUERY, {
    options: () => ({
      variables: {
        id: getCurrentUser().id
      }
    })
  }),
  graphql(queries.LOGOUT, { name: 'logout' })
)(Profile)
