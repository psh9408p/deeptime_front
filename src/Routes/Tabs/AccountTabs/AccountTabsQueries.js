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

export const EDIT_PASSWORD = gql`
  mutation editPassword($password_pre: String!, $password: String!) {
    editPassword(password_pre: $password_pre, password: $password)
  }
`;

export const S_PHONE_VERIFICATION = gql`
  mutation startPhoneVerification($phoneNumber: String!) {
    startPhoneVerification(phoneNumber: $phoneNumber)
  }
`;

export const C_PHONE_VERIFICATION = gql`
  mutation completePhoneVerification($phoneNumber: String!, $key: String!) {
    completePhoneVerification(phoneNumber: $phoneNumber, key: $key)
  }
`;

export const S_EMAIL_VERIFICATION = gql`
  mutation startEmailVerification($emailAdress: String!) {
    startEmailVerification(emailAdress: $emailAdress)
  }
`;

export const C_EMAIL_VERIFICATION = gql`
  mutation completeEmailVerification($emailAdress: String!, $key: String!) {
    completeEmailVerification(emailAdress: $emailAdress, key: $key)
  }
`;
