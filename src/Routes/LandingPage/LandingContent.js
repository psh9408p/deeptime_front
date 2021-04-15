import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContentWrap = styled.div`
  width: 70%;
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
  display: flex;
  flex-direction: column;
  @media (max-width: 570px) {
    font-size: 20px;
  }
`;
const MediaWrap = styled.div`
  margin-top: 30px;
  width: 600px;
  height: 100%;
  align-items: right;
  position: relative;
  @media (min-width: 1024px) {
    width: 800px;
    height: 100%;
    margin-left: auto;
  }
`;

const DeepBtn = styled(Link)`
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
  text-align: center;
  width: 500px;
  font-size: 27px;
  height: 100px;
  line-height: 35px;
  @media (max-width: 570px) {
    width: 300px;
  }
`;

const LandingContent = ({
  title,
  subTitle1,
  subTitle2,
  subTitle3,
  Img2,
  Img,
  imgWidth,
  isLast = false,
}) => {
  return (
    <div>
      <ContentWrap>
        {/* <ContentTitleWrap> */}
        <ContentTitle>{title}</ContentTitle>
        <ContetnSubTitle>
          {isLast && (
            <DeepBtn to="/auth">
              딥타임으로
              <br />
              2분만에 갈아 타기
            </DeepBtn>
          )}
          <span>{subTitle1}</span>
          <span style={{ marginTop: '20px', marginBottom: '20px' }}>
            {subTitle2}
          </span>
          <span>{subTitle3}</span>
        </ContetnSubTitle>
        {/* </ContentTitleWrap> */}
        <MediaWrap>
          <div
            style={{ display: 'flex', marginLeft: 'auto', maxWidth: '100%' }}
          >
            <img
              style={{
                maxWidth: imgWidth,
                height: 'auto',
                marginLeft: 'auto',
                position: 'relative',
              }}
              src={Img}
            ></img>
            <img
              style={{
                height: 'auto',
                maxWidth: imgWidth,
                position: 'relative',
              }}
              src={Img2}
            ></img>
          </div>
        </MediaWrap>
      </ContentWrap>
    </div>
  );
};

export default LandingContent;
