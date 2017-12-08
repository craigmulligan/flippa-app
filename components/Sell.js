import React, { Component } from 'react'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { View } from 'react-native'
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
      price: ''
    }
  }

  render() {
    return (
      <View>
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
      </View>
    )
  }
}

export default graphql(createPostMutation)(Sell)
