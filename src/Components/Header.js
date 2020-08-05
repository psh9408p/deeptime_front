import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Logo, Shutter, User, Shop } from './Icons';
import Avatar from './Avatar';
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../SharedQueries';

const Header = styled.header`
  width: 100%;
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
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0px 40px;
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
  }
  &:last-child {
    margin-left: auto;
    justify-content: flex-end;
    display: inline-flex;
  }
`;

const AiBox = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px 15px;
  height: 100%;
  border: 1px solid ${(props) => props.theme.classicBlue};
  border-radius: 3px;
`;

const HeaderLink = styled(Link)`
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 30px;
  }
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
`;

const AiHeaderLink = styled(HeaderLink)`
  color: ${(props) => props.theme.classicBlue};
  &:nth-child(2) {
    margin-left: 15px;
  }
`;

const PotalButton = styled.button`
  cursor: pointer;
  margin: 0px 30px 0px 15px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  background: none;
  border: 0;
`;

export default withRouter(() => {
  const [potal, setPotal] = useState();

  const { data, loading } = useQuery(ME);

  const onClickPotal_student = () => {
    const detect_window = window.open(
      window.location.origin + '/#/study',
      'detect',
      'height=361,width=481,fullscreen=yes,resizable=no,location=no,menubar=no,status=no,titlebar=no,toolbar=no',
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
                <PotalButton type="button" onClick={onClickPotal_student}>
                  학습
                </PotalButton>
                <AiHeaderLink to="/attendance" replace>
                  출석
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
              <HeaderLink to="/shop">
                <Shop />
              </HeaderLink>
              {!data.me ? (
                <HeaderLink to="/#">
                  <User />
                </HeaderLink>
              ) : (
                <HeaderLink to={data.me.username} replace>
                  <Avatar size="sm" url={data.me.avatar} />
                </HeaderLink>
              )}
            </HeaderColumn>
          )}
          {data.me && data.me.loginPosition === 'student' && (
            <HeaderColumn>
              <HeaderLink to="/" replace>
                나의 학습
              </HeaderLink>
              <HeaderLink to="/classstudy" replace>
                클래스 학습
              </HeaderLink>
              <HeaderLink to="/shop">
                <Shop />
              </HeaderLink>
              {!data.me ? (
                <HeaderLink to="/#">
                  <User />
                </HeaderLink>
              ) : (
                <HeaderLink to={data.me.username} replace>
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
