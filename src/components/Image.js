import React from 'react'
import { View, ImageBackground, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import get from 'lodash/get'

export default ({ source, loading, editable, editHandler }) => {
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
