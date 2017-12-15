import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import constants from '../../constants'
import isArray from 'lodash/isArray'
import get from 'lodash/get'

const likePostMutation = gql`
  mutation($id: ID!) {
    likePost(id: $id)
  }
`
const WhoamiQuery = gql`
  query Whoami {
    Whoami {
      id
      likes {
        id
      }
    }
  }
`

const hasLiked = (likes, id) => {
  if (!isArray(likes)) {
    return false
  }
  return likes.map(f => f.id).includes(id)
}

const Like = ({ id, likePost, data: { Whoami } }) => {
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
          backgroundColor: hasLiked(get(Whoami, 'likes'), id)
            ? constants.theme.colors.green
            : constants.theme.colors.blue
        }}
        loading={false}
        onPress={async () => {
          await likePost({
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
        title="Like"
      />
    </View>
  )
}

export default compose(
  graphql(likePostMutation, { name: 'likePost' }),
  graphql(WhoamiQuery)
)(Like)
