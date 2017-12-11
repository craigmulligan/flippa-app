import React, { Component } from 'react'
import { ImagePicker } from 'expo'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import {
  ScrollView,
} from 'react-native'
import { ReactNativeFile } from 'apollo-upload-client'

import Image from './feed/Image'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const createPostMutation = gql`
  mutation($input: PostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
`

const uploadImageMutation = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
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
      fileId: null,
      uploading: ''
    }
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })

    this._handleImagePicked(pickerResult)
  }

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true })

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri })
        // console.log(pickerResult)
        const f = new ReactNativeFile({
          uri: pickerResult.uri,
          type: 'image/jpeg',
          name: 'photo.jpg'
        })

        const { data } = await this.props.uploadImage({
          variables: { file: f }
        })
        this.setState({
          fileId: data.singleUpload.id
        })
      }
    } catch (e) {
      alert('Upload failed, sorry :(')
    } finally {
      this.setState({ uploading: false })
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
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Post"
          onPress={async () => {
            // eslint-disable-next-line no-unused-vars
            const { uploading, image, ...rest } = this.state

            await this.props.createPost({
              variables: {
                input: rest
              }
            })
            this.props.navigation.navigate('Feed')
          }}
        />
      </ScrollView>
    )
  }
}

export default compose(
  graphql(uploadImageMutation, { name: 'uploadImage' }),
  graphql(createPostMutation, { name: 'createPost' })
)(Sell)
