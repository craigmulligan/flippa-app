import React from 'react'
import { ImageBackground, ActivityIndicator } from 'react-native'

export default ({ source, loading }) => {
  return (
    <ImageBackground
      style={{
        width: 300,
        height: 300,
        marginLeft: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      source={source}
    >
      {loading ? <ActivityIndicator /> : null}
    </ImageBackground>
  )
}
