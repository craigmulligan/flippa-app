import React, { Component } from 'react'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { ScrollView, StyleSheet } from 'react-native'
import { theme } from '../constants'
import { Upload } from './'
import get from 'lodash/get'
import compact from 'lodash/compact'
import constants from '../constants'

const defaults = {
  title: '',
  description: '',
  price: '',
  error: null,
  loading: false,
  deleting: false,
  uploading: false,
  files: []
}

export default class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = defaults
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

  static defaultProps = {
    redirect: 'Explore' 
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.data.Post)
  }

  render() {

    const { goBack } = this.props.navigation;
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <Upload
          source={{ uri: get(this.props, 'data.Post.files[0].url') }}
          uploadHandler={(error, upload) => {
            if (error) {
              this.setState({ error })
            } else {
              this.setState({ files: [ ...this.state.files, upload ] })
            }
          }}
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
          Press
        />
        <FormLabel>Price</FormLabel>
        <FormInput
          value={this.state.price}
          onChangeText={value => this.setState({ price: value })}
          placeholder={'Price ... '}
        />
        <Button
          icon={{ name: 'add' }}
          backgroundColor={constants.theme.colors.blue}
          disabled={this.state.uploading}
          loading={this.state.deleting}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0
          }}
          title="Post"
          onPress={async () => {
            try {
              this.setState({ deleting : true })
              // eslint-ignore-next-line no-unused-vars
              const { title, price, id, files } = this.state
              // only way the fileIds
             
              await this.props.mutate({
                variables: {
                  input:{
                    title,
                    price, 
                    id, 
                    files: compact(files.map((f) => get(f, 'id'))),
                  } 
                },
                refetchQueries: ['sellingQuery', 'feedQuery', 'List']
              })
              this.setState(defaults)
              goBack()
            } catch (error) {
              this.setState({ error, deleting : false })
            }
          }}
        />
      {
        this.props.delete && 
        <Button
          icon={{ name: 'remove-circle-outline' }}
          backgroundColor={ constants.theme.colors.red }
          disabled={this.state.uploading}
          loading={this.state.loading}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0
          }}
          title="Delete Post"
          onPress={async () => {
            try {
              this.setState({ loading: true })
              const { id } = this.state
             
              await this.props.delete({
                variables: {
                  id: id 
                },
                refetchQueries: ['sellingQuery', 'feedQuery', 'List', 'LikedPosts']
              })

              this.setState(defaults)
              goBack()
            } catch (error) {
              console.log(error)
              this.setState({ error, loading: false })
            }
          }}
        />
      }
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

