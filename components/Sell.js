import React, { Component } from 'react'
import { ImagePicker } from 'expo'
import { FormLabel, FormInput, Button, Tile } from 'react-native-elements'
import { View, ScrollView, ActivityIndicator, StyleSheet, Text } from 'react-native'

import Image from './feed/Image'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const createPostMutation = gql`
  mutation ($input: PostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
`

class Sell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: '',
      image: null,
      uploading: ''
    }
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  }

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });
      setTimeout(() => {
        this.setState({ uploading: false })
      }, 10000);

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      // this.setState({ uploading: false });
    }
  }

  render() {
    return (
      <ScrollView>
        <FormLabel>Title</FormLabel>
        <FormInput
          value={this.state.title}
          onChangeText={value => this.setState({ title: value })}
          placeholder={'Title ... '}
        />
        <FormLabel>Description</FormLabel>
        <FormInput
          value={this.state.description}
          onChangeText={value => this.setState({ description: value })}
          placeholder={'Description ... '}
        />
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />
        <Image
          loading={this.state.uploading}
          source={{ uri: this.state.image }}
        />
        <FormLabel>Price</FormLabel>
        <FormInput
          value={this.state.price}
          onChangeText={value => this.setState({ price: value })}
          placeholder={'Price ... '}
        />
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Post'
          onPress={() => {
            return this.props.mutate({
              variables: {
                input: this.state
              }
            })
          }}
           />
      </ScrollView>
    )
  }
}

export default graphql(createPostMutation)(Sell)
