import { gql } from "apollo-boost"

export const DELETE_SCHOOL = gql`
  mutation deleteSchool($zipCode: String!) {
    deleteSchool(zipCode: $zipCode)
  }
`

export const EDIT_SCHOOL = gql`
  mutation editSchool($name: String!, $zipCode: String!, $address: String!, $level: String!) {
    editSchool(name: $name, zipCode: $zipCode, address: $address, level: $level)
  }
`
