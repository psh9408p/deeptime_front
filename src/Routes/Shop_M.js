import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { Card } from '../Components/Icons';
import Button_pay from '../Components/Buttons/Button_pay';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loader from '../Components/Loader';
import NumberWithCommas from '../Components/Money/NumberWithCommas';

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
        organization {
          seatRatio
        }
      }
    }
  }
`;

export const PAYMENT_NORMAL = gql`
  mutation payment_nomal($paymentSet_id: String!, $imp_uid: String!) {
    payment_nomal(paymentSet_id: $paymentSet_id, imp_uid: $imp_uid)
  }
`;

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 25px 0;
`;

const BasicBox = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 30px 30px;
  background-color: white;
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleDiv = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const ItemDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 180px;
  padding: 25px;
  margin: 10px 0;
  background-color: ${(props) => props.theme.classicBlue};
  border-radius: 4px;
  color: white;
`;

const UpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
`;

const BottomLeft = styled.div`
  width: 30%;
  height: 100%;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  flex-direction: column-reverse;
`;

const BottomRight = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
`;

const RightUpper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row-reverse;
`;

const RightDiscount = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  font-size: 12px;
  color: ${(props) => props.theme.lightGreyColor};
`;

const RightPrice = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: row-reverse;
  text-decoration: line-through;
  align-items: flex-end;
  font-size: 18px;
  font-weight: 500;
`;

const RightBottom = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  font-size: 22px;
  font-weight: 700;
`;

const ItemTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 7px;
`;

const ItemSubTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.lightGreyColor};
`;

let seatRatio = 1; // 1~8좌석 1  9~16좌석 2 ...
let merchantName_1 = '';
let merchantName_6 = '';
let merchantName_12 = '';
let resultPrice_1 = 99999999;
let resultPrice_6 = 99999999;
let resultPrice_12 = 99999999;

export default () => {
  let history = useHistory();
  const price_1 = 109000;
  const price_6 = 570000;
  const price_12 = 890000;
  const discountPer_6 = 13;
  const discountPer_12 = 32;

  const {
    data: paymentSetData,
    loading: paymentSetLoading,
    refetch: paymentSetRefetch,
  } = useQuery(MY_PAYMENTSET);

  const [payment_normal_mutation] = useMutation(PAYMENT_NORMAL);

  const billingOnclick = (merchantName, resultPrice) => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMPORT_CODE);
    const { id, freeUse, user } = paymentSetData.myPaymentSet;

    IMP.request_pay(
      {
        // param
        pg: 'danal',
        pay_method: 'card', // "card"만 지원됩니다
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: merchantName,
        amount: resultPrice,
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
            await payment_normal_mutation({
              variables: {
                paymentSet_id: id,
                imp_uid: response.imp_uid,
              },
            });
            localStorage.setItem('billingBack', '/');
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
    seatRatio = paymentSetData.myPaymentSet.user.organization.seatRatio;
    merchantName_1 = `IAM 1개월 이용권 (${8 * (seatRatio - 1) + 1}~${
      8 * seatRatio
    }개 좌석)`;
    merchantName_6 = `IAM 6개월 이용권 (${8 * (seatRatio - 1) + 1}~${
      8 * seatRatio
    }개 좌석)`;
    merchantName_12 = `IAM 12개월 이용권 (${8 * (seatRatio - 1) + 1}~${
      8 * seatRatio
    }개 좌석)`;
    resultPrice_1 = price_1 * seatRatio;
    resultPrice_6 = price_6 * seatRatio;
    resultPrice_12 = price_12 * seatRatio;
    // resultPrice_1 = 101;
    // resultPrice_6 = 102;
    // resultPrice_12 = 103;

    return (
      <Wrapper>
        <BasicBox>
          <TitleDiv>Basic 상품</TitleDiv>
          <ItemDiv
            onClick={() => billingOnclick(merchantName_1, resultPrice_1)}
          >
            <UpperDiv>
              <ItemTitle>Basic 1</ItemTitle>
              <ItemSubTitle>{merchantName_1}</ItemSubTitle>
            </UpperDiv>
            <BottomDiv>
              <BottomLeft>
                {NumberWithCommas(price_1 * seatRatio)}원/월
              </BottomLeft>
              <BottomRight>
                <RightBottom>{NumberWithCommas(resultPrice_1)}원</RightBottom>
                <RightUpper>
                  <RightPrice></RightPrice>
                  <RightDiscount></RightDiscount>
                </RightUpper>
              </BottomRight>
            </BottomDiv>
          </ItemDiv>
          <ItemDiv
            onClick={() => billingOnclick(merchantName_6, resultPrice_6)}
          >
            <UpperDiv>
              <ItemTitle>Basic 6</ItemTitle>
              <ItemSubTitle>{merchantName_6}</ItemSubTitle>
            </UpperDiv>
            <BottomDiv>
              <BottomLeft>
                {NumberWithCommas(Math.round((price_6 * seatRatio) / 6))}원/월
              </BottomLeft>
              <BottomRight>
                <RightBottom>{NumberWithCommas(resultPrice_6)}원</RightBottom>
                <RightUpper>
                  <RightPrice>
                    {NumberWithCommas(price_1 * seatRatio * 6)}원
                  </RightPrice>
                  <RightDiscount>약 {discountPer_6}% 할인</RightDiscount>
                </RightUpper>
              </BottomRight>
            </BottomDiv>
          </ItemDiv>
          <ItemDiv
            onClick={() => billingOnclick(merchantName_12, resultPrice_12)}
          >
            <UpperDiv>
              <ItemTitle>Basic 12</ItemTitle>
              <ItemSubTitle>{merchantName_12}</ItemSubTitle>
            </UpperDiv>
            <BottomDiv>
              <BottomLeft>
                {NumberWithCommas(Math.round((price_12 * seatRatio) / 12))}원/월
              </BottomLeft>
              <BottomRight>
                <RightBottom>{NumberWithCommas(resultPrice_12)}원</RightBottom>
                <RightUpper>
                  <RightPrice>
                    {NumberWithCommas(price_1 * seatRatio * 12)}원
                  </RightPrice>
                  <RightDiscount>약 {discountPer_12}% 할인</RightDiscount>
                </RightUpper>
              </BottomRight>
            </BottomDiv>
          </ItemDiv>
        </BasicBox>
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
