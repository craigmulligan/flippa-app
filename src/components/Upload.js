import React, { Component } from 'react'
import { ImagePicker } from 'expo'
import { ReactNativeFile } from 'apollo-upload-client'
import shortid from 'shortid'
import { Image, ImageForm } from './'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { View } from 'react-native'

const uploadImageMutation = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      uploading: ''
    }
  }

  _pickImage = async () => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })

      this._handleImagePicked(pickerResult)
    } catch (err) {
      console.log(err)
    }
  }

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true })

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri })
        const type = pickerResult.uri.slice(-3)

        const f = new ReactNativeFile({
          uri: pickerResult.uri,
          type: `image/${type}`,
          name: `${shortid.generate()}.jpg`
        })
        const { data } = await this.props.uploadImage({
          variables: { file: f }
        })

        this.props.uploadHandler(null, data.singleUpload)
      }
    } catch (e) {
      this.props.uploadHandler(e)
    } finally {
      this.setState({ uploading: false })
    }
  }

  render() {
    return (
      <View>
        {!this.state.image && <ImageForm onPress={this._pickImage} />}
        <Image
          loading={this.state.uploading}
          source={{ uri: this.state.image }}
        />
      </View>
    )
  }
}

export default compose(
  graphql(uploadImageMutation, { name: 'uploadImage' }),
)(Upload)
