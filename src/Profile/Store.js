import React, { Component } from 'react'
import get from 'lodash/get'
import { Icon } from 'react-native-elements'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { TabNavigator } from 'react-navigation'
import Likes from './Likes'
import Selling from './Selling'
import { UserSummary, FollowSummary, Follow } from '../components'
import { isCurrentUser } from '../../src/apollo/client'
import store from '../redux'
import { theme } from '../constants'

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
      file {
        url
      }
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

  static navigationOptions = ({ showHeader }) => ({
    tabBarIcon: ({ tintColor, focused }) => {
      return (
        <Icon
        color={focused ? tintColor : theme.colors.grayDark}
        name="person"
        />
      )
    },
    header: !showHeader && null
  })

  render() {
    const { navigation: { rootNavigation } } = store.getState()
    const { User } = this.props.data
    return (
      <ScrollView>
      <View
      style={{
        flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
      }}
      >
      <UserSummary {...User} />
      <TouchableOpacity onPress={() => rootNavigation.navigate('Contacts')}>
      <Text>
      Contacts
      </Text>
      </TouchableOpacity>
      <View>
      {!isCurrentUser(get(User, 'id')) && 
        <View
        style={{
          flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }}
        > 
        <Follow id={get(User, 'id')} /> 
        </View>}
      {isCurrentUser(get(User, 'id')) && (
        <TouchableOpacity
        onPress={() => {
          rootNavigation.navigate('EditProfile', {
            id: get(User, 'id')
          })
        }}
        >
        <Icon name={'edit'} />
        </TouchableOpacity>
      )}
      </View>
      </View>
      <FollowSummary {...User} />
      <StoreNav screenProps={{ userId: get(User, 'id') }} />
      </ScrollView>
    )
  }
}

export default compose(
  graphql(updateUserMutation, { name: 'updateUser' }),
  graphql(userQuery, {
    options: ({ navigation }) => {
      return { variables: { id: get(navigation, 'state.params.id') } }
    }
  })
)(Profile)
