import { gql } from 'apollo-boost';

export const DELETE_ACADEMY = gql`
  mutation deleteAcademy($zipCode: String!) {
    deleteAcademy(zipCode: $zipCode)
  }
`;

export const EDIT_ACADEMY = gql`
  mutation editAcademy(
    $name: String!
    $zipCode: String!
    $address1: String!
    $address2: String!
    $detailAddress: String!
    $kind: String!
  ) {
    editAcademy(
      name: $name
      zipCode: $zipCode
      address1: $address1
      address2: $address2
      detailAddress: $detailAddress
      kind: $kind
    )
  }
`;
