import { gql } from 'apollo-boost';

export const FEED_ALL_QUERY = gql`
  query seeAllFeed($category: String!, $first: Int!) {
    seeAllFeed(category: $category, first: $first) {
      id
      location
      category
      caption
      user {
        id
        avatar
        username
        studyGroup
        studyGroup2
        studyGroup3
      }
      files {
        id
        url
        key
      }
      likeCount
      isLiked
      isSelf
      comments {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $location: String!
    $category: String!
    $caption: String!
    $fileUrl: [String!]!
    $fileKey: [String!]!
  ) {
    createPost(
      location: $location
      category: $category
      caption: $caption
      fileUrl: $fileUrl
      fileKey: $fileKey
    )
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $postId: String!
    $caption: String!
    $location: String!
    $category: String!
  ) {
    editPost(
      postId: $postId
      caption: $caption
      location: $location
      category: $category
    )
  }
`;

export const ME_GROUP = gql`
  query me {
    me {
      id
      studyGroup
      studyGroup2
      studyGroup3
    }
  }
`;
