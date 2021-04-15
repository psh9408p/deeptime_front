import { gql } from 'apollo-boost';

export const FEED_ONE_QUERY = gql`
  query seeOneFeed($postId: String!) {
    seeOneFeed(postId: $postId) {
      id
      location
      category
      caption
      user {
        id
        avatar
        username
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
