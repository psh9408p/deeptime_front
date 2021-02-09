import React from 'react';
import styled from 'styled-components';

const Title_h1 = styled.h1`
  padding: 10px 0 10px 0;
  font-size: 2em;
  font-weight: bold;
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

export default ({ playRef }) => {
  return (
    <>
      <ScrollPoint ref={(el) => (playRef.current[0] = el)} />
      <Title_h1>Play</Title_h1>
      <TitleContent>
        Play는 사용자가 학습할 때 사용되는 공간입니다.
        <br />
        학습 상태, 스케줄, 통계, 동행자 등의 정보를 제공합니다.
        <br />
        AI를 통한 정밀 측정으로 정확한 나의 학습 시간을 관리할 수 있습니다.
      </TitleContent>
      <ScrollPoint ref={(el) => (playRef.current[1] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/play/play_1.png'
        }
      />
      <Content_ol>
        <li>동행자 리스트</li>
        <li>현재 촬영 영상</li>
        <li>D-day</li>
        <li>화면 캡처</li>
        <li>새로고침</li>
        <li>컨트롤 패널</li>
        <li>기본값 세팅</li>
        <li>Today 학습 통계</li>
        <li>현재 스케줄 정보</li>
        <li>다음 스케줄 정보</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[2] = el)} />
      <TitleImg>동행자</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/play/play_2.png'
        }
      />
      <Content_ol>
        <li>
          나의 정보 <span>(클릭 시 동행자 관리로 이동)</span>
        </li>
        <li>동행자 정보</li>
        <li>오늘 학습 시간, 프로필 이미지, 현재 학습 상태</li>
        <SubContent>
          &#8251; <span>프로필 사진 주변에 파란불이 켜지면 학습중</span>
        </SubContent>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[3] = el)} />
      <TitleImg>컨트롤 패널</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/play/play_3.png'
        }
      />
      <Content_ol>
        <li>현재 시간을 기준으로 스케줄 작성</li>
        <li>클릭 시 오늘 가능한 최대 스케줄 기간으로 입력</li>
        <li>현재 스케줄 단축</li>
        <SubContent>
          &#8251;{' '}
          <span>
            단축 시 스케줄 잔여 기간이 5분 미만이면 스케줄 삭제 여부 결정
          </span>
        </SubContent>
        <li>현재 스케줄 연장</li>
        <SubContent>
          &#8251;{' '}
          <span>
            연장된 스케줄 기간에 기존에 있던 스케줄이 포함되면, 기존 스케줄 삭제
            및 축소 여부 결정
          </span>
        </SubContent>{' '}
        <li>현재 스케줄 마침</li>
        <SubContent>
          &#8251;{' '}
          <span>현재 스케줄이 시작한지 5분 미만이면 스케줄 삭제 여부 결정</span>
        </SubContent>
      </Content_ol>
    </>
  );
};
