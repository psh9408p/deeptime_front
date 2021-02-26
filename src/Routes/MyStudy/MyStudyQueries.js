import { gql } from 'apollo-boost';

export const ME = gql`
  query me {
    me {
      id
      email
      username
      fullName
      avatar
      existToggle
      studyPurpose
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
        todayTime {
          existTime
        }
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

export const MY_SUBJECT = gql`
  query mySubject {
    mySubject {
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
