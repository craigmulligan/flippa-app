import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
class NavigationProvider extends React.Component {
  getChildContext() {
    const { rootNavigation } = this.props
    return {
      rootNavigation 
    } 
  }

  render() {
    console.log(this.props)
    return (
      <View {...this.props} />
    )
  }
}

NavigationProvider.childContextTypes = {
  rootNavigation: PropTypes.string
};

export default NavigationProvider
