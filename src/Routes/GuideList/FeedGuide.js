import React from 'react';
import styled from 'styled-components';

const Title_h1 = styled.h1`
  padding: 30px 0 10px 0;
  font-size: 2em;
  font-weight: bold;
  border-top: 2px solid black;
`;

const TitleContent = styled.p`
  margin: 10px 0 70px 0;
  font-size: 1.17em;
  line-height: 1.7em;
`;

const TitleImg = styled.p`
  margin: 10px 0 0 0;
  color: red;
  font-size: 1.17em;
  line-height: 1.7em;
`;

const SubContent = styled.p`
  margin-top: 10px;
  line-height: 0.9em;
  span {
    color: ${(props) => props.theme.skyBlue};
  }
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const SSubContent = styled.p`
  margin: 5px 0 10px 0;
  line-height: 0.9em;
`;

const Content_ol = styled.ol`
  padding: 10px 0 70px 0;
  counter-reset: section;
  list-style: none;
  font-size: 1.17em;
  li {
    &:before {
      font-size: 1.5em;
      font-weight: 900;
      counter-increment: section;
      content: counter(section) ' ';
      color: #fcd000;
      text-shadow: 2px 2px black;
      -webkit-text-stroke: 1.5px black;
    }
    u {
      font-size: 1.2em;
    }
    span {
      color: ${(props) => props.theme.skyBlue};
    }
    line-height: 1.7em;
  }
`;

const ImgDiv = styled.img`
  /* width: 100%; */
  /* height: 500px; */
  margin-top: 10px;
  border: ${(props) => props.theme.boxBorder};
`;

const SubContent_ul = styled.ul`
  list-style-position: outside;
  list-style-type: disc;
`;

const ScrollPoint = styled.div`
  height: 68px;
`;

export default ({ isRef }) => {
  return (
    <>
      <ScrollPoint ref={(el) => (isRef.current[0] = el)} />
      <Title_h1>게시판</Title_h1>
      <TitleContent>
        유저들의 게시물을 검색하고 소통할 수 있습니다.
        <br />
        여러분들의 학습 통계를 공유하고 자랑해보세요.
      </TitleContent>
      <ScrollPoint ref={(el) => (isRef.current[1] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/feed/Feed_0.png'
        }
      />
      <Content_ol>
        <li>게시물 필터</li>
        <li>게시물 만들기로 이동</li>
        <li>게시물 리스트</li>
        <li>더 많은 게시물 탐색</li>
      </Content_ol>
    </>
  );
};
