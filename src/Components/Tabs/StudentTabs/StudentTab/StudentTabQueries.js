import { gql } from "apollo-boost"

export const DELETE_STUDENT = gql`
  mutation deleteStudent($email: String!, $organizaionId: String!, $classId: String!) {
    deleteStudent(email: $email, organizaionId: $organizaionId, classId: $classId)
  }
`

export const DISCON_SEAT = gql`
  mutation disconSeat($email: String!) {
    disconSeat(email: $email)
  }
`

export const EDIT_STUDENT = gql`
  mutation editStudent(
    $email: String!
    $schoolId: String!
    $academyId: String!
    $readingRoomId: String!
    $classId: String!
    $loginPosition: String!
  ) {
    editStudent(
      email: $email
      schoolId: $schoolId
      academyId: $academyId
      readingRoomId: $readingRoomId
      classId: $classId
      loginPosition: $loginPosition
    )
  }
`
