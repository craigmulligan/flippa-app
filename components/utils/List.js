import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon, SearchBar, Divider } from 'react-native-elements'
import { Post, Empty } from '../utils'
import isEmpty from 'lodash/isEmpty'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const PostList = ({ data, ...rest }) => {
  const { loading, error, Posts, refetch, fetchMore } = data

  _renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />
  }

  _loadMore = () => {
    console.log('FETCHING MO POSTS', `Current Length ${Posts.length}`)
    fetchMore({
      variables: {
        offset: Posts.length,
        limit: 10 
      },
      updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
        console.log(queryVariables)
        if (!fetchMoreResult) {
          return previousResult
        }
        
        console.log(previousResult)
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
      {loading && <ActivityIndicator />}
      {!isEmpty(Posts) && (
        <FlatList
          data={Posts}
          renderItem={({ item }) => <Post {...item} />}
          keyExtractor={item => item.id}
          refreshing={loading}
          onRefresh={refetch}
          ListHeaderComponent={_renderHeader}
          ItemSeparatorComponent={() => {
            return <Divider />
          }}
          ListFooterComponent={_renderFooter}
          onEndReached={_loadMore}
        />
      ) 
      }
    {
      (isEmpty(Posts) && !loading) && <Empty />
    }
    </View>
  )
}

export default PostList
