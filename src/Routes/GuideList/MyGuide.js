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

export default ({ myRef }) => {
  return (
    <>
      <ScrollPoint ref={(el) => (myRef.current[0] = el)} />
      <Title_h1>나의 스케줄</Title_h1>
      <TitleContent>
        스케줄러는 3가지 요소(To Do, 과목, 스케줄)를 제공합니다.
        <br />
        스케줄을 작성하면 보다 정확한 학습 분석이 가능합니다.
        <br />
        스케줄은 주 단위로 작성 가능합니다.
      </TitleContent>
      <ScrollPoint ref={(el) => (myRef.current[1] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Schedule_00.png'
        }
      />
      <Content_ol>
        <li>스케줄 날짜 범위 확인 및 변경</li>
        <li>스케줄 컨트롤 패널</li>
        <li>스케줄러 메인 화면</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[2] = el)} />
      <TitleImg>To Do 관리</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Schedule_1.png'
        }
      />
      <Content_ol>
        <li>To Do 추가</li>
        <li>To Do 완료</li>
        <li>완료한 To Do 삭제</li>
        <li>To Do 수정, 삭제</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[3] = el)} />
      <TitleImg>과목 관리</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Schedule_2.png'
        }
      />
      <Content_ol>
        <li>
          과목 관리 기능{' '}
          <span style={{ color: '#7BA9EB' }}>(북마크, 만들기, 수정, 삭제)</span>
          <SubContent>
            &#8251;{' '}
            <span style={{ color: '#7BA9EB' }}>
              북마크 된 과목만 스케줄, To Do 관리 시 사용 가능
            </span>
          </SubContent>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[4] = el)} />
      <TitleImg>스케줄 만들기</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Schedule_3_edit.png'
        }
      />
      <Content_ol>
        <li>
          스케줄 만들기 활성화{' '}
          <span style={{ color: '#7BA9EB' }}>
            (스케줄 만들기 버튼[+] 클릭 or 스케줄러에서 원하는 시간 드래그)
          </span>
        </li>
        <li>
          To do를 이용한 간편 스케줄 데이터 입력
          <SubContent>
            &#8251;{' '}
            <span style={{ color: '#7BA9EB' }}>
              하나의 스케줄은 24시간 이내로만 작성 가능, 중복된 시간에 스케줄
              작성 불가능
            </span>
          </SubContent>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[5] = el)} />
      <TitleImg>스케줄 수정&amp;삭제</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Schedule_4.png'
        }
      />
      <Content_ol>
        <li>스케줄 수정</li>
        <li>스케줄 삭제</li>
        <li>
          스케줄 끝나는 시간 수정{' '}
          <span style={{ color: '#7BA9EB' }}>(스케줄 상자 모서리 드래그)</span>
        </li>
        <li>
          스케줄 전체 시간 평행 이동{' '}
          <span style={{ color: '#7BA9EB' }}>(스케줄 상자 몸통 드래그)</span>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[6] = el)} />
      <TitleImg>스케줄 복사 (한 개)</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Schedule_5.png'
        }
      />
      <Content_ol>
        <li>'개별 복사' 버튼 활성화</li>
        <li>복사를 원하는 스케줄 몸통 드래그</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[7] = el)} />
      <TitleImg>스케줄 복사 (여러 개)</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Schedule_6.png'
        }
      />
      <Content_ol>
        <li>하루 전체 스케줄을 원하는 다른 날짜에 복사</li>
        <li>한 주 전체 스케줄을 원하는 다른 주에 복사</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[8] = el)} />
      <Title_h1>나의 통계</Title_h1>
      <TitleContent>
        나의 학습 상태를 한눈에 파악할 수 있도록 도와줍니다.
        <br />
        스케줄로 계획한 목표 대비 실제 학습량을 파악할 수 있습니다.
        <br />
        SNS로 나의 학습 상태를 공유할 수 있도록 캡처 기능을 지원합니다.
      </TitleContent>
      <ScrollPoint ref={(el) => (myRef.current[9] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Statistics_00.png'
        }
      />
      <Content_ol>
        <li>통계 기준 날짜 설정</li>
        <li>통계 캡처, 새로고침</li>
        <li>
          통계 기간 설정{' '}
          <span style={{ color: '#7BA9EB' }}>
            (1번에서 설정한 날짜 기준으로 기간 계산)
          </span>
        </li>
        <li>통계 그래프</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[10] = el)} />
      <TitleImg>총 학습 시간</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Statistics_1.png'
        }
      />
      <Content_ol>
        <li>목표 대비 실제 학습 비율</li>
        <li>Play에서 측정된 총 학습 시간</li>
        <li>계획한 스케줄의 총 목표 시간</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[11] = el)} />
      <TitleImg>기간별 학습 시간</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Statistics_2.png'
        }
      />
      <Content_ol>
        <li>
          하루 24시간 시간대별 학습 시간{' '}
          <span style={{ color: '#7BA9EB' }}>
            (2시 =&gt; 2시~3시 학습 시간)
          </span>
        </li>
        <li>한 주간 요일별 학습 시간</li>
        <li>한 달간 일별 학습 시간</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (myRef.current[12] = el)} />
      <TitleImg>과목별 학습 시간</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/my/My_Statistics_3.png'
        }
      />
      <Content_ol>
        <li>Play에서 측정된 해당 과목 학습 시간</li>
        <li>스케줄로 계획한 해당 과목 목표 시간</li>
      </Content_ol>
    </>
  );
};
