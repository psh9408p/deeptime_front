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
      organization {
        id
        name
        manager {
          id
          phoneNumber
        }
      }
      raspberry {
        id
        seatNumber
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
