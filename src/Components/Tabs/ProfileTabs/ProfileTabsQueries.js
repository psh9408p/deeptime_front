import { gql } from "apollo-boost"

export const MY_SCHOOL = gql`
  query mySchool {
    mySchool {
      name
      zipCode
      address
      level
      studentsCount
    }
  }
`

export const MY_ACADEMY = gql`
  query myAcademy {
    myAcademy {
      name
      zipCode
      address
      detailAddress
      kind
      studentsCount
    }
  }
`

export const MY_READINGROOM = gql`
  query myReadingRoom {
    myReadingRoom {
      name
      zipCode
      address
      detailAddress
      kind
      studentsCount
    }
  }
`

export const ADD_SCHOOL = gql`
  mutation addSchool($name: String!, $zipCode: String!, $address: String!, $level: String!) {
    addSchool(name: $name, zipCode: $zipCode, address: $address, level: $level)
  }
`

export const ADD_ACADEMY = gql`
  mutation addAcademy(
    $name: String!
    $zipCode: String!
    $address: String!
    $detailAddress: String!
    $kind: String!
  ) {
    addAcademy(
      name: $name
      zipCode: $zipCode
      address: $address
      detailAddress: $detailAddress
      kind: $kind
    )
  }
`

export const ADD_READINGROOM = gql`
  mutation addReadingRoom(
    $name: String!
    $zipCode: String!
    $address: String!
    $detailAddress: String!
    $kind: String!
  ) {
    addReadingRoom(
      name: $name
      zipCode: $zipCode
      address: $address
      detailAddress: $detailAddress
      kind: $kind
    )
  }
`
