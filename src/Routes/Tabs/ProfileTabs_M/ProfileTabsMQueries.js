import { gql } from 'apollo-boost';

export const RASPBERRYSEAT_REGIST = gql`
  mutation raspberrySeatRegist(
    $organizationId: String!
    $raspberryId: String!
    $seatNumber: Int!
  ) {
    raspberrySeatRegist(
      organizationId: $organizationId
      raspberryId: $raspberryId
      seatNumber: $seatNumber
    )
  }
`;

export const RASPBERRYSEAT_UNREGIST = gql`
  mutation raspberrySeatUnRegist($raspberryId: String!) {
    raspberrySeatUnRegist(raspberryId: $raspberryId)
  }
`;

export const DISCONNECT_STUDENT = gql`
  mutation disconnectStudent_M($studentId: String!) {
    disconnectStudent_M(studentId: $studentId)
  }
`;
