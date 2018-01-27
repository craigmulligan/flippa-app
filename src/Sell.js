import React, { Component } from 'react'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import { ScrollView, StyleSheet } from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { theme } from './constants'
import * as queries from './apollo/queries'
import { Upload } from './components'

const createPostMutation = gql`
  mutation($input: PostInput!) {
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
      error: null,
      files: [],
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

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
      <Upload uploadHandler={(error, upload) => {
        if (error) {
          this.setState({ error })
        } else {
          this.setState({ files: [ ...this.state.files, upload.id ] })
        }
      }} /> 
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
        Press/>
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
            // eslint-ignore-next-line no-unused-vars
            const { error, ...rest } = this.state
            await this.props.createPost({
              variables: {
                input: rest 
              },
              refetchQueries: [
                'sellingQuery',
                'feedQuery',
                'List'
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
  graphql(queries.GET_CURRENT_USER, { name: 'currentUser' }),
  graphql(createPostMutation, { name: 'createPost' })
)(Sell)
