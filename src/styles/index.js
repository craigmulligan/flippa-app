import { StyleSheet } from 'react-native'
import { 
 theme
} from '../constants'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  tabBar: {
    backgroundColor: theme.colors.gray,
    borderTopWidth: 1,
    borderColor: theme.colors.grayLight
  }
});

export default styles
