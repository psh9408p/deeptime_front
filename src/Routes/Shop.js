import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { Card } from '../Components/Icons';
import Button_pay from '../Components/Buttons/Button_pay';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loader from '../Components/Loader';

export const MY_PAYMENTSET = gql`
  query myPaymentSet {
    myPaymentSet {
      id
      paymentDate
      freeUse
      user {
        id
        email
        fullName
        phoneNumber
      }
    }
  }
`;

export const PAYMENT_BILL = gql`
  mutation payment_bill(
    $paymentSet_id: String!
    $freeUse: Boolean!
    $card_name: String!
    $customer_uid: String!
  ) {
    payment_bill(
      paymentSet_id: $paymentSet_id
      freeUse: $freeUse
      card_name: $card_name
      customer_uid: $customer_uid
    )
  }
`;

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 66px 30px 80px 30px;
`;

const TitleDiv = styled.div`
  font-size: 42px;
  line-height: 60px;
  margin-top: 20px;
  font-weight: bold;
`;

const DetailUl = styled.ul`
  margin: 16px 0px 40px;
  list-style: none;
  li {
    &:before {
      font-size: 12px;
      content: '■　';
      color: ${(props) => props.theme.lightGreyColor};
    }
    display: list-item;
    font-size: 18px;
    font-weight: 400;
    line-height: 32px;
  }
`;

const ButtonWrap = styled.div`
  width: 300px;
  height: 50px;
`;

export default () => {
  let history = useHistory();

  const {
    data: paymentSetData,
    loading: paymentSetLoading,
    refetch: paymentSetRefetch,
  } = useQuery(MY_PAYMENTSET);

  const [payment_bill_mutation] = useMutation(PAYMENT_BILL);

  const billingOnClick = () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMPORT_CODE);
    const { id, freeUse, user } = paymentSetData.myPaymentSet;

    if (freeUse) {
      if (
        window.confirm(
          '이미 무료 혜택을 받으셔서 바로 결제가 진행됩니다.\n그래도 진행하시겠습니까?',
        ) === false
      ) {
        return;
      }
    }

    const userId = user.id;
    const customer_uid = userId.substring(0, 5) + '_' + new Date().getTime();

    IMP.request_pay(
      {
        // param
        pg: 'danal',
        pay_method: 'card', // "card"만 지원됩니다
        merchant_uid: 'merchant_' + new Date().getTime(),
        customer_uid, //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다.
        name: '정기결제 카드 등록',
        amount: 0, // 0 으로 설정하여 빌링키 발급만 진행합니다.
        buyer_email: user.email,
        buyer_name: user.fullName,
        buyer_tel: user.phoneNumber,
      },
      async function (response) {
        // callback
        const success_msg = 'IAM 이용기간이 성공적으로 연장되었습니다.';
        Object.assign(response, { success_msg });
        if (response.success) {
          try {
            await payment_bill_mutation({
              variables: {
                paymentSet_id: id,
                freeUse,
                card_name: response.card_name,
                customer_uid,
              },
            });
            localStorage.setItem('billingBack', '/manage-subscription');
          } catch (e) {
            response.success = false;
            const realText = e.message.split('GraphQL error: ');
            response.error_msg = realText[1];
            localStorage.setItem('billingBack', '/shop');
          }
        } else {
          localStorage.setItem('billingBack', '/shop');
        }
        const query = queryString.stringify(response);
        history.push(`/payment/result?${query}`);
      },
    );
  };

  if (!paymentSetLoading && paymentSetData && paymentSetData.myPaymentSet) {
    return (
      <Wrapper>
        <Card />
        <TitleDiv>
          1개월 무료 혜택으로
          <br />
          IAM의 모든 학습 기능을 체험해보세요.
        </TitleDiv>
        <DetailUl>
          <li>1개월 무료 이용 후 자동결제 됩니다.</li>
          <li>
            (무료)이용 기간 만료 전에 구독을 해지하시면 다음 예약 결제가
            취소됩니다.
          </li>
          <li>1개월 무료 이용은 계정당 1회만 제공됩니다.</li>
        </DetailUl>
        <ButtonWrap>
          <Button_pay
            text={
              '구독 (카드 등록)' +
              '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
              '4,900원/월'
            }
            onClick={
              // billingOnClick
              () => {
                alert('지금은 무료로 모든 서비스 사용이 가능합니다.');
              }
            }
          />
        </ButtonWrap>
      </Wrapper>
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
};
