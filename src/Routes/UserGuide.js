import React, { useRef } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import SideNav, { NavItem, NavText, NavIcon } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {
  Person_white,
  People_white,
  List,
  Play_black,
  Profile,
} from '../Components/Icons';
import PlayGuide from './GuideList/PlayGuide';
import MyGuide from './GuideList/MyGuide';
import GroupGuide from './GuideList/GroupGuide';
import FeedGuide from './GuideList/FeedGuide';
import ProfileGuide from './GuideList/ProfileGuide';

const TmpDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0 0 100px;
  min-height: 750px;
`;

const SideWrap = styled(SideNav)`
  margin-top: 68px;
  background-color: white !important;
  background-color: ${(props) => props.theme.classicBlue} !important;
  position: fixed !important;
`;

const NavTextWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

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
    line-height: 1.7em;
  }
`;

const ImgDiv = styled.img`
  width: 100%;
  height: 500px;
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

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export default () => {
  let history = useHistory();
  let location = useLocation();
  const pageName = location.pathname.split('/userguide/')[1];

  // 클릭 스크롤 정의
  const playRef = useRef([]);
  const myRef = useRef([]);
  const groupRef = useRef([]);
  const feedRef = useRef([]);
  const profileRef = useRef([]);
  const scrollToRef = (value) => {
    let selectRef = null;
    if (pageName === 'play') {
      selectRef = playRef;
    } else if (pageName === 'my') {
      selectRef = myRef;
    } else if (pageName === 'group') {
      selectRef = groupRef;
    } else if (pageName === 'feed') {
      selectRef = feedRef;
    } else if (pageName === 'profile') {
      selectRef = profileRef;
    }
    selectRef.current[value].scrollIntoView({
      offset: { top: 68 },
      behavior: 'smooth',
    });
  };

  return (
    <>
      <SideWrap
        onSelect={(selected) => {
          const to = '/userguide/' + selected;
          if (location.pathname !== to) {
            history.push(to);
          }
        }}
      >
        <SideNav.Toggle style={{ backgroundColor: '#0F4C82' }} />
        <SideNav.Nav defaultSelected="play">
          <NavItem eventKey="play">
            <NavIcon>
              <IconWrap>
                <Play_black />
              </IconWrap>
            </NavIcon>
            <NavText>
              <NavTextWrap>Play</NavTextWrap>
            </NavText>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(0);
              }}
            >
              <NavText>--------[Play]---------</NavText>
            </NavItem>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(1);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(2);
              }}
            >
              <NavText>학습 측정 세팅</NavText>
            </NavItem>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(3);
              }}
            >
              <NavText>학습 상태 및 시간</NavText>
            </NavItem>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(4);
              }}
            >
              <NavText>동행자 관리</NavText>
            </NavItem>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(5);
              }}
            >
              <NavText>To Do 관리</NavText>
            </NavItem>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(6);
              }}
            >
              <NavText>기본값 세팅</NavText>
            </NavItem>
            <NavItem
              eventKey="play"
              onClick={() => {
                scrollToRef(7);
              }}
            >
              <NavText>스케줄 조정</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="my">
            <NavIcon>
              <IconWrap>
                <Person_white />
              </IconWrap>
            </NavIcon>
            <NavText>
              <NavTextWrap>나의 학습</NavTextWrap>
            </NavText>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(0);
              }}
            >
              <NavText>------[나의 스케줄]------</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(1);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(2);
              }}
            >
              <NavText>To Do 관리</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(3);
              }}
            >
              <NavText>과목 관리</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(4);
              }}
            >
              <NavText>스케줄 만들기</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(5);
              }}
            >
              <NavText>스케줄 수정&amp;삭제</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(6);
              }}
            >
              <NavText>스케줄 복사 (한 개)</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(7);
              }}
            >
              <NavText>스케줄 복사 (여러 개)</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(8);
              }}
            >
              <NavText>-------[나의 통계]-------</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(9);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(10);
              }}
            >
              <NavText>총 학습 시간</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(11);
              }}
            >
              <NavText>기간별 학습 시간</NavText>
            </NavItem>
            <NavItem
              eventKey="my"
              onClick={() => {
                scrollToRef(12);
              }}
            >
              <NavText>과목별 학습 시간</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="group">
            <NavIcon>
              <IconWrap>
                <People_white />
              </IconWrap>
            </NavIcon>
            <NavText>
              <NavTextWrap>그룹</NavTextWrap>
            </NavText>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(0);
              }}
            >
              <NavText>-------[나의 그룹]-------</NavText>
            </NavItem>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(1);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(2);
              }}
            >
              <NavText>그룹 출석부</NavText>
            </NavItem>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(3);
              }}
            >
              <NavText>그룹 정보 (수정)</NavText>
            </NavItem>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(4);
              }}
            >
              <NavText>그룹 삭제 (나가기)</NavText>
            </NavItem>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(5);
              }}
            >
              <NavText>그룹원 추방</NavText>
            </NavItem>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(6);
              }}
            >
              <NavText>-------[그룹 검색]-------</NavText>
            </NavItem>
            <NavItem
              eventKey="group"
              onClick={() => {
                scrollToRef(7);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="feed">
            <NavIcon>
              <IconWrap>
                <List />
              </IconWrap>
            </NavIcon>
            <NavText>
              <NavTextWrap>게시판</NavTextWrap>
            </NavText>
            <NavItem
              eventKey="feed"
              onClick={() => {
                scrollToRef(0);
              }}
            >
              <NavText>--------[게시판]---------</NavText>
            </NavItem>
            <NavItem
              eventKey="feed"
              onClick={() => {
                scrollToRef(1);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="profile">
            <NavIcon>
              <IconWrap>
                <Profile />
              </IconWrap>
            </NavIcon>
            <NavText>
              <NavTextWrap>프로필</NavTextWrap>
            </NavText>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(0);
              }}
            >
              <NavText>------[나의 프로필]------</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(1);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(2);
              }}
            >
              <NavText>프로필 이미지 변경</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(3);
              }}
            >
              <NavText>팔로우 기능</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(4);
              }}
            >
              <NavText>프로필 편집</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(5);
              }}
            >
              <NavText>비밀번호 변경</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(6);
              }}
            >
              <NavText>타임랩스 만들기</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(7);
              }}
            >
              <NavText>--[다른 사용자 프로필]---</NavText>
            </NavItem>
            <NavItem
              eventKey="profile"
              onClick={() => {
                scrollToRef(8);
              }}
            >
              <NavText>기본 정보</NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideWrap>

      <TmpDiv>
        {pageName === 'play' && <PlayGuide playRef={playRef} />}
        {pageName === 'my' && <MyGuide myRef={myRef} />}
        {pageName === 'group' && <GroupGuide isRef={groupRef} />}
        {pageName === 'feed' && <FeedGuide isRef={feedRef} />}
        {pageName === 'profile' && <ProfileGuide isRef={profileRef} />}
      </TmpDiv>
    </>
  );
};

// {pageName === 'student/connectseat' && (
//   <>
//     <Title_h1>좌석 연결</Title_h1>
//     <TitleContent>
//       사용자의 회원 아이디와 개인 좌석에 설치된 &lsquo;메타(학습시간
//       측정 기기)&rsquo;를 연결하는 작업입니다.
//     </TitleContent>
//     <TitleImg>회원가입이 되어 있지 않은 경우</TitleImg>
//     <ImgDiv
//       src={
//         'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/1.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_1).jpg'
//       }
//     />
//     <Content_ol>
//       <li>로그인 클릭 후 회원가입을 먼저 해야 합니다.</li>
//     </Content_ol>
//     <TitleImg>회원가입이 되어 있는 경우</TitleImg>
//     <ImgDiv
//       src={
//         'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/2.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_1-1).JPG'
//       }
//     />
//     <Content_ol>
//       <li>로그인 후 프로필 클릭</li>
//     </Content_ol>
//     <ImgDiv
//       src={
//         'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/3.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_2).jpg'
//       }
//     />
//     <Content_ol>
//       <li>개인 클릭</li>
//       <li>독서실 좌석 연결</li>
//     </Content_ol>
//     <ImgDiv
//       src={
//         'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/4.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_3).jpg'
//       }
//     />
//     <Content_ol>
//       <li>메타에 부착된 시리얼넘버 입력</li>
//       <li>독서실 관리자에게 받은 가입번호(6자리) 입력</li>
//     </Content_ol>
//   </>
// )}
