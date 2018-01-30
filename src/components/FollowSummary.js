import React from 'react'
import { Text } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

const GET_FOLLOW_SUMMARY = gql`
  query getFollowInfo($id: ID) {
    User(id: $id) {
      id
      followers {
        id
      }
      following {
        id
      }
    }
  }
`

const FollowSummary = ({ id, data: { User } }) => {
  const followers = get(User, 'following')
  const following = get(User, 'followers')

  return (
    <View style={styles.container}>
      <Text>
        <Text h4>{followers && followers.length}</Text>
        <Text style={styles.textSmall}> Followers </Text>
      </Text>
      <Text>
        <Text h4>{following && following.length}</Text>
        <Text style={styles.textSmall}> Following</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 12
  },
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%'
  }
})

export default graphql(GET_FOLLOW_SUMMARY, {
  options: ({ id }) => ({ variables: { id: id } })
})(FollowSummary)
