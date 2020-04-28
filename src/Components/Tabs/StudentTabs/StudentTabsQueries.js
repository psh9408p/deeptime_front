import { gql } from "apollo-boost"

export const MY_STUDENT = gql`
  query myStudent {
    myStudent {
      fullName
      avatar
      email
      schools {
        id
        name
      }
      academies {
        id
        name
      }
      readingRooms {
        id
        name
      }
      classesOfSchool {
        id
        name
      }
      classesOfAcademy {
        id
        name
      }
      classesOfReadingRoom {
        id
        name
      }
      seatOfSchool {
        row
        column
      }
      seatOfAcademy {
        row
        column
      }
      seatOfReadingRoom {
        row
        column
      }
    }
  }
`

export const CONFIRM_STUDENT = gql`
  mutation confirmStudent($email: String!) {
    confirmStudent(email: $email)
  }
`

export const ADD_STUDENT = gql`
  mutation addStudent(
    $email: String!
    $schoolId: String!
    $academyId: String!
    $readingRoomId: String!
    $classId: String!
    $loginPosition: String!
  ) {
    addStudent(
      email: $email
      schoolId: $schoolId
      academyId: $academyId
      readingRoomId: $readingRoomId
      classId: $classId
      loginPosition: $loginPosition
    )
  }
`

export const CON_SEAT = gql`
  mutation conSeat($email: String!, $seatId: String!) {
    conSeat(email: $email, seatId: $seatId)
  }
`
