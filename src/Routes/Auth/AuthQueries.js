import { gql } from 'apollo-boost';

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $phoneNumber: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $address1: String!
    $address2: String!
    $termsOfMarketing: Boolean!
    $studyPurpose: String!
    $studyGroup: String!
    $studyGroup2: String!
    $studyGroup3: String!
  ) {
    createAccount(
      username: $username
      email: $email
      phoneNumber: $phoneNumber
      firstName: $firstName
      lastName: $lastName
      password: $password
      address1: $address1
      address2: $address2
      termsOfMarketing: $termsOfMarketing
      studyPurpose: $studyPurpose
      studyGroup: $studyGroup
      studyGroup2: $studyGroup2
      studyGroup3: $studyGroup3
    )
  }
`;

export const CREATE_ACCOUNT_M = gql`
  mutation createAccount_M(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $phoneNumber: String!
    $organizationName: String!
    $password: String!
    $address1: String!
    $address2: String!
    $detailAddress: String!
    $termsOfMarketing: Boolean!
  ) {
    createAccount_M(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      phoneNumber: $phoneNumber
      organizationName: $organizationName
      password: $password
      address1: $address1
      address2: $address2
      detailAddress: $detailAddress
      termsOfMarketing: $termsOfMarketing
    )
  }
`;

export const REQUEST_LOGIN = gql`
  mutation requestLogin($email: String!, $password: String!) {
    requestLogin(email: $email, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
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

export const S_PHONE_FINDEMAIL = gql`
  mutation startPhoneFindEmail($phoneNumber: String!) {
    startPhoneFindEmail(phoneNumber: $phoneNumber)
  }
`;

export const C_PHONE_FINDEMAIL = gql`
  mutation completePhoneFindEmail($phoneNumber: String!, $key: String!) {
    completePhoneFindEmail(phoneNumber: $phoneNumber, key: $key)
  }
`;

export const S_EMAIL_FINDPASSWORD = gql`
  mutation startEmailFindPassword($emailAdress: String!) {
    startEmailFindPassword(emailAdress: $emailAdress)
  }
`;

export const C_EMAIL_FINDPASSWORD = gql`
  mutation completeEmailFindPassword($emailAdress: String!, $key: String!) {
    completeEmailFindPassword(emailAdress: $emailAdress, key: $key)
  }
`;
