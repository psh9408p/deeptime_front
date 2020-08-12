import { gql } from 'apollo-boost';

export const DISCONNECT_STUDENT = gql`
  mutation disconnectStudent {
    disconnectStudent
  }
`;

export const CONNECT_STUDENT = gql`
  mutation connectStudent($secretCode: String!, $raspberrySerial: String!) {
    connectStudent(secretCode: $secretCode, raspberrySerial: $raspberrySerial)
  }
`;
