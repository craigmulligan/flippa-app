import React from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { Icon, Badge, Divider } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Notification from './Notification'
import get from 'lodash/get'
import { theme } from '../constants'

const NofificationList = ({ data }) => {
  const { loading, User, refetch } = data

  return (
    <View>
      {get(User, 'notifications') ? (
        <FlatList
          data={User.notifications}
          renderItem={({ item }) => <Notification {...item} />}
          keyExtractor={item => item.id}
          refreshing={loading}
          ItemSeparatorComponent={() => {
            return <Divider />
          }}
          onRefresh={refetch}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

NofificationList.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <View>
        <Badge
          value={3}
          color={focused ? tintColor : theme.colors.grayDark}
          wrapperStyle={{
            position: 'absolute',
            zIndex: 2,
            maxHeight: 10,
            maxWidth: 10
          }}
          containerStyle={{
            height: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            flexGrow: 0,
            flex: -1
          }}
        />
        <Icon
          color={focused ? tintColor : theme.colors.grayDark}
          name="notifications"
        />
      </View>
    )
  }
}

export default graphql(gql`
  query Notification {
    User {
      id
      phoneNumber
      notifications {
        id
        createdAt
        read
        actor {
          id
          phoneNumber
          displayName
        }
        sourceType
        post {
          id
          title
        }
      }
    }
  }
`)(NofificationList)
