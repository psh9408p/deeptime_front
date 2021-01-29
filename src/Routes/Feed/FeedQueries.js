import { gql } from 'apollo-boost';

export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
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
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

export const FEED_ALL_QUERY = gql`
  query seeAllFeed($first: Int!) {
    seeAllFeed(first: $first) {
      id
      location
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
    $caption: String!
    $fileUrl: [String!]!
    $fileKey: [String!]!
  ) {
    createPost(
      location: $location
      caption: $caption
      fileUrl: $fileUrl
      fileKey: $fileKey
    )
  }
`;

export const EDIT_POST = gql`
  mutation editPost($postId: String!, $caption: String!, $location: String!) {
    editPost(postId: $postId, caption: $caption, location: $location)
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
