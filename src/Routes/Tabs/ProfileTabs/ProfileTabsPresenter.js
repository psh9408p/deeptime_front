import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import FatText from '../../../Components/FatText';
import PopupButton from '../../../Components/Buttons/PopupButton';
import phoneNumberNormalize from '../../../Components/phoneNumberNormalize';
import Input from '../../../Components/Input';

const Regist = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 0 auto;
  padding: 25px 0;
`;

const ContentLink = styled(Link)`
  cursor: pointer;
  width: 320px;
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  font-weight: 700;
`;

const ContentButton = styled.button`
  cursor: pointer;
  width: 320px;
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  font-weight: 700;
  background: none;
  border: 0;
  outline: none;
`;

const ContentDiv = styled.div`
  cursor: pointer;
  width: 320px;
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  font-weight: 700;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 230px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ReadingContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding-left: 80px;
  margin-bottom: 15px;
  &:nth-child(4) {
    margin-bottom: 25px;
  }
`;

const LeftDiv = styled.div``;
const RightDiv = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
`;

const InputUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 300px;
  margin-bottom: 20px;
`;

export default ({
  pageIndex,
  User,
  onUnRegist,
  raspberrySerial,
  secretCode,
  clearOnRegist,
  onRegist,
}) => {
  if (pageIndex === 0) {
    return (
      <Regist>
        <ContentLink to="/manage-subscription" replace>
          구독 관리
        </ContentLink>
        <ContentLink to="/order-history" replace>
          결제/이용권 내역
        </ContentLink>
        <ContentButton
          type="button"
          onClick={() => {
            alert('이용권 등록 서비스는 준비 중 입니다.');
          }}
        >
          이용권 등록
        </ContentButton>
        {/* <ContentLink to="/voucher" replace>
          이용권 등록
        </ContentLink> */}
      </Regist>
    );
  } else if (pageIndex === 1) {
    return (
      <Regist>
        <PopupCustom
          trigger={<ContentDiv>나의 독서실</ContentDiv>}
          closeOnDocumentClick={false}
          modal
        >
          {(close) => {
            return (
              <PBody>
                <PTitle text={'나의 독서실'} />
                <ReadingContent>
                  <LeftDiv>기관명:&nbsp;</LeftDiv>
                  <RightDiv>{User?.organization?.name}</RightDiv>
                </ReadingContent>
                <ReadingContent>
                  <LeftDiv>관리자 연락처:&nbsp;</LeftDiv>
                  <RightDiv>
                    {User?.organization?.manager?.phoneNumber &&
                      phoneNumberNormalize(
                        User.organization.manager.phoneNumber,
                      )}
                  </RightDiv>
                </ReadingContent>
                <ReadingContent>
                  <LeftDiv>좌석 번호:&nbsp;</LeftDiv>
                  <RightDiv>{User?.raspberry?.seatNumber}</RightDiv>
                </ReadingContent>
                <ButtonDiv>
                  <PopupButton
                    type="button"
                    text={'좌석 해제'}
                    onClick={() => {
                      let organizationNonExist = false;
                      if (User.organization === null) {
                        organizationNonExist = true;
                      }
                      onUnRegist(organizationNonExist);
                    }}
                  />
                  <PopupButton
                    type="button"
                    onClick={() => {
                      close();
                    }}
                    text={'닫기'}
                  />
                </ButtonDiv>
              </PBody>
            );
            // }
          }}
        </PopupCustom>
        <PopupCustom
          trigger={<ContentDiv>독서실 좌석 연결</ContentDiv>}
          closeOnDocumentClick={false}
          modal
        >
          {(close) => {
            return (
              <PBody>
                <PTitle text={'독서실 좌석 연결'} />
                <InputUpWrapper>
                  <InputWrapper>
                    <Input
                      placeholder={'시리얼 넘버 (예: a0001-a01-a0001)'}
                      {...raspberrySerial}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <Input
                      placeholder={'가입번호 (예: 123456)'}
                      {...secretCode}
                    />
                  </InputWrapper>
                </InputUpWrapper>
                <ButtonDiv>
                  <PopupButton
                    type="button"
                    text={'좌석 연결'}
                    onClick={async () => {
                      const fucResult = await onRegist();
                      if (fucResult) {
                        close();
                      }
                    }}
                  />
                  <PopupButton
                    type="button"
                    onClick={() => {
                      clearOnRegist();
                      close();
                    }}
                    text={'닫기'}
                  />
                </ButtonDiv>
              </PBody>
            );
            // }
          }}
        </PopupCustom>
      </Regist>
    );
  }
};
