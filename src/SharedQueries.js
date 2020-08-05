import { gql } from 'apollo-boost';

export const ME = gql`
  query me {
    me {
      id
      email
      username
      avatar
      loginPosition
      todayTime {
        attendanceStatus
        absenceReason
      }
    }
  }
`;
