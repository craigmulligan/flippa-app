import React from 'react'
import { View } from 'react-native'

class NavProvider extends React.Component {
  getChildContext() {
    { rootNavigate } = this.props
    return {
      rootNavigate 
    };
  }

  render() {
    return <View {...props} />;
  }
}

NavProvider.childContextTypes = {
  coloredTheme: PropTypes.string
};

export default NavProvider
