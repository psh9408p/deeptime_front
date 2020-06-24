import { gql } from 'apollo-boost';

export const MY_PAYMENTSET = gql`
  query myPaymentSet {
    myPaymentSet {
      id
      membershipDate
      pay_method
      card_name
      card_number
      payBooking
      amountBooking
      cancel_date
      billingKey
      user {
        id
        email
        fullName
        phoneNumber
      }
    }
  }
`;
export const PAY_CANCEL = gql`
  mutation payment_bill_cancel {
    payment_bill_cancel
  }
`;
export const PAY_RESUB = gql`
  mutation payment_rebill($membershipDate: String!) {
    payment_rebill(membershipDate: $membershipDate)
  }
`;

export const PAY_CHANGEBILL = gql`
  mutation payment_changeBill(
    $paymentSet_id: String!
    $amountBooking: Int!
    $membershipDate: String!
    $billingKey_new: String!
    $billingKey_old: String!
    $card_name: String!
  ) {
    payment_changeBill(
      paymentSet_id: $paymentSet_id
      amountBooking: $amountBooking
      membershipDate: $membershipDate
      billingKey_new: $billingKey_new
      billingKey_old: $billingKey_old
      card_name: $card_name
    )
  }
`;
