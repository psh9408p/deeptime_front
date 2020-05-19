import { gql } from 'apollo-boost';

export const DELETE_STUDENT = gql`
  mutation deleteStudent(
    $email: String!
    $academyId: String!
    $classId: String!
  ) {
    deleteStudent(email: $email, academyId: $academyId, classId: $classId)
  }
`;

export const DISCON_SEAT = gql`
  mutation disconSeat($email: String!) {
    disconSeat(email: $email)
  }
`;

export const EDIT_STUDENT = gql`
  mutation editStudent(
    $email: String!
    $academyId: String!
    $classId: String!
  ) {
    editStudent(email: $email, academyId: $academyId, classId: $classId)
  }
`;
