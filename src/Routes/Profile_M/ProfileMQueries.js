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
      organization {
        id
        name
        seatRatio
        secretCode
        hubs {
          id
          serialNumber
          raspberries {
            id
            seatNumber
            serialNumber
            category
            user {
              id
              fullName
              phoneNumber
            }
          }
        }
      }
      payments {
        id
        name
        paid_at
        pay_method
        amount
        receipt_url
      }
      paymentSet {
        id
        membershipDate
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
