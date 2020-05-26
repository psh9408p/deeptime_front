import { gql } from 'apollo-boost';

export const MY_CLASS = gql`
  query myClass {
    myClass {
      id
      name
      bio
      studentsCount
      academy {
        id
        name
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

export const ADD_CLASS = gql`
  mutation addClass($name: String!, $bio: String!, $academyId: String!) {
    addClass(name: $name, bio: $bio, academyId: $academyId)
  }
`;
