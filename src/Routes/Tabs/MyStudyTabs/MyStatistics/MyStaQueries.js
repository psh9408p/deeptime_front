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
    }
  }
`;
