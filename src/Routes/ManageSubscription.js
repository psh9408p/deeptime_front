import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Button_blue from '../Components/Buttons/Button_blue';
import Loader from '../Components/Loader';
import NumberWithCommas from '../Components/Money/NumberWithCommas';

export const MY_PAYMENTSET = gql`
  query myPaymentSet {
    myPaymentSet {
      membershipDate
      pay_method
      card_name
      card_number
      payBooking
      amountBooking
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
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${(props) => props.theme.darkGreyColor};
`;

const ContentDiv = styled.div`
  height: 60px;
  width: 100%;
  display: inline-flex;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const LeftDiv = styled.div`
  width: 160px;
  height: 100%;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #636c73;
`;

const RightDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: black;
  font-weight: 700;
`;

const LastDiv = styled.div`
  margin-top: 40px;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  width: 300px;
  height: 100%;
`;

export default () => {
  const {
    data: paymentSetData,
    loading: paymentSetLoading,
    refetch: paymentSetRefetch,
  } = useQuery(MY_PAYMENTSET);

  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }
  //   paymentSetRefetch();
  // }, []);

  if (!paymentSetLoading && paymentSetData && paymentSetData.myPaymentSet) {
    let {
      membershipDate,
      pay_method,
      card_name,
      card_number,
      payBooking,
      amountBooking,
    } = paymentSetData.myPaymentSet;
    const date = new Date(membershipDate);
    const amout = NumberWithCommas(amountBooking);
    const cardFour = card_number.split('****')[1];
    if (pay_method === 'card') {
      pay_method = '카드';
    }

    return (
      <Wrapper>
        {payBooking ? (
          <>
            <TitleDiv>구독 관리</TitleDiv>
            <ContentDiv>
              <LeftDiv>이용 기간</LeftDiv>
              <RightDiv>
                {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate() - 1}
                .&nbsp;23:59&nbsp;까지
              </RightDiv>
            </ContentDiv>
            <ContentDiv>
              <LeftDiv>다음 결제 예정일</LeftDiv>
              <RightDiv>
                {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}.
              </RightDiv>
            </ContentDiv>
            <ContentDiv>
              <LeftDiv>결제 예정 금액</LeftDiv>
              <RightDiv>{amout}원</RightDiv>
            </ContentDiv>
            <ContentDiv>
              <LeftDiv>결제 수단</LeftDiv>
              <RightDiv>
                [{pay_method}]&nbsp;{card_name}
                &nbsp;&nbsp;****&nbsp;****&nbsp;****&nbsp;
                {cardFour}
              </RightDiv>
            </ContentDiv>
            <LastDiv>
              <ButtonDiv>
                <Button_blue text={'구독 해지 예약'} />
              </ButtonDiv>
            </LastDiv>
          </>
        ) : (
          <>
            <TitleDiv>구독 관리</TitleDiv>
            <ContentDiv>
              <LeftDiv>이용 기간</LeftDiv>
              <RightDiv>2020.12.12</RightDiv>
            </ContentDiv>
            <ContentDiv>
              <LeftDiv>다음 결제 예정일</LeftDiv>
              <RightDiv>2020.12.12</RightDiv>
            </ContentDiv>
            <LastDiv>
              <ButtonDiv>
                <Button_blue text={'구독 해지 예약'} />
              </ButtonDiv>
            </LastDiv>
          </>
        )}
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
