import { gql } from 'apollo-boost';

export const USER_SCHEDULE = gql`
  query userSchedule($userId: String!) {
    userSchedule(userId: $userId) {
      id
      isAllDay
      isPrivate
      title
      location
      state
      start
      end
      totalTime
      subject {
        id
        name
        bgColor
      }
    }
  }
`;

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
