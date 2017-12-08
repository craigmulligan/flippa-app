import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'

export default ({ title, image, description }) => {
  return (
    <Card
      title={title}>
      <Text style={{marginBottom: 10}}>
        {description}
      </Text>
      <Button
        icon={{name: 'code'}}
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='VIEW NOW' />
    </Card>
  )
}
