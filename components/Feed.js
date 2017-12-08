import React from 'react'
import { View, Text, FlatList } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Card from './feed/Post'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const PostList = ({ data }) => {
  const loading = data.loading
  const error = data.error
  const posts = data.Posts

  if (loading) {
    // console.log(loading)
  }
  if (error) {
    // console.log(error)
  }
  if (posts) {
    // console.log(users)
  }
  return (
    <View>
      <Text>Feed</Text>
      {
        posts ?
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Card
              title={`${item.title}`}
              description={item.description}
            />
          )}
          keyExtractor={item => item.id}
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
    }
  }
`)(PostList)
