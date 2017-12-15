import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const ExploreList = ({ data }) => {
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
      <Text>Explore</Text>
    </View>
  )
}

ExploreList.navigationOptions = {
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="explore" />
  }
}

export default graphql(gql`
  query ListUsers {
    Users {
      id
      phoneNumber
    }
  }
`)(ExploreList)
