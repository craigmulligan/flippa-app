import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const NofificationList = ({ data }) => {
  const loading = data.loading
  const error = data.error
  const users = data.Users

  if (loading) {
    // console.log(loading)
  }
  if (error) {
    // console.log(error)
  }
  if (users) {
    // console.log(users)
  }
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  )
}

NofificationList.navigationOptions = {
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="notifications" />
  }
}

export default graphql(gql`
  query Notifications {
    Users {
      id
      phoneNumber
    }
  }
`)(NofificationList)
