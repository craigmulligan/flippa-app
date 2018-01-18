import React, { Component } from 'react'
import { ImagePicker } from 'expo'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { ScrollView, StyleSheet } from 'react-native'
import { ReactNativeFile } from 'apollo-upload-client'
import shortid from 'shortid'
import { Image, ImageForm } from './components'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { theme } from './constants'
import store from './redux'

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
      files: [],
      uploading: ''
    }
  }
  static navigationOptions = {
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor, focused }) => {
      return (
        <Icon
          color={focused ? tintColor : theme.colors.grayDark}
          name="camera"
        />
      )
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
      // console.log(err)
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

        this.setState({
          files: [...this.state.files, data.singleUpload.id]
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
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        {!this.state.image && <ImageForm onPress={this._pickImage} />}
        <Image
          loading={this.state.uploading}
          source={{ uri: this.state.image }}
        />
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
            marginRight: 0
          }}
          title="Post"
          onPress={async () => {
            // eslint-disable-next-line no-unused-vars
            const { uploading, image, ...rest } = this.state

            await this.props.createPost({
              variables: {
                input: rest
              },
              refetchqueries: [
                {
                  query: 'sellingQuery',
                  variables: {
                    filter: {
                      where: {
                        userId: store.getState().currentUser.id
                      }
                    }
                  }
                },
                'feedQuery'
              ]
            })
            this.props.navigation.navigate('Feed')
          }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayMedium,
    padding: 10
  },
  contentContainer: {
    paddingBottom: 20
  }
})

export default compose(
  graphql(uploadImageMutation, { name: 'uploadImage' }),
  graphql(createPostMutation, { name: 'createPost' })
)(Sell)
