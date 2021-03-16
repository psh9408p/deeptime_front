import { gql } from 'apollo-boost';

export const MY_PAYMENTSET = gql`
  query myPaymentSet {
    myPaymentSet {
      id
      membershipDate
      membershipGrade
    }
  }
`;
