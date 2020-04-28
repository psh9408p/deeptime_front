import { gql } from "apollo-boost"

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
      schools {
        id
        name
      }
      academies {
        id
        name
      }
      readingRooms {
        id
        name
      }
      classes {
        id
        name
        organizationName
        bio
        grade
        floor
        maxRow
        maxColumn
        school {
          id
          name
        }
        academy {
          id
          name
        }
        readingRoom {
          id
          name
        }
      }
    }
  }
`
