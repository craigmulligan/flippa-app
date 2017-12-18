import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Notification from './Notification'
import get from 'lodash/get'

const NofificationList = ({ data }) => {
  console.log(data)
  const { loading, error, User, refetch } = data

  console.log(error)
  console.log(loading)
  return (
    <View>
      {get(User, 'notifications') ? (
        <FlatList
          data={User.notifications}
          renderItem={({ item }) => <Notification {...item} />}
          keyExtractor={item => item.id}
          refreshing={loading}
          onRefresh={refetch}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

NofificationList.navigationOptions = {
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="notifications" />
  }
}

export default graphql(gql`
  query Notification {
    User {
      id
      phoneNumber
      notifications {
        id
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
