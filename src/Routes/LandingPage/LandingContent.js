import React from 'react';
import styled from 'styled-components';
import Video from './Video';
import { Link, withRouter } from 'react-router-dom';
const ContentWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  min-width: 320px;
  /* 나중에 지우기 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentTitleWrap = styled.div``;

const ContentTitle = styled.h1`
  font-weight: bold;
  font-size: 4rem;
  margin-top: 50px;
  min-width: 320px;
  @media (max-width: 570px) {
    font-size: 40px;
  }
`;

const ContetnSubTitle = styled.div`
  font-size: 30px;
  margin-top: 20px;
  min-width: 320px;
  @media (max-width: 570px) {
    font-size: 20px;
  }
`;
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

const LandingContent = ({ title, subTitle1, subTitle2, subTitle3 }) => {
  return (
    <div>
      <ContentWrap>
        {/* <ContentTitleWrap> */}
        <ContentTitle>{title}</ContentTitle>
        <ContetnSubTitle>
          {subTitle1}
          <br /> {subTitle2}
          <br />
          {subTitle3}
        </ContetnSubTitle>
        {/* <ContentBtn>READ MORE</ContentBtn> */}
        {/* </ContentTitleWrap> */}
        <MediaWrap>{/* <Video /> */}</MediaWrap>
      </ContentWrap>
    </div>
  );
};

export default LandingContent;
