import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import constants from '../../constants'
import isArray from 'lodash/isArray'
import get from 'lodash/get'

const followUserMutation = gql`
  mutation($id: ID!) {
    followUser(id: $id) {
      userId
    }
  }
`

const WhoamiQuery = gql`
  query Whoami {
    Whoami {
      id
      following {
        id
      }
    }
  }
`

const isFollowing = (following, id) => {
  if (!isArray(following)) {
    return false
  }
  return following.map(f => f.id).includes(id)
}

const Follow = ({ id, loading, followUser, data: { Whoami } }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Button
        buttonStyle={{
          backgroundColor: isFollowing(get(Whoami, 'following'), id)
            ? constants.theme.colors.green
            : constants.theme.colors.blue
        }}
        loading={loading}
        onPress={async () => {
          console.log(id)
          await followUser({
            variables: {
              id: id
            },
            refetchQueries: [
              {
                query: WhoamiQuery
              }
            ]
          })
        }}
        title="Follow"
      />
    </View>
  )
}

export default compose(
  graphql(followUserMutation, { name: 'followUser' }),
  graphql(WhoamiQuery)
)(Follow)
