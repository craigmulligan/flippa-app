import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import Store from './Store'
import Edit from './Edit'
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc'

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
    initialroutename: 'Store'
  }
)

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = () => ({
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
      <ProfileNav
        screenProps={{
          userId: this.props.navigation.state.id
        }}
      />
    )
  }
}

export default withNavigationFocus(Profile)
