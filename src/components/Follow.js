import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import constants from '../../constants'
import isArray from 'lodash/isArray'
import get from 'lodash/get'
import { userQuery } from '../Profile/Store'

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

const checkFollowStatus = (following, id) => {
  if (!isArray(following)) {
    return false
  }
  return following.map(f => f.id).includes(id)
}

const Follow = ({ id, loading, followUser, data: { Whoami } }) => {
  const isFollowing = checkFollowStatus(get(Whoami, 'following'), id)
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
          backgroundColor: isFollowing
            ? constants.theme.colors.gray
            : constants.theme.colors.green
        }}
        loading={loading}
        onPress={async () => {
          await followUser({
            variables: {
              id: id
            },
            refetchQueries: [
              {
                query: WhoamiQuery
              },
              {
                query: userQuery,
                variables: {
                  id: id
                }
              },
              'feedQuery'
            ]
          })
        }}
        title={isFollowing ? 'UnFollow' : 'Follow'}
      />
    </View>
  )
}

export default compose(
  graphql(followUserMutation, { name: 'followUser' }),
  graphql(WhoamiQuery)
)(Follow)
