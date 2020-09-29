import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const TmpDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  max-width: 1000px;
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
              스케줄을 작성하지 않을 시 통계분석이 불가능하다는 점 유의
              바랍니다.
              <br />
              스케줄은 주 단위로 작성 가능합니다.
            </TitleContent>
            <TitleImg>스케줄러 찾기</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_1.png'
              }
            />
            <Content_ol>
              <li>나의 학습 클릭</li>
              <li>나의 스케줄 클릭</li>
            </Content_ol>
            <TitleImg>스케줄러 기본 설명</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_2.png'
              }
            />
            <Content_ol>
              <li>이번 주로 이동</li>
              <li>1주일 전후 이동</li>
              <li>현재 스케줄 기간</li>
              <li>
                종일(0시~24시) 또는 이틀 연속의 스케줄 작성 시 스케줄 배정 칸
              </li>
              <li>날짜&amp;시간 별 스케줄 배정 칸</li>
            </Content_ol>
            <TitleImg>과목 북마크(즐겨찾기)</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_3.png'
              }
            />
            <Content_ol>
              <li>과목 관리 클릭</li>
              <li>과목 북마크 클릭</li>
              <li>북마크(즐겨찾기) 원하는 과목 체크</li>
              <li>
                저장 클릭
                <SubContent>
                  &#8251;{' '}
                  <span style={{ color: '#7BA9EB' }}>
                    북마크 된 과목만 스케줄 추가 시 사용 가능
                  </span>
                </SubContent>
              </li>
            </Content_ol>
            <TitleImg>과목 추가</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_4.png'
              }
            />
            <Content_ol>
              <li>과목 관리 클릭</li>
              <li>과목 추가 클릭</li>
              <li>과목 이름 입력</li>
              <li>과목 색상 선택</li>
              <li>
                추가 클릭
                <SubContent>
                  &#8251;{' '}
                  <span style={{ color: '#7BA9EB' }}>
                    추가된 과목은 자동으로 북마크(즐겨찾기) 설정이 적용
                  </span>
                </SubContent>
              </li>
            </Content_ol>
            <TitleImg>과목 수정</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_5.png'
              }
            />
            <Content_ol>
              <li>과목 관리 클릭</li>
              <li>과목 수정 클릭</li>
              <li>수정할 과목 선택</li>
              <li>'기존정보 불러오기' 클릭</li>
              <li>과목 이름 입력</li>
              <li>과목 색상 선택</li>
              <li>
                수정 클릭
                <SubContent>
                  &#8251;{' '}
                  <span style={{ color: '#7BA9EB' }}>
                    수정 시 이미 작성된 스케줄에 해당 과목 정보가 모두 반영
                  </span>
                </SubContent>
              </li>
            </Content_ol>
            <TitleImg>과목 삭제</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_6.png'
              }
            />
            <Content_ol>
              <li>과목 관리 클릭</li>
              <li>과목 삭제 클릭</li>
              <li>삭제할 과목 선택</li>
              <li>
                삭제 클릭
                <SubContent>
                  &#8251;{' '}
                  <span style={{ color: '#7BA9EB' }}>
                    삭제 시 본 과목이 할당된 기존 스케줄의 과목 또한
                    삭제(해제)됨
                  </span>
                </SubContent>
              </li>
            </Content_ol>
            <TitleImg>스케줄 추가</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_7.png'
              }
            />
            <Content_ol>
              <li>원하는 날짜&amp;시간을 클릭 또는 드래그</li>
              <li>
                과목 선택{' '}
                <span style={{ color: '#7BA9EB' }}>
                  (북마크 된 과목만 선택 가능)
                </span>
              </li>
              <li>제목 입력</li>
              <li>
                통계 분석 시 스케줄 미반영(열림)&amp;반영(잠김) 선택{' '}
                <span style={{ color: '#7BA9EB' }}>(추후 수정 불가)</span>
                <SSubContent>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: 'red' }}>
                    IAM으로 학습시간 측정이 불가능한 현강 같은 스케줄 작성 시
                    활용 가능
                  </span>
                </SSubContent>
              </li>
              <li>
                위치 입력 <span style={{ color: '#7BA9EB' }}>(필수 아님)</span>
              </li>
              <li>
                날짜 선택{' '}
                <span style={{ color: '#7BA9EB' }}>(2일 이내 가능)</span>
              </li>
              <li>
                시간을 해당 날짜 종일(0시~24시)로 설정 가능{' '}
                <span style={{ color: '#7BA9EB' }}>(추후 수정 불가)</span>
              </li>
              <li>자습&amp;인강 선택</li>
              <li>입력 클릭</li>
              <li>
                <u>저장 클릭</u>{' '}
                <span style={{ color: '#7BA9EB' }}>
                  (스케줄 추가&amp;수정&amp;삭제 후, 한 번에 저장 가능)
                </span>
              </li>
            </Content_ol>
            <TitleImg>스케줄 수정</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_8.png'
              }
            />
            <Content_ol>
              <li>수정할 과목 클릭</li>
              <li>수정 클릭</li>
              <li>수정사항 입력</li>
              <li>
                수정 불가{' '}
                <span style={{ color: '#7BA9EB' }}>
                  (잠금도 열림으로 표시됨, 추후 업데이트 예정)
                </span>
              </li>
              <li>
                All day On&rarr;Off 불가능, Off&rarr;On 가능{' '}
                <span style={{ color: '#7BA9EB' }}>(추후 업데이트 예정)</span>
              </li>
              <li>수정 클릭</li>
              <li>
                <u>저장 클릭</u>{' '}
                <span style={{ color: '#7BA9EB' }}>
                  (스케줄 추가&amp;수정&amp;삭제 후, 한 번에 저장 가능)
                </span>
              </li>
            </Content_ol>
            <TitleImg>스케줄 삭제</TitleImg>
            <ImgDiv
              src={
                'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/schedule/schedule_9.png'
              }
            />
            <Content_ol>
              <li>삭제할 과목 클릭</li>
              <li>삭제 클릭</li>
              <li>
                <u>저장 클릭</u>{' '}
                <span style={{ color: '#7BA9EB' }}>
                  (스케줄 추가&amp;수정&amp;삭제 후, 한 번에 저장 가능)
                </span>
              </li>
            </Content_ol>
          </>
        )}
        {pageName === 'manager' && <div>자료 준비 중 입니다.</div>}
      </TmpDiv>
    </>
  );
};
