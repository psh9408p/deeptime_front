import React from 'react';
import styled from 'styled-components';

const Title_h1 = styled.h1`
  padding: 10px 0 10px 0;
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

export default ({ playRef }) => {
  return (
    <>
      <ScrollPoint ref={(el) => (playRef.current[0] = el)} />
      <Title_h1>Play</Title_h1>
      <TitleContent>
        Play는 사용자가 학습할 때 사용되는 공간입니다.
        <br />
        학습 상태, 학습 시간, 스케줄, 동행자 등의 정보를 제공합니다.
        <br />
        AI를 통한 정밀 측정으로 정확한 나의 학습 시간을 관리할 수 있습니다.
      </TitleContent>
      <ScrollPoint ref={(el) => (playRef.current[1] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Play/Play_0.png'
        }
      />
      <Content_ol>
        <li>동행자 목록 </li>
        <li>현재 촬영 영상</li>
        <li>
          D-day 기능{' '}
          <span style={{ color: '#7BA9EB' }}>
            (클릭 시 팝업창 상단에서 설정 가능)
          </span>
        </li>
        <li>To Do관리, 화면 캡처, 새로고침, 기본값 세팅</li>
        <li>학습 상태 및 오늘의 학습 시간</li>
        <li>현재 스케줄</li>
        <li>다음 스케줄</li>
        <li>스케줄 조정</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[2] = el)} />
      <TitleImg>학습 측정 세팅</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Play/Play_1.png'
        }
      />
      <Content_ol>
        <li>사용자의 상반신이 노출되도록 촬영 각도를 조절 필요</li>
        <li>
          1분 간격으로 데이터를 분석해 학습 판단 결과를 서버로 전송 및 반영
          <SubContent>
            &#8251;{' '}
            <span style={{ color: '#7BA9EB' }}>
              Play에서 촬영되는 영상은 외부로 전송&amp;공유되지 않으며, 학습
              판단 결과 만을 서버로 전송합니다.
            </span>
          </SubContent>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[3] = el)} />
      <TitleImg>학습 상태 및 시간</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Play/Play_2.png'
        }
      />
      <Content_ol>
        <li>
          현재 사용자의 학습 상태{' '}
          <span style={{ color: '#7BA9EB' }}>(학습중, 부재중)</span>
        </li>
        <li>오늘의 총 학습 시간</li>
        <li>오늘의 총 스케줄 목표 시간</li>
        <li>
          오늘 휴대폰 사용 시간{' '}
          <span style={{ color: '#7BA9EB' }}>
            (휴대폰 감지 시 빨간색으로 변경)
          </span>
          <SubContent>
            &#8251;{' '}
            <span style={{ color: '#7BA9EB' }}>
              휴대폰 감지 기능은 미완성 기능으로 참고 용도로만 사용 바랍니다.
            </span>
          </SubContent>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[4] = el)} />
      <TitleImg>동행자 관리</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Play/Play_3.png'
        }
      />
      <Content_ol>
        <li>동행자 : Play 상단에 고정하여 실시간으로 학습 상태 확인 가능</li>
        <li>내가 팔로우한 사용자 목록</li>
        <li>해당 사용자와 동행 활성화&amp;비활성화 버튼</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[5] = el)} />
      <TitleImg>To Do 관리</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Play/Play_4.png'
        }
      />
      <Content_ol>
        <li>To Do 추가</li>
        <li>To Do 완료</li>
        <li>완료한 To Do 삭제</li>
        <li>To Do 수정, 삭제</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[6] = el)} />
      <TitleImg>기본값 세팅</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Play/Play_5.png'
        }
      />
      <Content_ol>
        <li>영상 촬영 카메라 선택</li>
        <li>D-day 기능 활성화 및 설정</li>
        <li>활성화 시 : 현재 스케줄이 있을 때만 학습 시간이 기록됨</li>
        <li>
          활성화 시 : 타입랩스 영상을 쉽게 만들 수 있도록 1분 간격으로 자동 캡처
        </li>
        <li>
          활성화 시 : Play에 모든 데이터를 1분 간격으로 새로고침
          <SSubContent>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: 'red' }}>
              비활성화 상태에서도 학습 시간은 정상적으로 기록됨
            </span>
          </SSubContent>
        </li>
        <li>
          활성화 시 : 2가지 알림 제공{' '}
          <span style={{ color: '#7BA9EB' }}>
            (현재 스케줄이 시작했을 때, 현재 스케줄이 10분 이내로 남았을 때)
          </span>
          <SSubContent>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: 'red' }}>
              자동 새로고침 활성화 시 설정 가능
            </span>
          </SSubContent>
        </li>
        <li>‘스케줄 조정’에서 스케줄 시작 시 기본 시간 설정</li>
        <li>‘스케줄 조정’에서 현재 스케줄 단축&amp;연장 시 기본 시간 설정 </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (playRef.current[7] = el)} />
      <TitleImg>스케줄 조정</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Play/Play_6.png'
        }
      />
      <Content_ol>
        <li>
          즉석 스케줄 작성 기능{' '}
          <span style={{ color: '#7BA9EB' }}>
            (스케줄 시작 시간은 현재 시간 기준)
          </span>
        </li>
        <li>To do를 이용한 간편 스케줄 데이터 입력</li>
        <li>스케줄 간편 조정 기능</li>
      </Content_ol>
    </>
  );
};
