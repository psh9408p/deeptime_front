import React from 'react';
import styled from 'styled-components';
import NumberWithCommas from '../../../Components/Money/NumberWithCommas';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
`;

const ContentDiv = styled.div`
  height: 60px;
  width: 100%;
  display: inline-flex;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const ContentDiv_order = styled.div`
  height: 60px;
  padding: 0 15px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const ContentDiv_form = styled.form`
  height: 60px;
  padding: 0 15px;
  width: 100%;
  display: inline-flex;
  align-items: center;
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

const SubContent2 = styled.div`
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
    justify-content: flex-start;
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

const RaspberryInput = styled.input`
  height: 50%;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.skyBlue};
  font-weight: 600;
  border-radius: 4px;
  border: ${(props) => props.theme.boxBorder};
  &:nth-child(2) {
    width: 300px;
    margin-right: 90px;
    justify-content: flex-start;
  }
  &:nth-child(3) {
    width: 80px;
    margin-right: 30px;
    justify-content: flex-start;
  }
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

const Content_No = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
    font-weight: 600;
    width: 160px;
    justify-content: flex-start;
  }
`;

const ModifyButton = styled.button`
  cursor: pointer;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-left: 30px;
  width: 80px;
  border: ${(props) => props.theme.boxBorder};
`;

export default ({ pageIndex, data }) => {
  const User = data.seeUser;
  const NumberOfRaspberry = new Array(User.organization.seatRatio * 8).fill(1);
  const date = new Date(User.paymentSet.membershipDate);
  const dateMonth =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1);
  const yesterDate =
    date.getDate() - 1 >= 10 ? date.getDate() - 1 : '0' + (date.getDate() - 1);
  // const dateDate = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();

  const openReceipt = (url) => {
    if (url === '' || url === undefined || url === null) {
      return;
    }
    window.open(url);
  };

  if (pageIndex === 0) {
    return (
      <Wrapper>
        <ContentDiv>
          <LeftDiv>이용 기간</LeftDiv>
          {date > new Date() ? (
            <RightDiv>
              {date.getFullYear()}.{dateMonth}.{yesterDate}
              .&nbsp;23:59&nbsp;까지
            </RightDiv>
          ) : (
            <RightDiv>이용권 등록필요</RightDiv>
          )}
        </ContentDiv>
        <ContentDiv>
          <LeftDiv>
            IAM 좌석 개수
            <br />
            (사용/최대)
          </LeftDiv>
          <RightDiv>1개 / {User.organization.seatRatio * 8}개</RightDiv>
        </ContentDiv>
      </Wrapper>
    );
  } else if (pageIndex === 1) {
    return (
      <Wrapper>
        <SubTitleDiv>
          <SubContent>날짜</SubContent>
          <SubContent>내용 (영수증)</SubContent>
          <SubContent>결제 수단</SubContent>
          <SubContent>금액(원)</SubContent>
        </SubTitleDiv>
        {User.payments.map((myPayment, index) => {
          const date = new Date(myPayment.paid_at * 1000);
          const dateMonth =
            date.getMonth() + 1 >= 10
              ? date.getMonth() + 1
              : '0' + (date.getMonth() + 1);
          const dateDate =
            date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          if (myPayment.pay_method === 'card') {
            myPayment.pay_method = '카드';
          }
          const amount = NumberWithCommas(myPayment.amount);
          const hours =
            date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
          const minutes =
            date.getMinutes() >= 10
              ? date.getMinutes()
              : '0' + date.getMinutes();
          return (
            <ContentDiv_order key={index}>
              <ContentInput
                type="button"
                onClick={() => openReceipt(myPayment.receipt_url)}
                value={`${date.getFullYear()}.${dateMonth}.${dateDate}. ${hours}:${minutes}`}
              />
              <Content>{myPayment.name}</Content>
              <Content>{myPayment.pay_method}</Content>
              <Content>{amount}</Content>
            </ContentDiv_order>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <SubTitleDiv>
          <SubContent2>No.</SubContent2>
          <SubContent2>기기 고유번호</SubContent2>
          <SubContent2>좌석 번호</SubContent2>
          <SubContent2 />
        </SubTitleDiv>
        {NumberOfRaspberry.map((_, index) => {
          return (
            <ContentDiv_form key={index} onClick={() => {}}>
              <Content_No>{index + 1}</Content_No>
              <RaspberryInput />
              <RaspberryInput />
              <ModifyButton>수정</ModifyButton>
            </ContentDiv_form>
          );
        })}
      </Wrapper>
    );
  }
};
