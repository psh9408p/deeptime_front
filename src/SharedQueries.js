import { gql } from 'apollo-boost';

export const ME = gql`
  query me {
    me {
      id
      email
      username
      avatar
      loginPosition
      targetTimeBox {
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
      todayTime {
        attendanceStatus
        absenceReason
      }
    }
  }
`;
