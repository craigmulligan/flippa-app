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
import Edit from './Edit'


const StoreNav = TabNavigator(
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

export const userQuery = gql`
  query User($id: ID) {
    User(id: $id) {
      id
      displayName
      phoneNumber
      avatar
      followers {
        id
      }
      following {
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
    },
    header: null
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <UserSummary {...User} />
          <View>
            {
              !isCurrentUser(get(User, 'id')) && <Follow id={get(User, 'id')} />
            }
            {
              isCurrentUser(get(User, 'id')) && (
                <TouchableOpacity 
                  onPress={() => {
                    this.props.navigation.navigate('Edit') 
                  }} 
                >
                  <Icon name={'edit'} />
                </TouchableOpacity>
              )
            }
          </View>
        </View>
        <FollowSummary {...User} />
        <StoreNav screenProps={{ userId: get(User, 'id') }} />
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
