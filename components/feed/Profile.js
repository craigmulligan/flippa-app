import React from 'react'
import { Avatar } from 'react-native-elements'
import { View, Text } from 'react-native'

export default ({ displayName }) => {
  return (
    <View style={{
      flex: 1, 
      flexDirection: 'row',
      alignItems: 'center'
    }}>
       <Avatar
        small
        rounded
        title="MT"
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      /> 
      <Text>  
        { displayName }
      </Text>
    </View>
  )
}
