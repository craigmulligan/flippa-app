import React from 'react'
import { View, ImageBackground, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import get from 'lodash/get'
import Swiper from 'react-native-swiper'

export default ({ source, loading, uploading, editable, editHandler, files }) => {
  if (files && files.length > 0) {
    return (
      <Swiper height={300} showsButtons={false}>
        {files.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                height: 300
              }}
            >
              <ImageBackground
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  alignItems: 'stretch',
                  justifyContent: 'center'
                }}
                source={{ uri: item.url }}
              >
                {uploading && uploading.includes(i) ? <ActivityIndicator /> : null}
                {editable && !item.loading ? (
                  <Icon
                    onPress={() => editHandler && editHandler(item, i)}
                    name={'edit'}
                    color={'white'}
                  />
                ) : null}
              </ImageBackground>
            </View>
          )
        })}
      </Swiper>
    )
  }

  return get(source, 'uri') ? (
    <View
      style={{
        height: 300
      }}
    >
      <ImageBackground
        style={{
          width: undefined,
          height: undefined,
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center'
        }}
        source={source}
      >
        {loading ? <ActivityIndicator /> : null}
        {editable && !loading ? (
          <Icon
            onPress={() => editHandler && editHandler(source)}
            name={'edit'}
            color={'white'}
          />
        ) : null}
      </ImageBackground>
    </View>
  ) : null
}
