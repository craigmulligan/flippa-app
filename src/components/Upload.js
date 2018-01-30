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
      files: props.files,
      uploading: []
    }
  }

  _pickImage = async (item, i) => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      })

      this._handleImagePicked(pickerResult, i)
    } catch (err) {
      console.log(err)
    }
  }

  _handleImagePicked = async (pickerResult, i)=> {
    try {
      this.setState((prevState => ({ uploading: [...prevState.uploading, i ] })))
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

        this.setState((prevState => ({ uploading: prevState.uploading.filter((g) => g === i) })))
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

  componentWillReceiveProps = newProps => {
    this.setState((prevState) => ({ files: [...prevState.files, newProps.files ] }))
  }

  _getImage = stateImage => {
    if (stateImage) {
      return {
        uri: this.state.image
      }
    }
    return this.props.source
  }

  render() {
    console.log(this.state.files)
    return (
      <View>
        {!get(this._getImage(this.state.image), 'uri') && (
          <ImageForm onPress={this._pickImage} />
        )}
        <Image
          editable={true}
          editHandler={this._pickImage}
          loading={this.state.uploading}
          uploading={this.state.uploading}
          files={this.state.files}
        />
      </View>
    )
  }
}

export default compose(graphql(uploadImageMutation, { name: 'uploadImage' }))(
  Upload
)
