import { gql } from 'apollo-boost';

export const MY_STUDENT = gql`
  query myStudent {
    myStudent {
      fullName
      avatar
      email
      studyGroup
      address1
      address2
      schools {
        id
        name
      }
      academies {
        id
        name
      }
      classesOfAcademy {
        id
        name
      }
    }
  }
`;

export const CONFIRM_STUDENT = gql`
  mutation confirmStudent($email: String!) {
    confirmStudent(email: $email)
  }
`;

export const ADD_STUDENT = gql`
  mutation addStudent($email: String!, $academyId: String!, $classId: String!) {
    addStudent(email: $email, academyId: $academyId, classId: $classId)
  }
`;

export const CON_SEAT = gql`
  mutation conSeat($email: String!, $seatId: String!) {
    conSeat(email: $email, seatId: $seatId)
  }
`;
