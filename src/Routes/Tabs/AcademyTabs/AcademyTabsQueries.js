import { gql } from 'apollo-boost';

export const MY_ACADEMY = gql`
  query myAcademy {
    myAcademy {
      name
      zipCode
      address1
      address2
      detailAddress
      kind
      studentsCount
    }
  }
`;

export const ADD_ACADEMY = gql`
  mutation addAcademy(
    $name: String!
    $zipCode: String!
    $address1: String!
    $address2: String!
    $detailAddress: String!
    $kind: String!
  ) {
    addAcademy(
      name: $name
      zipCode: $zipCode
      address1: $address1
      address2: $address2
      detailAddress: $detailAddress
      kind: $kind
    )
  }
`;
