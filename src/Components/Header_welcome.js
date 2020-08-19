import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Logo, Shutter } from './Icons';

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
  /* max-width: ${(props) => props.theme.maxWidth}; */
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

const WelcomeLink = styled(Link)`
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
  color: ${(props) => props.theme.classicBlue};
  &:first-child {
    font-size: 18px;
  }
`;

const IamText = styled.div`
  font-size: 18px;
  margin: 0px 8px 0px 10px;
`;

const PotalButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  outline: none;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  background: none;
  border: 1px solid ${(props) => props.theme.classicBlue};
  border-radius: 3px;
  padding: 0px 10px;
`;

export default withRouter(() => {
  const onClickPotal_student = () => {
    const detect_window = window.open(
      window.location.origin + '/#/experience',
      'detect',
      'height=361,width=481,fullscreen=yes,resizable=no,location=no,menubar=no,status=no,titlebar=no,toolbar=no',
    );
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/" replace>
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <AiBox>
            <WelcomeLink to="/" replace>
              IAM
            </WelcomeLink>
            <WelcomeLink to="/userguide/student/connectseat" replace>
              사용가이드
            </WelcomeLink>
            <WelcomeLink to="/shopping" replace>
              구매하기
            </WelcomeLink>
            <WelcomeLink to="/support" replace>
              고객센터
            </WelcomeLink>
          </AiBox>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/auth" replace>
            로그인
          </HeaderLink>
          <PotalButton type="button" onClick={onClickPotal_student}>
            <Shutter />
            <IamText>IAM</IamText>체험하기
          </PotalButton>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
