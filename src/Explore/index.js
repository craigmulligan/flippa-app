import React from 'react'
import { Icon } from 'react-native-elements'
import Grid from './Grid'
import { theme } from '../constants'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

Grid.navigationOptions = {
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Icon
        color={focused ? tintColor : theme.colors.grayDark}
        name="explore"
      />
    )
  }
}

export default Grid
