import { gql } from 'apollo-boost';

export const ME = gql`
  query me {
    me {
      fullName
      avatar
      existToggle
      todayTime {
        attendanceStatus
        absenceReason
      }
      times {
        existTime
        targetTime
        time_24
        createdAt
      }
      schedules {
        id
        isAllDay
        isPrivate
        title
        location
        state
        start
        end
        subjectId
        subjectName
      }
    }
  }
`;
