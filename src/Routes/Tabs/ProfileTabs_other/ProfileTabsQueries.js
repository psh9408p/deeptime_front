import { gql } from 'apollo-boost';

export const USER_SUBJECT = gql`
  query userSubject($userId: String!) {
    userSubject(userId: $userId) {
      id
      name
      color
      bgColor
      dragBgColor
      borderColor
      bookMark
    }
  }
`;
