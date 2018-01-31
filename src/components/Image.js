import React from 'react'
import { View, ImageBackground, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import get from 'lodash/get'
import Swiper from 'react-native-swiper'

export default ({ index, source, loading, editable, multi, editHandler, removeHandler, files }) => {
  if (files && files.length > 0) {
    console.log(multi)
   return (
      <Swiper height={300} index={index} showsPagination={files.length > 1} showsButtons={false}>
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
                {item.loading ? <ActivityIndicator /> : null}
                {editable && !item.loading ? (
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Icon
                      onPress={() => removeHandler && removeHandler(i)}
                      name={'remove'}
                      color={'white'}
                    />
                  {
                    multi &&
                    <Icon
                      onPress={() => (editHandler) && editHandler(item)}
                      name={'add'}
                      color={'white'}
                    />
                  }
                    <Icon
                      onPress={() => editHandler && editHandler(item, i)}
                      name={'edit'}
                      color={'white'}
                    />
                    
                  </View>
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
