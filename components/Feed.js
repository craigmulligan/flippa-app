import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon, SearchBar } from 'react-native-elements'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Card from './feed/Post'
import Divider from './feed/Seperator'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/
const POSTS_PER_PAGE = 10
const PostList = ({ data }) => {
  const { loading, error, Posts, refetch, fetchMore } = data

  if (loading) {
    // console.log(loading)
  }
  if (error) {
    console.log(error)
  }
  if (Posts) {
    // console.log(users)
  }


  _renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };
  
  _loadMore = () => {
    console.log('FETCHING MO POSTS', `Current Length ${Posts.length}`)
    fetchMore({
      variables: {
        offset: Posts.length,
        limit: POSTS_PER_PAGE
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }

        return Object.assign({}, previousResult, {
          Posts: [...previousResult.Posts, ...fetchMoreResult.Posts],
        });
      }
    })
  }
  
  _renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
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
          ListHeaderComponent={this._renderHeader}
          ItemSeperatorComponent={() => (Divider)}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._loadMore}
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
  query PostList($limit :Int $offset: Int) {
    Posts(limit: $limit offset: $offset) {
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
`, {
  options: {
    variables: {
      offset: 0,
      limit: POSTS_PER_PAGE 
    }
  }
})(PostList)
