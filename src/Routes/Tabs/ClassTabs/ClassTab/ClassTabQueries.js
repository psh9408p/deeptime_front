import { gql } from 'apollo-boost';

export const DELETE_CLASS = gql`
  mutation deleteClass($id: String!) {
    deleteClass(id: $id)
  }
`;

export const EDIT_CLASS = gql`
  mutation editClass(
    $classId: String!
    $name: String!
    $bio: String!
    $academyId: String!
  ) {
    editClass(classId: $classId, name: $name, bio: $bio, academyId: $academyId)
  }
`;
