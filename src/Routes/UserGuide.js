import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const TmpDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  max-width: 784px;
  margin: 0 auto;
  padding-top: 50px;
  min-height: 750px;
`;

const SideWrap = styled(SideNav)`
  margin-top: 68px;
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

export default () => {
  let history = useHistory();
  let location = useLocation();
  const pageName = location.pathname.split('/userguide/')[1];

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
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="student/connectseat">
          <NavItem eventKey="student">
            <NavText>
              <NavTextWrap>학생</NavTextWrap>
            </NavText>
            <NavItem eventKey="student/connectseat">
              <NavText>좌석 연결</NavText>
            </NavItem>
            <NavItem eventKey="student/schedule">
              <NavText>스케줄표 작성</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="manager">
            <NavText>
              <NavTextWrap>관리자</NavTextWrap>
            </NavText>
            {/* <NavItem eventKey="manager/linechart">
              <NavText>Line Chart</NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText>Bar Chart</NavText>
            </NavItem> */}
          </NavItem>
        </SideNav.Nav>
      </SideWrap>
      <TmpDiv>
        {pageName === 'student/connectseat' && (
          <>
            <Title_h1>좌석 연결</Title_h1>
            <TitleContent>
              사용자의 회원 아이디와 개인 좌석에 설치된 &lsquo;메타(학습시간
              측정 기기)&rsquo;를 연결하는 작업입니다.
            </TitleContent>
            <TitleImg>회원가입이 되어 있지 않은 경우</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/1.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_1).jpg'
              }
            />
            <Content_ol>
              <li>로그인 클릭 후 회원가입을 먼저 해야 합니다.</li>
            </Content_ol>
            <TitleImg>회원가입이 되어 있는 경우</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/2.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_1-1).JPG'
              }
            />
            <Content_ol>
              <li>로그인 후 프로필 클릭</li>
            </Content_ol>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/3.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_2).jpg'
              }
            />
            <Content_ol>
              <li>개인 클릭</li>
              <li>독서실 좌석 연결</li>
            </Content_ol>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/4.%EC%A2%8C%EC%84%9D%EC%97%B0%EA%B2%B0_3).jpg'
              }
            />
            <Content_ol>
              <li>메타에 부착된 시리얼넘버 입력</li>
              <li>독서실 관리자에게 받은 가입번호(6자리) 입력</li>
            </Content_ol>
          </>
        )}
        {pageName === 'student/schedule' && (
          <>
            <Title_h1>스케줄표 작성</Title_h1>
            <TitleContent>
              IAM 서비스는 학습자의 계획을 기준으로 학습시간 확인 및 분석합니다.
              <br />
              스케줄을 작성하지 않을 시 통계분석이 불가능하다는 점 유의바랍니다.
              <br />
              스케줄은 주 단위로 작성 가능합니다.
            </TitleContent>
            <TitleImg>스케줄러 찾기</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%EB%9F%AC+%EC%B0%BE%EA%B8%B0_1).jpg'
              }
            />
            <Content_ol>
              <li>나의 학습 클릭</li>
              <li>나의 스케줄 클릭</li>
            </Content_ol>
            <TitleImg>
              북마크 추가하기 : 시간표 작성 전 원하는 과목을 북마크해야 합니다.
            </TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%ED%91%9C%EC%9E%91%EC%84%B1_2).jpg'
              }
            />
            <Content_ol>
              <li>과목 관리 클릭</li>
            </Content_ol>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%ED%91%9C%EC%9E%91%EC%84%B1_2-1).jpg'
              }
            />
            <Content_ol>
              <li>과목 북마크 클릭</li>
              <li>원하는 과목 체크박스 체크</li>
              <li>저장</li>
            </Content_ol>
            <TitleImg>
              원하는 과목 만들기 : 기본과목에 없는 기타과목 생성방법
            </TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%ED%91%9C%EC%9E%91%EC%84%B1_2-2).jpg'
              }
            />
            <Content_ol>
              <li>과목 관리 클릭</li>
              <li>과목 추가 클릭</li>
              <li>과목 이름 작성</li>
              <li>색상 선택</li>
              <li>추가 클릭</li>
              <li>과목 북마크에서 ‘[기타] 생성한 과목’ 체크 확인</li>
              <li>
                저장
                <SubContent>
                  개인이 만든 과목은 통계 데이터 제공 시 부정확한 데이터가
                  제공될 수 있습니다.
                </SubContent>
                <SubContent>
                  따라서 기본으로 제공되는 과목은 새로 만들지 마시고 그대로
                  사용해주세요.
                </SubContent>
              </li>
            </Content_ol>
            <TitleImg>
              시간 및 날짜 설정 : 나의 스케줄에서 공부할 날짜와 시간을 작성하는
              방법
            </TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%ED%91%9C%EC%9E%91%EC%84%B1_3).jpg'
              }
            />
            <Content_ol>
              <li>
                드래그해서 날짜, 시간 설정(드래그는 PC에서만 가능. 모바일은 바로
                아래의 안내를 봐주시면 됩니다)
              </li>
              <li>
                과목 선택 : 화살표를 클릭하면 과목관리에서 북마크한 과목 중 선택
                가능합니다.
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;제목 생성 : 자유롭게 원하는 제목
                생성 가능합니다.
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;자습, 강의 선택: 스스로 공부한
                시간과 인강&amp;현강 시간을 구분하기 위함입니다.
              </li>
            </Content_ol>
            <TitleImg>
              클릭해서 날짜, 시간 설정(모바일 기기의 경우 클릭 후 시간 설정가능)
            </TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%ED%91%9C%EC%9E%91%EC%84%B1_4).jpg'
              }
            />
            <Content_ol>
              <li>
                원하는 날짜, 시간을 클릭 : 어디를 선택하던 날짜, 시간설정을
                입력한 곳으로 생성됩니다.
              </li>
              <li>날짜, 시간 설정</li>
              <li>
                저장 : 스케줄러는 변경 사항이 있을 시 <u>반드시 저장</u>을 해야
                반영됩니다.
              </li>
            </Content_ol>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%ED%91%9C%EC%9E%91%EC%84%B1_3-1).jpg'
              }
            />
            <Content_ol>
              <li>
                생성된 모습 : 이 스케줄 바는 PC에서 마우스로 끌어서 이동할 수
                있습니다.
              </li>
              <li>
                저장 클릭 : 스케줄러는 변경 사항이 있을 시 <u>반드시 저장</u>을
                해야 반영됩니다.
              </li>
            </Content_ol>
            <TitleImg>스케줄러 편집 및 삭제</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/student/%EC%8A%A4%EC%BC%80%EC%A5%B4%ED%91%9C%EC%9E%91%EC%84%B1_5).jpg'
              }
            />
            <Content_ol>
              <li>
                스케줄바 클릭 : 편집 및 삭제 하고싶은 스케줄바를 좌클릭 또는
                선택하면 검토 창이 생성되어 편집 또는 삭제가 가능합니다.
              </li>
              <li>
                저장 클릭 : 스케줄러는 변경 사항이 있을 시 <u>반드시 저장</u>을
                해야 반영됩니다.
              </li>
            </Content_ol>
          </>
        )}
        {pageName === 'manager' && <div>자료 준비 중 입니다.</div>}
      </TmpDiv>
    </>
  );
};
