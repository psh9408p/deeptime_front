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
      <Title_h1>나의 프로필</Title_h1>
      <TitleContent>
        나의 정보를 확인할 수 있습니다.
        <br />
        나의 활동 내역을 확인하고 관리하세요.
      </TitleContent>
      <ScrollPoint ref={(el) => (isRef.current[1] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/profile/Profile_My_0.png'
        }
      />
      <Content_ol>
        <li>프로필 상세 정보</li>
        <li>게시물 정보</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[2] = el)} />
      <TitleImg>프로필 이미지 변경</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/profile/Profile_My_1.png'
        }
      />
      <Content_ol>
        <li>프로필 이미지 클릭</li>
        <li>원하는 이미지 파일 선택</li>
        <li>선택한 사진 미리보기</li>
        <li>프로필 이미지 변경 클릭</li>
        <li>기본값 이미지로 변경 원할 시 클릭</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[3] = el)} />
      <TitleImg>팔로우 기능</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/profile/Profile_My_2.png'
        }
      />
      <Content_ol>
        <li>나를 팔로우한 사용자 목록</li>
        <li>해당 사용자와 팔로우 활성화&amp;비활성화 버튼</li>
        <li>내가 팔로우한 사용자 목록</li>
        <li>
          팔로우 추가 기능{' '}
          <span style={{ color: '#7BA9EB' }}>
            (사용자의 Email 또는 닉네임 사용 가능)
          </span>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[4] = el)} />
      <TitleImg>프로필 편집</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/profile/Profile_My_3.png'
        }
      />
      <Content_ol>
        <li>설정 버튼 클릭</li>
        <li>프로필 내용 수정</li>
        <li>수정 완료 클릭</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[5] = el)} />
      <TitleImg>비밀번호 변경</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/profile/Profile_My_4.png'
        }
      />
      <Content_ol>
        <li>설정 버튼 클릭</li>
        <li>비밀번호 변경 클릭</li>
        <li>비밀번호 입력</li>
        <li>수정 완료 클릭</li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[6] = el)} />
      <TitleImg>타임랩스 만들기</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/profile/Profile_My_5.png'
        }
      />
      <Content_ol>
        <li>타임랩스 버튼 클릭</li>
        <li>Play에서 캡처한 이미지 파일들 선택</li>
        <li>
          영상 속도 설정{' '}
          <span style={{ color: '#7BA9EB' }}>
            (숫자가 클수록 영상 속도가 빨라짐)
          </span>
        </li>
        <li>타임랩스 만들기 클릭</li>
        <li>타임랩스 미리보기 확인</li>
        <li>
          타임랩스 다운로드 클릭{' '}
          <span style={{ color: '#7BA9EB' }}>
            (타임랩스 만들기를 실행해야 해당 버튼 활성화)
          </span>
        </li>
      </Content_ol>
      <ScrollPoint ref={(el) => (isRef.current[7] = el)} />
      <Title_h1>다른 사용자 프로필</Title_h1>
      <TitleContent>
        다른 사용자의 정보를 확인할 수 있습니다.
        <br />
        다른 사용자의 활동 내역을 비교분석하세요.
      </TitleContent>
      <ScrollPoint ref={(el) => (isRef.current[8] = el)} />
      <TitleImg>기본 정보</TitleImg>
      <ImgDiv
        src={
          'https://slog-iam.s3.ap-northeast-2.amazonaws.com/userguide/profile/Profile_Other_0.png'
        }
      />
      <Content_ol>
        <li>프로필 상세 정보</li>
        <li>해당 사용자와 팔로우 활성화&amp;비활성화 버튼</li>
        <li>
          해당 사용자의 게시물, 통계, 스케줄 열람
          <SubContent>
            &#8251;{' '}
            <span style={{ color: '#7BA9EB' }}>
              다른 사용자의 프로필 사진을 클릭하면 해당 사용자의 프로필 화면으로
              이동됩니다.
            </span>
          </SubContent>
        </li>
      </Content_ol>
    </>
  );
};
