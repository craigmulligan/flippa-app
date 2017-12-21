import React, { Component } from 'react'
import get from 'lodash/get'
import { Icon } from 'react-native-elements'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { TabNavigator } from 'react-navigation'
import Likes from './Likes'
import Selling from './Selling'
import { UserSummary, FollowSummary, Follow } from '../components'
import { isCurrentUser } from '../../src/apollo/client'
import store from '../redux'

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

  static navigationOptions = ({ showHeader }) => ({
    tabBarIcon: () => {
      return <Icon name="person" />
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
          <View>
            {!isCurrentUser(get(User, 'id')) && <Follow id={get(User, 'id')} />}
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
