import React from 'react';
import styled from 'styled-components';
import Video from './Video';
const TitleWrap = styled.div`
  width: 80%;
  min-width: 320px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const Title = styled.div`
  font-size: 80px;
  margin-top: 80px;
  font-weight: bold;

  @media (max-width: 570px) {
    font-size: 40px;
  }
`;

const SubTitle = styled.div`
  font-size: 100px;
  color: #0b375d;
  margin-top: 80px;
  font-weight: bold;
  @media (max-width: 570px) {
    font-size: 50px;
  }
`;
const DeepBtnWrap = styled.div`
  width: 300px;
  display: flex;
  background: red;
  margin-top: 80px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeepBtn = styled.div`
  &:hover {
    background: white;
    color: #0b375d;
    transition: width 0.4s ease;
  }
  border-radius: 15px;
  transition: all, 0.5s;
  cursor: pointer;
  background: #0b375d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  font-size: 27px;
  height: 100px;
  @media (max-width: 570px) {
    width: 300px;
  }
`;
const onClickPotal_student = () => {
  const detect_window = window.open(
    window.location.origin + '/#/experience',
    'detect',
    'height=430,width=1000,fullscreen=yes,resizable=no,location=no,menubar=no,status=no,titlebar=no,toolbar=no',
  );
};
const LandingTitle = () => {
  return (
    <div>
      <TitleWrap>
        <Title>
          <h1 style={{ textAlign: 'center' }}>가장 정확한</h1>
          <h1 style={{ textAlign: 'center' }}>시간관리.</h1>
        </Title>
        <SubTitle>
          <span>DEEPTIME</span>
        </SubTitle>
        <DeepBtnWrap>
          <a>
            <DeepBtn onClick={onClickPotal_student}>DEEPTIME 체험하기</DeepBtn>
          </a>
        </DeepBtnWrap>
      </TitleWrap>
    </div>
  );
};

export default LandingTitle;
