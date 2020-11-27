import { gql } from 'apollo-boost';

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!, $fileKey: [String!]!) {
    deletePost(postId: $postId, fileKey: $fileKey)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId)
  }
`;
