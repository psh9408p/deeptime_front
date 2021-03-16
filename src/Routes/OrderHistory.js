import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import NumberWithCommas from '../Components/Money/NumberWithCommas';

export const MY_PAYMENT = gql`
  query my_payment {
    my_payment {
      id
      name
      paid_at
      pay_method
      amount
      receipt_url
    }
  }
`;

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
`;

const TitleDiv = styled.div`
  height: 24px;
  padding: 30px 0;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${(props) => props.theme.darkGreyColor};
`;

const SubTitleDiv = styled.div`
  height: 30px;
  width: 100%;
  display: inline-flex;
  padding: 0 15px;
  border-bottom: ${(props) => props.theme.boxBorder};
  font-size: 14px;
  color: ${(props) => props.theme.darkGreyColor};
  border-bottom: 2px solid ${(props) => props.theme.darkGreyColor};
`;

const ContentDiv = styled.div`
  height: 60px;
  padding: 0 15px;
  width: 100%;
  display: inline-flex;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const SubContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  &:first-child {
    width: 160px;
    justify-content: flex-start;
  }
  &:nth-child(2) {
    width: 390px;
    justify-content: flex-start;
  }
  &:nth-child(3) {
    width: 110px;
    justify-content: flex-end;
  }
  &:last-child {
    width: 110px;
    justify-content: flex-end;
  }
`;

const ContentInput = styled.input`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.skyBlue};
  font-weight: 600;
  width: 160px;
  justify-content: flex-start;
  border: 0;
  background-color: transparent;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  &:nth-child(2) {
    font-weight: 600;
    width: 390px;
    justify-content: flex-start;
  }
  &:nth-child(3) {
    width: 110px;
    justify-content: flex-end;
  }
  &:last-child {
    width: 110px;
    justify-content: flex-end;
  }
`;

export default () => {
  const { data: paymentData, loading: paymentLoading } = useQuery(MY_PAYMENT);

  const openReceipt = (url) => {
    if (url === '' || url === undefined || url === null) {
      alert('영수증 기간 만료 또는 영수증 정보가 없습니다.');
      return;
    }
    window.open(url);
  };

  if (!paymentLoading && paymentData && paymentData.my_payment) {
    // console.log(paymentData.my_payment);
    return (
      <Wrapper>
        <TitleDiv>결제/이용권 내역</TitleDiv>
        <SubTitleDiv>
          <SubContent>날짜(영수증)</SubContent>
          <SubContent>내용</SubContent>
          <SubContent>결제 수단</SubContent>
          <SubContent>금액(원)</SubContent>
        </SubTitleDiv>
        {paymentData.my_payment.map((myPayment, index) => {
          const date = new Date(myPayment.paid_at * 1000);
          const dateMonth =
            date.getMonth() + 1 >= 10
              ? date.getMonth() + 1
              : '0' + (date.getMonth() + 1);
          const dateDate =
            date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          if (myPayment.pay_method === 'card') {
            myPayment.pay_method = '카드';
          } else if (myPayment.pay_method === 'point') {
            myPayment.pay_method = '간편결제';
          }
          const amount = NumberWithCommas(myPayment.amount);
          const hours =
            date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
          const minutes =
            date.getMinutes() >= 10
              ? date.getMinutes()
              : '0' + date.getMinutes();
          return (
            <ContentDiv key={index}>
              <ContentInput
                type="button"
                onClick={() => openReceipt(myPayment.receipt_url)}
                value={`${date.getFullYear()}.${dateMonth}.${dateDate}. ${hours}:${minutes}`}
              />
              <Content>{myPayment.name}</Content>
              <Content>{myPayment.pay_method}</Content>
              <Content>{amount}</Content>
            </ContentDiv>
          );
        })}
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
