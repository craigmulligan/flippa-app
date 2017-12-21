import React, { Component } from 'react'
import { SecureStore } from 'expo'
import get from 'lodash/get'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Likes from './Likes'
import Selling from './Selling'
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc'
import PropTypes from 'prop-types'
import { UserSummary, FollowSummary, Follow } from '../utils'
import {
  isCurrentUser 
} from '../../src/apollo/client'
import Store from './Store'
import Edit from './Edit'

const ProfileNav = StackNavigator(
  {
    Store: {
      screen: Store 
    },
    Edit: {
      screen: Edit
    }
  },
  {
    initialRouteName: 'Store'
  }
)

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
    return (
      <ProfileNav screenProps={{
        userId: this.props.navigation.state.id
      }} />
    )
  }
}

export default Profile
