import React from 'react';
import styled from 'styled-components';
import Button_blue from '../../Components/Buttons/Button_blue';
import NumberWithCommas from '../../Components/Money/NumberWithCommas';
import { Link } from 'react-router-dom';

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

const RightInput = styled.input`
  cursor: pointer;
  color: ${(props) => props.theme.skyBlue};
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  border: 0;
  background-color: transparent;
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

let pay_method = '';

export default ({ paymentSetData, SubCancel, ReSub, billingChange }) => {
  const date = new Date(paymentSetData.membershipDate);
  const date_cancel = new Date(paymentSetData.cancel_date);
  const dateMonth =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1);
  const yesterDate =
    date.getDate() - 1 >= 10 ? date.getDate() - 1 : '0' + (date.getDate() - 1);
  const dateDate = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();

  const amout = NumberWithCommas(paymentSetData.amountBooking);
  const cardFour = paymentSetData.card_number.split('****')[1];
  if (paymentSetData.pay_method === 'card') {
    pay_method = '??????';
  }

  return (
    <Wrapper>
      {paymentSetData.payBooking && new Date().getTime() < date.getTime() && (
        <>
          <TitleDiv>?????? ??????</TitleDiv>
          <ContentDiv>
            <LeftDiv>?????? ??????</LeftDiv>
            <RightDiv>
              {date.getFullYear()}.{dateMonth}.{yesterDate}
              .&nbsp;23:59&nbsp;??????
            </RightDiv>
          </ContentDiv>
          <ContentDiv>
            <LeftDiv>?????? ?????? ?????????</LeftDiv>
            <RightDiv>
              {date.getFullYear()}.{dateMonth}.{dateDate}.
            </RightDiv>
          </ContentDiv>
          <ContentDiv>
            <LeftDiv>?????? ?????? ??????</LeftDiv>
            <RightDiv>{amout}???</RightDiv>
          </ContentDiv>
          <ContentDiv>
            <LeftDiv>?????? ??????</LeftDiv>
            <RightDiv>
              [{pay_method}]&nbsp;{paymentSetData.card_name}
              &nbsp;&nbsp;****&nbsp;****&nbsp;****&nbsp;
              {cardFour}
            </RightDiv>
            <RightDiv>
              <RightInput
                type="button"
                onClick={() => billingChange()}
                value="?????? ?????? ??????"
              />
            </RightDiv>
          </ContentDiv>
          <LastDiv>
            <ButtonDiv>
              <Button_blue
                text={'?????? ?????? ??????'}
                onClick={() => SubCancel()}
              />
            </ButtonDiv>
          </LastDiv>
        </>
      )}
      {!paymentSetData.payBooking && new Date().getTime() < date.getTime() && (
        <>
          <TitleDiv>?????? ??????</TitleDiv>
          <ContentDiv>
            <LeftDiv>?????? ??????</LeftDiv>
            <RightDiv>
              {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate() - 1}
              .&nbsp;23:59&nbsp;??????
            </RightDiv>
          </ContentDiv>
          <ContentDiv>
            <LeftDiv>?????? ?????? ??????</LeftDiv>
            <RightDiv>
              {date_cancel.getFullYear()}.{date_cancel.getMonth() + 1}.
              {date_cancel.getDate()}.
            </RightDiv>
          </ContentDiv>
          <LastDiv>
            <ButtonDiv>
              <Button_blue
                text={'?????? ?????? ?????? ??????'}
                onClick={() => ReSub()}
              />
            </ButtonDiv>
          </LastDiv>
        </>
      )}
      {new Date().getTime() >= date.getTime() && (
        <>
          <TitleDiv>?????? ??????</TitleDiv>
          <ContentDiv>
            <LeftDiv>?????? ??????</LeftDiv>
            <RightDiv>??????</RightDiv>
          </ContentDiv>
          <LastDiv>
            {/* <Link to="/shop"> */}
            <Link
              onClick={() => {
                alert(
                  '????????? ????????? ?????? ?????? ???????????????. ????????? ???????????????~ ????',
                );
              }}
            >
              <ButtonDiv>
                <Button_blue text={'?????? ????????????'} />
              </ButtonDiv>
            </Link>
          </LastDiv>
        </>
      )}
    </Wrapper>
  );
};
