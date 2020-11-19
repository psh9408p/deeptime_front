import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isSelf
      email
      studyPurpose
      studyGroup
      studyGroup2
      studyGroup3
      followingCount
      followersCount
      isFollowing
      followDates {
        id
        followId
        createdAt
      }
      following {
        id
        avatar
        email
        username
        isFollowing
        isSelf
      }
      followers {
        id
        avatar
        email
        username
        isFollowing
        isSelf
        followDates {
          id
          followId
          createdAt
        }
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const EDIT_AVATAR = gql`
  mutation editAvatar($location: String!, $key: String!) {
    editAvatar(location: $location, key: $key)
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

export const ADD_FOLLOW = gql`
  mutation addFollow($inputStr: String!) {
    addFollow(inputStr: $inputStr)
  }
`;

export const UN_FOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

export const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;
