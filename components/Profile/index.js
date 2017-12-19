import React, { Component } from 'react'
import { SecureStore } from 'expo'
import get from 'lodash/get'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { ScrollView, View } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Likes from './Likes'
import Selling from './Selling'
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc'
import PropTypes from 'prop-types'
import { UserSummary, FollowInfo, Follow } from '../utils'

const ProfileNav = TabNavigator(
  {
    Likes: {
      screen: Likes
    },
    Selling: {
      screen: Selling
    }
  },
  {
    // need these settings for the navigator to work
    // https://github.com/react-community/react-navigation/issues/662
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
      activeTintColor: '#e91e63'
    }
  }
)

const updateUserMutation = gql`
  mutation($input: UserInput!) {
    updateUser(input: $input) {
      displayName
    }
  }
`

const userQuery = gql`
  query User($id: ID) {
    User(id: $id) {
      id
      displayName
      phoneNumber
      avatar
      followers {
        id
      }
    }
  }
`

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = props => ({
    tabBarIcon: () => {
      return <Icon name="person" />
    }
  })

  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    focusedRouteKey: PropTypes.string.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.User)
    if (!this.props.isFocused && nextProps.isFocused) {
      // screen enter (refresh data, update ui ...)
    }
    if (this.props.isFocused && !nextProps.isFocused) {
      // on tab dismount we set profile page
      // back to the current user
      this.props.navigation.setParams({
        id: undefined
      })
    }
  }

  render() {
    const { User } = this.props.data
    return (
      <ScrollView>
        <Button
          title="Logout"
          onPress={async () => {
            await SecureStore.deleteItemAsync('token')
            this.props.navigation.navigate('Login')
          }}
        />
        <UserSummary {...User} />
        <FollowInfo {...User} />
        <Follow id={get(User, 'id')} />
        <ProfileNav screenProps={{ userId: get(User, 'id') }} />
      </ScrollView>
    )
  }
}

export default compose(
  withNavigationFocus,
  graphql(updateUserMutation, { name: 'updateUser' }),
  graphql(userQuery, {
    options: ({ navigation }) => {
      return { variables: { id: get(navigation, 'state.params.id') } }
    }
  })
)(Profile)
