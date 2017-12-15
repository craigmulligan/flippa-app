import gql from 'graphql-tag'

export default {
  userSummary: gql`
    fragment CommentsPageComment on Comment {
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  `
}
