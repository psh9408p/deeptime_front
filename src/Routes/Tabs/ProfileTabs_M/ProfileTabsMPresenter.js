import React from 'react';
import styled from 'styled-components';
import NumberWithCommas from '../../../Components/Money/NumberWithCommas';
import Popup from 'reactjs-popup';
import PopupButton_triple from '../../../Components/Buttons/PopupButton_triple';
import Input from '../../../Components/Input';
import FatText from '../../../Components/FatText';
import PopButton from '../../../Components/Buttons/PopButton';
import phoneNumberNormalize from '../../../Components/phoneNumberNormalize';

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
    width: 170px;
    justify-content: flex-start;
  }
  &:nth-child(2) {
    width: 120px;
    justify-content: flex-start;
  }
  &:nth-child(3) {
    width: 180px;
    justify-content: flex-start;
  }
  &:nth-child(4) {
    width: 150px;
    justify-content: flex-start;
  }
  &:last-child {
    width: 150px;
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
  &:first-child {
    width: 150px;
    margin-right: 20px;
    justify-content: flex-start;
  }
  &:nth-child(2) {
    width: 100px;
    margin-right: 20px;
    justify-content: flex-start;
    color: ${(props) => props.theme.classicBlue};
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

const StudentDiv = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.skyBlue};
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  width: 160px;
  margin-right: 20px;
  justify-content: flex-start;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 520px !important;
    height: 200px !important;
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
  width: 270px;
  margin-right: 15px;
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
  justify-content: center;
  margin-bottom: 20px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

const UnRegistButton = styled.button`
  border: 0;
  width: 100px;
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
  seatNumber,
  RaspberryClear,
  onRegist,
  onUnRegist,
  onUnMountStudent,
}) => {
  let keyCount = 0;
  const User = data.seeUser;
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
    let registSeatCount = 0;
    let raspberryCount = 0;
    for (let i = 0; i < data.seeUser.organization.hubs.length; i++) {
      for (
        let j = 0;
        j < data.seeUser.organization.hubs[i].raspberries.length;
        j++
      ) {
        raspberryCount = raspberryCount + 1;
        if (
          data.seeUser.organization.hubs[i].raspberries[j].seatNumber !== null
        ) {
          registSeatCount = registSeatCount + 1;
        }
      }
    }
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
            (등록/최대)
          </LeftDiv>
          <RightDiv>
            {registSeatCount}개 / {raspberryCount}개
          </RightDiv>
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
          <SubContent2>캠 시리얼 넘버</SubContent2>
          <SubContent2>좌석 번호</SubContent2>
          <SubContent2>학생 이름(연락처)</SubContent2>
          <SubContent2 />
          <SubContent2 />
        </SubTitleDiv>
        {User.organization.hubs.map((hub, index1) =>
          hub.raspberries.map((raspberry, index2) => {
            keyCount = keyCount + 1;
            return (
              <ContentDiv_Rasp key={keyCount}>
                <RaspberryDiv>{raspberry.serialNumber}</RaspberryDiv>
                <RaspberryDiv>{raspberry?.seatNumber}</RaspberryDiv>
                <StudentDiv
                  onClick={() => {
                    if (raspberry.user !== null) {
                      alert(
                        `해당 학생의 연락처는 ${phoneNumberNormalize(
                          raspberry.user.phoneNumber,
                        )} 입니다.`,
                      );
                    }
                  }}
                >
                  {raspberry?.user?.fullName}
                  {raspberry?.user && <div>(Click)</div>}
                </StudentDiv>
                <ButtonDiv2>
                  <PopupCustom
                    trigger={<PopButton text={'좌석설정'} />}
                    closeOnDocumentClick={false}
                    modal
                  >
                    {(close) => (
                      <PBody>
                        <form
                          onSubmit={async () => {
                            const fucResult = await onRegist(index1, index2);
                            if (fucResult) {
                              close();
                            }
                          }}
                        >
                          <PTitle text={'좌석설정'} />
                          <SmallDiv>
                            <SmallInput
                              type={'number'}
                              placeholder={
                                '좌석 번호 (예: 12, 해제 시 입력 불필요)'
                              }
                              {...seatNumber}
                            />
                          </SmallDiv>
                          <ButtonDiv>
                            <PopupButton_triple text={'등록/수정'} />
                            <PopupButton_triple
                              type="button"
                              onClick={async () => {
                                if (raspberry.seatNumber === null) {
                                  alert('이미 할당된 좌석이 없습니다.');
                                } else {
                                  const fucResult = await onUnRegist(
                                    index1,
                                    index2,
                                  );
                                  if (fucResult) {
                                    close();
                                  }
                                }
                              }}
                              text={'해제'}
                            />
                            <PopupButton_triple
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
                </ButtonDiv2>
                <ButtonDiv2>
                  <UnRegistButton
                    type="button"
                    onClick={() => {
                      if (raspberry.user === null) {
                        alert('해당 캠(좌석)에 배정된 학생이 없습니다.');
                      } else {
                        onUnMountStudent(raspberry.user.id);
                      }
                    }}
                  >
                    학생해제
                  </UnRegistButton>
                </ButtonDiv2>
              </ContentDiv_Rasp>
            );
          }),
        )}
      </Wrapper>
    );
  }
};
