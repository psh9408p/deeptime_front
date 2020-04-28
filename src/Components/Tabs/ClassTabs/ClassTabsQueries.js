import { gql } from "apollo-boost"

export const MY_CLASS = gql`
  query myClass {
    myClass {
      id
      name
      organizationName
      bio
      grade
      floor
      maxRow
      maxColumn
      school {
        id
        name
      }
      academy {
        id
        name
      }
      readingRoom {
        id
        name
      }
    }
  }
`

export const ADD_CLASS = gql`
  mutation addClass(
    $name: String!
    $bio: String!
    $loginPosition: String!
    $schoolId: String!
    $academyId: String!
    $readingRoomId: String!
    $grade: Int!
    $floor: Int!
  ) {
    addClass(
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
