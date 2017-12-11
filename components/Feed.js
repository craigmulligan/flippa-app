import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Card from './feed/Post'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const PostList = ({ data }) => {
  const { loading, error, Posts, refetch } = data

  if (loading) {
    // console.log(loading)
  }
  if (error) {
    console.log(error)
  }
  if (Posts) {
    // console.log(users)
  }

  return (
    <View>
      {Posts ? (
        <FlatList
          data={Posts}
          renderItem={({ item }) => <Card {...item} />}
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

PostList.navigationOptions = {
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor }) => (
   <Icon
    name='home' /> 
  ),
};

export default graphql(gql`
  query PostList {
    Posts {
      id
      title
      description
      price
      user {
        displayName
        phoneNumber
      }
      file {
        url
      }
    }
  }
`)(PostList)
