import React from 'react';
import { gql } from 'apollo-boost';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import PopupClose from '../Components/Buttons/PopupClose';
import Button_custom from '../Components/Buttons/Button_custom';
import NumberWithCommas from '../Components/Money/NumberWithCommas';
import { useMutation, useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import Loader from '../Components/Loader';
import { useHistory } from 'react-router-dom';

export const MY_PAYMENTSET = gql`
  query myPaymentSet {
    myPaymentSet {
      id
      user {
        id
        email
        fullName
        phoneNumber
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const Section = styled.div`
  min-width: 320px;
  padding: 40px 20px;
  h1 {
    font-size: 2.25rem;
    letter-spacing: -0.016em;
    line-height: 3.25rem;
    font-weight: 700;
    white-space: pre-line;
    text-align: left;
    margin-bottom: 32px;
  }
`;

const SectionTitle = styled.p`
  font-size: 2.25rem;
  letter-spacing: -0.016em;
  line-height: 3.25rem;
  font-weight: 700;
  white-space: pre-line;
  text-align: left;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    font-size: 3.75rem;
    letter-spacing: -0.02em;
    line-height: 5.5rem;
    font-weight: 700;
    margin-bottom: 60px;
    text-align: center;
  }
  @media (min-width: 1024px) {
    font-size: 4.25rem;
    letter-spacing: -0.02em;
    line-height: 5.5rem;
    font-weight: 700;
    margin-bottom: 60px;
    text-align: center;
  }
`;
const BoxWrap = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    min-width: 768px;
    justify-content: center;
  }
`;
const Box = styled.div`
  box-shadow: rgb(0 0 0 / 14%) 0px 3px 7px;
  border-radius: 8px;
  margin-bottom: 12px;
  @media (min-width: 768px) {
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    width: 296px;
  }
`;

const BoxTitle = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  /* background-color: rgb(246, 246, 246); */
  padding: 4px 12px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  @media (min-width: 768px) {
    padding: 8px 20px;
    height: 88px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 1.125rem;
    letter-spacing: -0.012em;
    line-height: 2rem;
    font-weight: bold;
  }
  @media (min-width: 1024px) {
    font-size: 1.375rem;
    letter-spacing: -0.014em;
    line-height: 2.5rem;
    font-weight: bold;
  }
`;

const Price = styled.div`
  box-sizing: border-box;
  padding: 12px 12px 8px;
`;

const Cost = styled.p`
  white-space: pre-line;
  font-size: 0.75rem;
  letter-spacing: -0.012em;
  line-height: 1.375rem;
  font-weight: 400;
  color: ${(props) => props.theme.darkGreyColor};
  text-decoration: line-through;
  text-align: right;
`;

const Cost2 = styled.p`
  white-space: pre-line;
  font-size: 1.125rem;
  letter-spacing: -0.012em;
  line-height: 2rem;
  font-weight: 700;
  text-align: right;
`;
const Discount = styled.p`
  justify-content: center;
  align-items: center;
  font-size: 0.625rem;
  font-weight: 700;
  width: 50px;
  height: 20px;
  line-height: 20px;
  border-radius: 4px;
  background-color: rgb(208, 4, 31);
  color: rgb(255, 255, 255);
  text-align: center;
  margin-top: 5.5px;
  margin-right: 5.5px;
`;

const Hidden = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: relative;
    width: fit-content;
    margin: 0px auto;
  }
`;

const HiddenItem = styled.p`
  display: none;

  @media (min-width: 768px) {
    display: block;
    font-size: 0.875rem;
    letter-spacing: -0.012em;
    line-height: 1.75rem;
    font-weight: 400;
    text-align: left;
    margin-left: 24px;
  }
`;

const OptionBox = styled.div`
  padding: 0px 12px 8px;
`;

