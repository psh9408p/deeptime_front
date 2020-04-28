import { gql } from "apollo-boost"

export const DELETE_ACADEMY = gql`
  mutation deleteAcademy($zipCode: String!) {
    deleteAcademy(zipCode: $zipCode)
  }
`

export const EDIT_ACADEMY = gql`
  mutation editAcademy(
    $name: String!
    $zipCode: String!
    $address: String!
    $detailAddress: String!
    $kind: String!
  ) {
    editAcademy(
      name: $name
      zipCode: $zipCode
      address: $address
      detailAddress: $detailAddress
      kind: $kind
    )
  }
`
