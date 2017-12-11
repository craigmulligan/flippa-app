import React from 'react'
import { ImageBackground, ActivityIndicator } from 'react-native'

export default ({ source, loading }) => {
  return source.uri ? (
    <ImageBackground
      style={{
        width: undefined,
        height: 300,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
      }}
      source={source}
    >
      {loading ? <ActivityIndicator /> : null}
    </ImageBackground>
  ) : null
}
