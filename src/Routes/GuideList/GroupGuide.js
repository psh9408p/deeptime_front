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
      <Title_h1>나의 그룹</Title_h1>
      <TitleContent>
        내가 가입한 그룹의 정보를 확인하고 관리할 수 있습니다.
        <br />
        출석부를 사용하여 그룹원들의 하루 목표 달성률을 확인할 수 있습니다.
        <br />
        학습 시간 통계를 통해 그룹 내에 자신의 위치를 확인할 수 있습니다.
      </TitleContent>
      <ScrollPoint ref={(el) => (isRef.current[1] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Group/My_MyGroup_0.png'
        }
      />
      <Content_ol>
        <li>
          가입한 그룹 목록{' '}
          <span style={{ color: '#7BA9EB' }}>(최대 3개 가입 가능)</span>
        </li>
        <li>
          그룹 북마크{' '}
          <span style={{ color: '#7BA9EB' }}>
            (가입한 그룹 중 1개만 등록 가능)
          </span>
        </li>
        <li>그룹 검색(만들기)으로 이동</li>
        <li>통계 기준 날짜 설정</li>
        <li>새로고침, 출석부, 그룹 정보, 그룹 삭제(나가기)</li>
        <li>
          통계 기간 설정{' '}
          <span style={{ color: '#7BA9EB' }}>
            (1번에서 설정한 날짜 기준으로 기간 계산)
          </span>
        </li>
        <li>학습 시간 통계</li>
        <li>그룹원 리스트</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[2] = el)} />
      <TitleImg>그룹 출석부</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Group/My_MyGroup_1.png'
        }
      />
      <Content_ol>
        <li>그룹 출석부</li>
        <li>
          출석부 열람 기간 선택
          <SubContent>
            &#8251;{' '}
            <span style={{ color: '#7BA9EB' }}>
              학습 시간이 그룹 목표 이상을 만족해야 출석 인정
            </span>
          </SubContent>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[3] = el)} />
      <TitleImg>그룹 정보 (수정)</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Group/My_MyGroup_2.png'
        }
      />
      <Content_ol>
        <li>
          그룹 정보 수정으로 이동{' '}
          <span style={{ color: '#7BA9EB' }}>
            (해당 버튼은 방장에게만 활성화)
          </span>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[4] = el)} />
      <TitleImg>그룹 삭제 (나가기)</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Group/My_MyGroup_3.png'
        }
      />
      <Content_ol>
        <li>
          그룹 삭제{' '}
          <span style={{ color: '#7BA9EB' }}>
            (그룹의 방장이면 해당 버튼 활성화)
          </span>
        </li>
        <li>
          그룹 나가기{' '}
          <span style={{ color: '#7BA9EB' }}>
            (그룹원이면 해당 버튼 활성화)
          </span>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[5] = el)} />
      <TitleImg>그룹원 추방</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Group/My_MyGroup_4.png'
        }
      />
      <Content_ol>
        <li>해당 그룹원 이미지를 클릭</li>
        <li>추방 버튼 클릭</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[6] = el)} />
      <Title_h1>그룹 검색</Title_h1>
      <TitleContent>
        다양한 그룹들을 둘러보고 가입할 수 있습니다.
        <br />
        필터링 기능을 사용해 내가 원하는 그룹을 찾을 수 있습니다.
      </TitleContent>
      <ScrollPoint ref={(el) => (isRef.current[7] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/Group/My_GroupSearch_0.png'
        }
      />
      <Content_ol>
        <li>그룹 검색 필터</li>
        <li>그룹 만들기로 이동</li>
        <li>
          그룹 목록{' '}
          <span style={{ color: '#7BA9EB' }}>
            (개별 그룹 클릭 시 살펴보기 가능)
          </span>
        </li>
        <li>더 많은 그룹 탐색</li>
      </Content_ol>
    </>
  );
};
