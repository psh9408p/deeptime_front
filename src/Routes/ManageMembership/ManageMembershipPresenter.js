import React from 'react';
import styled from 'styled-components';
import Button_blue from '../../Components/Buttons/Button_blue';
import { useHistory } from 'react-router-dom';

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

export default ({ paymentSetData }) => {
  let history = useHistory();

  const nowDate = new Date();
  const date = new Date(paymentSetData.membershipDate);
  const dateMonth =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1);
  const yesterDate =
    date.getDate() - 1 >= 10 ? date.getDate() - 1 : '0' + (date.getDate() - 1);

  return (
    <Wrapper>
      <TitleDiv>멤버십 관리</TitleDiv>
      <ContentDiv>
        <LeftDiv>멤버십 기간</LeftDiv>
        <RightDiv>
          {date.getFullYear()}.{dateMonth}.{yesterDate}
          .&nbsp;23:59&nbsp;까지
        </RightDiv>
      </ContentDiv>
      <ContentDiv>
        <LeftDiv>멤버십 등급</LeftDiv>
        {nowDate > date ? (
          <RightDiv>만료</RightDiv>
        ) : (
          <RightDiv>{paymentSetData.membershipGrade}</RightDiv>
        )}
      </ContentDiv>
      <LastDiv>
        <ButtonDiv>
          <Button_blue
            text={'멤버십 구매'}
            onClick={async () => {
              history.push(`/shop`);
            }}
          />
        </ButtonDiv>
      </LastDiv>
    </Wrapper>
  );
};
