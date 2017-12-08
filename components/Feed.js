import React from 'react'
import { View, Text, FlatList } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Card from './feed/Post'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const PostList = ({ data, ...props }) => {
  const {
    loading,
    error,
    Posts,
    refetch
  } = data

  if (loading) {
    console.log(loading)
  }
  if (error) {
    // console.log(error)
  }
  if (Posts) {
    // console.log(users)
  }

  return (
    <View>
      <Text>Feed</Text>
      {
        Posts ?
        <FlatList
          data={Posts}
          renderItem={({ item }) => (
            <Card
              {...item}
            />
          )}
          keyExtractor={item => item.id}
          refreshing={loading}
          onRefresh={refetch}
        />
        :
        <Text>Loading</Text>
      }

    </View>
  )
}

export default graphql(gql`
  query PostList {
    Posts {
      id
      title
      description
      user {
        phoneNumber
      }
      file {
        url
      }
    }
  }
`)(PostList)
