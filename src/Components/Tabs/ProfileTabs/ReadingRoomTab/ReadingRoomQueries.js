import { gql } from "apollo-boost"

export const DELETE_READINGROOM = gql`
  mutation deleteReadingRoom($zipCode: String!) {
    deleteReadingRoom(zipCode: $zipCode)
  }
`

export const EDIT_READINGROOM = gql`
  mutation editReadingRoom(
    $name: String!
    $zipCode: String!
    $address: String!
    $detailAddress: String!
    $kind: String!
  ) {
    editReadingRoom(
      name: $name
      zipCode: $zipCode
      address: $address
      detailAddress: $detailAddress
      kind: $kind
    )
  }
`
