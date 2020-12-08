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

export const ME = gql`
  query me {
    me {
      id
      username
      fullName
      avatar
      existToggle
      studyPurpose
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
          bgColor
        }
      }
      studyDefaultSet {
        timelapseRecord
        nonScheduleRecord
        autoRefresh
        autoRefreshTerm
        startScheduleTerm
        cutExtenTerm
        scheduleStart
        scheduleEnd
        dDayOn
        dDateName
        dDate
      }
      followDates {
        id
        followId
        goWith
        createdAt
      }
      withFollowing {
        id
        avatar
        username
        existToggle
      }
      following {
        id
        avatar
        email
        username
      }
    }
  }
`;
