import React, { Component } from 'react'
import { ImagePicker } from 'expo'
import { ReactNativeFile } from 'apollo-upload-client'
import shortid from 'shortid'
import { Image, ImageForm } from './'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { View } from 'react-native'
import get from 'lodash/get'

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
        allowsEditing: true
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
  
  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.uploading !== nextState.uploading) {
      if (typeof this.props.isUploading == 'function') {
        this.props.isUploading(nextState.uploading)
      }
    }
  }

  _getImage = (stateImage) => {
    if (stateImage) {
      return {
        uri: this.state.image 
      } 
    } 
    return this.props.source
  }

  render() {
    return (
      <View>
        {!get(this._getImage(this.state.image), 'uri') && <ImageForm onPress={this._pickImage} />}
        <Image
          editable={true}
          editHandler={this._pickImage}
          loading={this.state.uploading}
          source={this._getImage(this.state.image)}
        />
      </View>
    )
  }
}

export default compose(
  graphql(uploadImageMutation, { name: 'uploadImage' }),
)(Upload)
