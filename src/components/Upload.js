import React, { Component } from 'react'
import { ImagePicker } from 'expo'
import { ReactNativeFile } from 'apollo-upload-client'
import shortid from 'shortid'
import { Image, ImageForm } from './'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { View } from 'react-native'
import uniqBy from 'lodash/uniqBy'

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
      files: [],
      index: 0
    }
  }

  static defaultProps = {
    multi: true
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

  _updateFiles = (file, i, cb) => {
    this.setState((prevState) => {
      const { files } = prevState
      files[i] = {
        ...files[i],
        ...file
      }

      return {
        files
      }
    }, cb)
  }

  _addNewFile = (file) => {
    this.setState((prevState) => {
      const { files } = prevState
      files.unshift(file)
      return {
        files
      }
    })
  }

  _removeFile = (i) => {
    this.setState((prevState) => {
      const { files } = prevState
      files.splice(i, 1)
      return {
        files
      }
    }, () => {
      this.props.uploadHandler(null, this.state.files)
    })
  }

  _handleImagePicked = async (pickerResult, i) => {
    try {
      if (!pickerResult.cancelled) {
        if (typeof i === 'undefined') {
        // in the _addNewFile call we created an new item at index 0,
        // so the rest of the calls will point to the new entry
        this._addNewFile({})
        i = 0
      }

      this.setState({ index: i }) 
      this._updateFiles({ url: pickerResult.uri, loading: true }, i)

        const type = pickerResult.uri.slice(-3)

        const f = new ReactNativeFile({
          uri: pickerResult.uri,
          type: `image/${type}`,
          name: `${shortid.generate()}.jpg`
        })

        this._updateFiles(i, { url: pickerResult.uri })

        const { data } = await this.props.uploadImage({
          variables: { file: f }
        })

        this._updateFiles(data.singleUpload, i, () => {
          this.props.uploadHandler(null, this.state.files)
        })
     }
    } catch (e) {
      this.props.uploadHandler(e)
    } finally {
      this._updateFiles({ loading: false }, i)
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.uploading !== nextState.uploading) {
      if (typeof this.props.isUploading == 'function') {
        this.props.isUploading(
          this.state.files.find((f) => f.loading === true)
        )
      }
    }
  }

  componentWillReceiveProps = newProps => {
    this.setState((prevState) => ({ files: uniqBy([ ...prevState.files, ...newProps.files ], 'id') }))
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
    if (this.state.files.length === 0) {
      return(<ImageForm onPress={this._pickImage} />)
    }

    return (
       <View>
        <Image
          editable={true}
          editHandler={this._pickImage}
          removeHandler={this._removeFile}
          loading={this.state.uploading}
          uploading={this.state.uploading}
          files={this.state.files}
          index={this.state.index}
          multi={this.props.multi}
        />
      </View>
    )
  }
}

export default compose(graphql(uploadImageMutation, { name: 'uploadImage' }))(
  Upload
)
