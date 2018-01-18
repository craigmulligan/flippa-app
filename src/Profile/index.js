import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import Store from './Store'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: () => {
      return <Icon color={'red'} name="person" />
    }
  }

  render() {
    return (
      <Store
        screenProps={{
          userId: this.props.navigation.state.id
        }}
      />
    )
  }
}

export default Profile
