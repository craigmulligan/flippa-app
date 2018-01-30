import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { PostForm } from './components'

const createPostMutation = gql`
  mutation($input: PostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
`

export default compose(graphql(createPostMutation))(PostForm)
