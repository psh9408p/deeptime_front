import { gql } from 'apollo-boost';

export const ME = gql`
  query me {
    me {
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
      academies {
        id
        name
      }
      classes {
        id
        name
        organizationName
        bio
        academy {
          id
          name
        }
      }
    }
  }
`;
