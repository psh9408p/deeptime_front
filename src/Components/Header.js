import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Logo, Shutter, User, Shop, Guide, MyStudy } from './Icons';
import Avatar from './Avatar';
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../SharedQueries';

const Header = styled.header`
  width: 100%;
  height: 68px;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  z-index: 999;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0px 40px;
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  text-align: center;
  &:first-child {
    width: 40%;
    margin-right: auto;
    text-align: left;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    @media (max-width: 845px) {
      width: 20%;
      min-width: 190px;
    }
  }
  &:nth-child(2) {
    width: 20%;
    @media (max-width: 845px) {
      width: 60%;
    }
  }
  &:last-child {
    width: 40%;
    margin-left: auto;
    justify-content: flex-end;
    display: inline-flex;
    @media (max-width: 845px) {
      width: 20%;
      min-width: 190px;
    }
  }
`;

const AiBox = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px 15px;
  height: 45px;
  width: 194px;
  border: 1px solid ${(props) => props.theme.classicBlue};
  border-radius: 3px;
`;

const HeaderLink = styled(Link)`
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 20px;
  }
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  height: 45px;
`;

// const GuideLink = styled(HeaderLink)`
//   @media (max-width: 845px) {
//     display: none;
//   }
// `;

// const MystudyLink = styled(HeaderLink)`
//   @media (max-width: 675px) {
//     display: none;
//   }
// `;

const AiHeaderLink = styled(HeaderLink)`
  color: ${(props) => props.theme.classicBlue};
  &:nth-child(2) {
    margin-left: 15px;
  }
`;

const PotalButton = styled.button`
  cursor: pointer;
  margin: 0px 15px 0px 15px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  outline: none;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  background: none;
  border: 0;
`;

const TmpButton = styled.button`
  cursor: pointer;
  margin: 0px 20px 0px 0px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  outline: none;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  background: none;
  border: 0;
`;

const VisualShort = styled.div`
  display: none;
  @media (max-width: 845px) {
    display: flex;
  }
`;

const VisualLong = styled.div`
  @media (max-width: 845px) {
    display: none;
  }
`;

export default withRouter(() => {
  const [potal, setPotal] = useState();

  const { data, loading } = useQuery(ME);

  const onClickPotal_student = () => {
    const detect_window = window.open(
      window.location.origin + '/#/study',
      'detect',
      'height=560,width=1020,fullscreen=yes,resizable=no,location=no,menubar=no,status=no,titlebar=no,toolbar=no',
    );
    setPotal(detect_window);
  };

  if (!loading && data && data.me) {
    return (
      <Header>
        <HeaderWrapper>
          <HeaderColumn>
            <Link to="/" replace>
              <Logo />
            </Link>
          </HeaderColumn>
          <HeaderColumn>
            {data.me && data.me.loginPosition === 'student' && (
              <AiBox>
                <Shutter />
                <PotalButton
                  type="button"
                  onClick={
                    onClickPotal_student
                    // () => {
                    //   alert('개인용 서비스는 준비 중 입니다.');
                    // }
                  }
                >
                  학습
                </PotalButton>
                <AiHeaderLink to="/timelapse" replace>
                  타임랩스
                </AiHeaderLink>
              </AiBox>
            )}
            {/* {data.me && data.me.loginPosition.includes('manager') && (
              <AiBox>
                <Shutter />
                <AiHeaderLink to="/" replace>
                  출석
                </AiHeaderLink>
                <AiHeaderLink to="/supervision" replace>
                  감독
                </AiHeaderLink>
                <AiHeaderLink to="/marking" replace>
                  채점
                </AiHeaderLink>
              </AiBox>
            )} */}
          </HeaderColumn>
          {data.me && data.me.loginPosition.includes('manager') && (
            <HeaderColumn>
              {/* <HeaderLink to="/" replace>
                학원
              </HeaderLink>
              <HeaderLink to="/class" replace>
                클래스
              </HeaderLink>
              <HeaderLink to="/student" replace>
                학생
              </HeaderLink> */}
              {/* <HeaderLink to="/shop" replace>
                <Shop />
              </HeaderLink> */}
              <TmpButton
                type="button"
                onClick={() => {
                  alert('상품 구매는 준비 중 입니다.');
                }}
              >
                <Shop />
              </TmpButton>
              {!data.me ? (
                <HeaderLink to="/#">
                  <User />
                </HeaderLink>
              ) : (
                <HeaderLink to={'/' + data.me.username} replace>
                  <Avatar size="sm" url={data.me.avatar} />
                </HeaderLink>
              )}
            </HeaderColumn>
          )}
          {data.me && data.me.loginPosition === 'student' && (
            <HeaderColumn>
              <HeaderLink to="/" replace>
                <VisualLong>나의 학습</VisualLong>
                <VisualShort>
                  <MyStudy />
                </VisualShort>
              </HeaderLink>
              {/* <TmpButton
                type="button"
                onClick={() => {
                  alert('클래스 학습 서비스는 준비 중 입니다.');
                }}
              >
                클래스 학습
              </TmpButton> */}
              <HeaderLink target="_blank" to="/userguide/schedule" replace>
                <VisualLong>사용가이드</VisualLong>
                <VisualShort>
                  <Guide />
                </VisualShort>
              </HeaderLink>
              {!data.me ? (
                <HeaderLink to="/#">
                  <User />
                </HeaderLink>
              ) : (
                <HeaderLink to={'/' + data.me.username} replace>
                  <Avatar size="sm" url={data.me.avatar} />
                </HeaderLink>
              )}
            </HeaderColumn>
          )}
        </HeaderWrapper>
      </Header>
    );
  } else {
    return <></>;
  }
});
