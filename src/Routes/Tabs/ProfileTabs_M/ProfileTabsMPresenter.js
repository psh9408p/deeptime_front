import React from 'react';
import styled from 'styled-components';
import NumberWithCommas from '../../../Components/Money/NumberWithCommas';
import Popup from 'reactjs-popup';
import PopupButton from '../../../Components/Buttons/PopupButton';
import Input from '../../../Components/Input';
import FatText from '../../../Components/FatText';
import PopButton from '../../../Components/Buttons/PopButton';

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

const ContentDiv_Rasp = styled.div`
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

const RaspberryDiv = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  font-weight: 600;
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
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 250px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 20px 20px;
  }
`;

const SmallInput = styled(Input)`
  width: 200px;
  margin-right: 15px;
  margin-left: 41px;
`;

const LargeInput = styled(Input)`
  max-width: 300px;
  margin-bottom: 15px;
  margin-left: 41px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const SmallDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 7px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadButton = styled.button`
  border: 0;
  width: 140px;
  height: 25px;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 12px;
  outline-color: black;
  background-color: #e74c3c;
  cursor: pointer;
`;

export default ({
  pageIndex,
  data,
  raspberryId,
  seatNumber,
  RaspberryClear,
  RaspberryLoad,
}) => {
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
            <ContentDiv_Rasp key={index}>
              <Content_No>{index + 1}</Content_No>
              <RaspberryDiv>
                {User.organization.raspberries[index] !== undefined
                  ? User.organization.raspberries[index].id
                  : '미등록'}
              </RaspberryDiv>
              <RaspberryDiv>
                {User.organization.raspberries[index] !== undefined &&
                  User.organization.raspberries[index].seatNumber}
              </RaspberryDiv>
              <PopupCustom
                trigger={<PopButton text={'등록/수정'} />}
                closeOnDocumentClick={false}
                modal
              >
                {(close) => (
                  <PBody>
                    <form
                    // onSubmit={async () => {
                    //   const fucResult = await onSubmit();
                    //   if (fucResult) {
                    //     close();
                    //   }
                    // }}
                    >
                      <PTitle text={'기기 정보'} />
                      <SmallDiv>
                        <SmallInput
                          placeholder={'좌석 번호 (예: 12)'}
                          {...seatNumber}
                        />
                        <LoadButton
                          type="button"
                          onClick={() => {
                            if (
                              User.organization.raspberries[index] !== undefined
                            ) {
                              RaspberryLoad(
                                User.organization.raspberries[index].seatNumber,
                                User.organization.raspberries[index].id,
                              );
                            }
                          }}
                        >
                          기존정보 불러오기
                        </LoadButton>
                      </SmallDiv>
                      <div>
                        <LargeInput
                          placeholder={
                            '기기 고유번호 (예: ckcbctntg002b0728rc6ei1td)'
                          }
                          {...raspberryId}
                        />{' '}
                      </div>
                      <ButtonDiv>
                        <PopupButton text={'등록/수정'} />
                        <PopupButton
                          type="button"
                          onClick={() => {
                            close();
                            RaspberryClear();
                          }}
                          text={'닫기'}
                        />
                      </ButtonDiv>
                    </form>
                  </PBody>
                )}
              </PopupCustom>
            </ContentDiv_Rasp>
          );
        })}
      </Wrapper>
    );
  }
};
