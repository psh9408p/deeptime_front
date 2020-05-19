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
        title
        location
        state
        start
        end
      }
      subjects {
        id
        name
        color
        bgColor
        dragBgColor
        borderColor
      }
    }
  }
`;

export const ADD_CLASS = gql`
  mutation addClass($name: String!, $bio: String!, $academyId: String!) {
    addClass(name: $name, bio: $bio, academyId: $academyId)
  }
`;