const Option = styled.p`
  white-space: pre-line;
  font-size: 0.625rem;
  letter-spacing: -0.012em;
  line-height: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.darkGreyColor};
  text-align: left;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Buy = styled.button`
  display: none;
  @media (min-width: 768px) {
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    letter-spacing: -0.012em;
    font-weight: 400;
    display: block;
    width: 100%;
    height: 52px;
    line-height: 52px;
    margin-bottom: 12px;
    color: rgb(255, 255, 255);
    background-color: ${(props) => props.theme.classicBlue};
    border-radius: 0.25rem;
    text-align: center;
    cursor: pointer;
    padding: 0px 1rem;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 500px !important;
    /* max-height: 820px !important; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PaymentWrap = styled.div`
  width: 100%;
  padding: 20px;
`;

const SubTop = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 16px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.darkGreyColor};
  width: 100%;
`;

const ContentTitle = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
  font-weight: 600;
`;

const merchantName_1 = 'Basic 30일 이용권';
const merchantName_6 = 'Basic 180일 이용권';
const merchantName_12 = 'Basic 365일 이용권';
const price_1 = 100;
const price_6 = 200;
const price_12 = 300;
const discountPer_6 = 50;
const discountPer_12 = 70;

export default () => {
  let history = useHistory();

  const { data: paymentSetData, loading: paymentSetLoading } = useQuery(
    MY_PAYMENTSET,
  );

  const [payment_normal_mutation] = useMutation(PAYMENT_NORMAL);

  const billingOnclick = (merchantName, resultPrice) => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMPORT_CODE);
    const { id, user } = paymentSetData.myPaymentSet;

    IMP.request_pay(
      {
        // param
        pg: 'kakaopay',
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
        const success_msg = 'DEEPTIME 이용기간이 성공적으로 연장되었습니다.';
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

  const PaymentDiv = ({
    close,
    isFirst = false,
    merchantName,
    price,
    discountPer,
  }) => {
    return (
      <PaymentWrap>
        <PopupClose
          onClick={() => {
            close();
          }}
        />
        <SubTop>상품 확인 및 결제</SubTop>
        <ContentTitle>{merchantName}</ContentTitle>
        <Price>
          <Cost style={{ textDecoration: isFirst ? 'none' : 'lineThrough' }}>
            {isFirst
              ? '기본가'
              : `${NumberWithCommas((price / (100 - discountPer)) * 100)}원`}
          </Cost>
          <Flex>
            <Discount style={{ display: isFirst ? 'none' : 'flex' }}>
              {discountPer}% 할인
            </Discount>
            <Cost2>{NumberWithCommas(price)}원</Cost2>
          </Flex>
        </Price>
        <Button_custom
          width={'100%'}
          height={'50px'}
          margin={'0'}
          bgColor={'#0F4C82'}
          color={'white'}
          text={`${NumberWithCommas(price)}원 결제하기`}
          onClick={() => {
            billingOnclick(merchantName, price);
          }}
        />
      </PaymentWrap>
    );
  };

  if (paymentSetLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <Section>
        <SectionTitle>DeepTime 이용권</SectionTitle>
        <BoxWrap>
          <Box>
            <div>
              <BoxTitle>{merchantName_1}</BoxTitle>
              <div>
                <Price>
                  <Cost style={{ textDecoration: 'none' }}>기본가</Cost>
                  <Flex>
                    <Discount style={{ display: 'none' }}>기본가</Discount>
                    <Cost2>{NumberWithCommas(price_1)}원</Cost2>
                  </Flex>
                </Price>
                {/* <Hidden>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                  <HiddenItem>프리패스 150일 </HiddenItem>
                </Hidden> */}
              </div>
              <OptionBox>
                <PopupCustom
                  trigger={<Buy>구입하기</Buy>}
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) =>
                    PaymentDiv({
                      close,
                      isFirst: true,
                      merchantName: merchantName_1,
                      price: price_1,
                      discountPer: 0,
                    })
                  }
                </PopupCustom>
                {/* <Option>*쿠폰팩 미적용 가격</Option> */}
              </OptionBox>
            </div>
          </Box>
          <Box>
            <div>
              <BoxTitle>{merchantName_6}</BoxTitle>
              <div>
                <Price>
                  <Cost>
                    {NumberWithCommas((price_6 / (100 - discountPer_6)) * 100)}
                    원
                  </Cost>
                  <Flex>
                    <Discount>{discountPer_6}% 할인</Discount>
                    <Cost2>{NumberWithCommas(price_6)}원</Cost2>
                  </Flex>
                </Price>
                <OptionBox>
                  <Buy>구입하기</Buy>
                  {/* <Option>*쿠폰팩 미적용 가격</Option> */}
                </OptionBox>
              </div>
            </div>
          </Box>
          <Box>
            <div>
              <BoxTitle>{merchantName_6}</BoxTitle>
              <div>
                <Price>
                  <Cost>
                    {NumberWithCommas((price_6 / (100 - discountPer_6)) * 100)}
                    원
                  </Cost>
                  <Flex>
                    <Discount>{discountPer_6}% 할인</Discount>
                    <Cost2>{NumberWithCommas(price_6)}원</Cost2>
                  </Flex>
                </Price>
                <OptionBox>
                  <Buy>구입하기</Buy>
                  {/* <Option>*쿠폰팩 미적용 가격</Option> */}
                </OptionBox>
              </div>
            </div>
          </Box>
          <Box>
            <div>
              <BoxTitle>{merchantName_12}</BoxTitle>
              <div>
                <Price>
                  <Cost>
                    {NumberWithCommas(
                      (price_12 / (100 - discountPer_12)) * 100,
                    )}
                    원
                  </Cost>
                  <Flex>
                    <Discount>{discountPer_12}% 할인</Discount>
                    <Cost2>{NumberWithCommas(price_12)}원</Cost2>
                  </Flex>
                </Price>
                <OptionBox>
                  <Buy>구입하기</Buy>
                  {/* <Option>*쿠폰팩 미적용 가격</Option> */}
                </OptionBox>
              </div>
            </div>
          </Box>
        </BoxWrap>
      </Section>
    );
  }
};
