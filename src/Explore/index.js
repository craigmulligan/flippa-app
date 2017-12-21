import React from 'react'
import { Icon } from 'react-native-elements'
import Grid from './Grid'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

Grid.navigationOptions = {
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: () => <Icon name="explore" />
}

export default Grid
