import { gql } from 'apollo-boost';

export const EDIT_ACCOUNT = gql`
  mutation editAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $phoneNumber: String!
    $studyGroup: String!
    $studyGroup2: String!
    $studyGroup3: String!
    $address1: String!
    $address2: String!
    $termsOfMarketing: Boolean!
  ) {
    editAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      phoneNumber: $phoneNumber
      studyGroup: $studyGroup
      studyGroup2: $studyGroup2
      studyGroup3: $studyGroup3
      address1: $address1
      address2: $address2
      termsOfMarketing: $termsOfMarketing
    )
  }
`;
