import { gql } from 'apollo-boost';

export const RASPBERRY_REGIST = gql`
  mutation raspberryRegist(
    $raspberryId: String!
    $seatNumber: Int!
    $organizationId: String!
    $registNumber: Int!
  ) {
    raspberryRegist(
      raspberryId: $raspberryId
      seatNumber: $seatNumber
      organizationId: $organizationId
      registNumber: $registNumber
    )
  }
`;

export const RASPBERRY_UNREGIST = gql`
  mutation raspberryUnRegist($raspberryId: String!) {
    raspberryUnRegist(raspberryId: $raspberryId)
  }
`;
