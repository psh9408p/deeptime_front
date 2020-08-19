// import { gql } from 'apollo-boost';

// export const ME = gql`
//   query me {
//     me {
//       schedules {
//         id
//         isAllDay
//         isPrivate
//         title
//         location
//         state
//         start
//         end
//         subjectId
//         subjectName
//       }
//     }
//   }
// `;

import { gql } from 'apollo-boost';

export const CREATE_DEFAULTSUBJECT = gql`
  mutation createDefaultSubject {
    createDefaultSubject
  }
`;

export const ME = gql`
  query me {
    me {
      id
      username
      fullName
      avatar
      existToggle
      setDefaultSubject
      todayTime {
        attendanceStatus
        absenceReason
      }
      times {
        existTime
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
        totalTime
        subject {
          id
          name
          color
        }
      }
    }
  }
`;
