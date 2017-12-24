import React from 'react'
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { SearchBar, Divider } from 'react-native-elements'
import { Post, Empty, Image } from '../components'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { withNavigation } from 'react-navigation'
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
// http://rationalappdev.com/react-native-list-app-complete-how-to-guide/

const PostList = ({ data, grid, navigation }) => {
  const { loading, Posts, refetch, fetchMore } = data

  const _renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />
  }

  const _loadMore = () => {
    fetchMore({
      variables: {
        offset: Posts.length,
        limit: 10
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

  const _renderFooter = () => {
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

  const _renderRow = ({ item }) => {
    if (grid) {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Post', { id: item.id })}
            style={grid && styles.row}
          >
            <View>
              <Image source={{ uri: get(item, 'files[0].url') }} />
            </View>
          </TouchableOpacity>
        ) 
    } else {
       return(
          <Post {...item} />
        )
    }
  }

  return (
    <View>
      {loading && <ActivityIndicator />}
      {!isEmpty(Posts) && (
        <FlatList
          numColumns={grid && 3}
          data={Posts}
          renderItem={_renderRow}
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
      )}
      {isEmpty(Posts) && !loading && <Empty />}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    flex: 1,
    height: 100
  }
})

export default withNavigation(PostList)
