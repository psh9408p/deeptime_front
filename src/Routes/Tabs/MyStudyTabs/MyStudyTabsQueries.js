import { gql } from 'apollo-boost';

export const ME = gql`
  query me {
    me {s
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
