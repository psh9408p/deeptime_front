import React from 'react';
import Header_welcome from './Header_welcome';
import styled from 'styled-components';
import Video from '../Routes/LandingPage/Video';
const PageWrap = styled.div`
  width: 100%;
`;

const TitleWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ContentWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 50px;
  margin-top: 80px;
`;

const SubTitle = styled.div`
  font-size: 50px;
  color: #0b375d;
  margin-top: 80px;
`;
const DeepBtnWrap = styled.div`
  width: 300px;
  display: flex;
  background: red;
  margin-top: 80px;
  height: 70px;
`;

const DeepBtn = styled.div`
  background: #0b375d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  font-size: 27px;
  height: 70px;
`;

const ContentTitle = styled.h1`
  font-weight: bold;
  font-size: 50px;
  margin-top: 50px;
`;

const ContetnSubTitle = styled.div`
  font-size: 30px;
  margin-top: 20px;
`;

const ContentBtn = styled.button`
  border-radius: 80px solid black;
  outline: none;
  font-size: 15px;
  width: 150px;
  height: 60px;
  margin-top: 30px;
`;
const ContentTitleWrap = styled.div``;
const MediaWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  @media (min-width: 1024px) {
    width: 800px;
    height: 100%;
    margin-left: auto;
  }
`;
const WelcomePage = () => {
  return (
    <>
      <Header_welcome />
      <PageWrap>
        <TitleWrap>
          <Title>
            <h1>
              가장정확한
              <br />
              시간관리.
            </h1>
          </Title>
          <SubTitle>
            <span>DEEP TIME</span>
          </SubTitle>
          <DeepBtnWrap>
            <a>
              <DeepBtn>DEEP TIME 체험하기</DeepBtn>
            </a>
          </DeepBtnWrap>
        </TitleWrap>
        <ContentWrap>
          <ContentTitleWrap>
            <ContentTitle>속지마세요</ContentTitle>
            <ContetnSubTitle>타이머의 거짓말에 속지마세요</ContetnSubTitle>
            <ContetnSubTitle>
              DEEPTIME이 진짜 공부시간을 찾아 드립니다.
            </ContetnSubTitle>
            {/* <ContentBtn>READ MORE</ContentBtn> */}
          </ContentTitleWrap>
          <MediaWrap>
            <Video />
          </MediaWrap>
        </ContentWrap>
        <ContentWrap>
          <div>
            <ContentTitle>속지마세요</ContentTitle>
            <ContetnSubTitle>타이머의 거짓말에 속지마세요</ContetnSubTitle>
            <ContetnSubTitle>
              DEEPTIME이 진짜 공부시간을 찾아 드립니다.
            </ContetnSubTitle>
            {/* <ContentBtn>READ MORE</ContentBtn> */}
          </div>
          <MediaWrap>
            <Video />
          </MediaWrap>
        </ContentWrap>
      </PageWrap>
    </>
  );
};

export default WelcomePage;
