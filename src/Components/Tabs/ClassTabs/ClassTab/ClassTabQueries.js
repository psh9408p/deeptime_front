import { gql } from "apollo-boost"

export const DELETE_CLASS = gql`
  mutation deleteClass($id: String!, $loginPosition: String!) {
    deleteClass(id: $id, loginPosition: $loginPosition)
  }
`

export const EDIT_CLASS = gql`
  mutation editClass(
    $classId: String!
    $name: String!
    $bio: String!
    $loginPosition: String!
    $schoolId: String!
    $academyId: String!
    $readingRoomId: String!
    $grade: Int!
    $floor: Int!
  ) {
    editClass(
      classId: $classId
      name: $name
      bio: $bio
      loginPosition: $loginPosition
      schoolId: $schoolId
      academyId: $academyId
      readingRoomId: $readingRoomId
      grade: $grade
      floor: $floor
    )
  }
`
