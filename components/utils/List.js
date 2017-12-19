import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon, SearchBar, Divider } from 'react-native-elements'
import { Post, Hr } from '../utils'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const PostList = ({ data }) => {
  const { loading, error, Posts, refetch, fetchMore } = data
  _renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />
  }

  _loadMore = () => {
    console.log('FETCHING MO POSTS', `Current Length ${Posts.length}`)
    fetchMore({
      variables: {
        offset: Posts.length,
        limit: POSTS_PER_PAGE
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }

        return Object.assign({}, previousResult, {
          Posts: [...previousResult.Posts, ...fetchMoreResult.Posts]
        })
      }
    })
  }

  _renderFooter = () => {
    if (!loading) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  return (
    <View>
      {Posts ? (
        <FlatList
          data={Posts}
          renderItem={({ item }) => <Post {...item} />}
          keyExtractor={item => item.id}
          refreshing={loading}
          onRefresh={refetch}
          ListHeaderComponent={this._renderHeader}
          ItemSeparatorComponent={() => {
            return <Divider />
          }}
          ListFooterComponent={this._renderFooter}
          //          onEndReached={this._loadMore}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default PostList
