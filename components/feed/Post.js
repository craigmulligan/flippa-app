import React from 'react'
import { Text, View } from 'react-native'
import { Divider, Card, Button } from 'react-native-elements'
import Image from './Image'
import Profile from './Profile'
import constants from '../../constants'

export default ({ title, price, description, file, user }) => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF'
    }}>
      <Profile {...user} />
      <Text>{title}</Text>
      <Text style={{ marginBottom: 10 }}>{description}</Text>
      <Image source={{ uri: file && file.url }} />
    <View style={{
      display:'flex', 
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 15,
      marginRight: 15
    }}>
        <Text>{price}</Text>
        <Button
          containerViewStyle={{
            marginRight: 0
          }}
          backgroundColor={ constants.theme.colors.green }
          title="Make an Offer"
        />
      </View>
    </View>
  )
}
