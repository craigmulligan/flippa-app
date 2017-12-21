import React from 'react'
import { Avatar } from 'react-native-elements'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import withRootNav from '../../Providers/withRootNav'

export default withNavigation(
  ({ phoneNumber, displayName, id, navigation }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          withRootNav.get().navigate(`Store`, {
            id
          })
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10
          }}
        >
          <Avatar
            small
            rounded
            title={displayName && displayName.slice(0, 2).toUpperCase()}
            activeOpacity={0.7}
          />
          <View
            style={{
              marginLeft: 5
            }}
          >
            <Text>{displayName}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 12
              }}
            >
              {phoneNumber}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)
