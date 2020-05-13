import { gql } from 'apollo-boost';

export const MY_CLASS = gql`
  query myClass {
    myClass {
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
`;

export const ADD_CLASS = gql`
  mutation addClass($name: String!, $bio: String!, $academyId: String!) {
    addClass(name: $name, bio: $bio, academyId: $academyId)
  }
`;
