import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter, useLocation } from 'react-router-dom';
import {
  Logo,
  User,
  Shop,
  Guide_white,
  Guide_black,
  MyStudy,
  Play,
  Person_white,
  Person_black,
  People_black,
  People_white,
  List,
} from './Icons';
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
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: black;
  padding: 10px 15px;
  height: 45px;
  width: 118px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 23px;
  :hover {
    background-color: ${(props) => props.theme.classicGray};
    filter: none;
  }
  :active {
    background-color: ${(props) => props.theme.classicGray};
    transform: translateY(4px);
  }
`;

const HeaderLink = styled(Link)`
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 20px;
  }
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 18px;
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

  font-size: 18px;
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
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];

  const [potal, setPotal] = useState();

  const { data, loading } = useQuery(ME);

  const onClickPotal_student = () => {
    const detect_window = window.open(
      window.location.origin + '/#/study',
      'detect',
      'height=600,width=1000,fullscreen=yes,resizable=no,location=no,menubar=no,status=no,titlebar=no,toolbar=no',
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
            <AiBox
              onClick={() => {
                onClickPotal_student();
              }}
            >
              <Play margin={'0 10px 0 0'} />
              Play
            </AiBox>
          </HeaderColumn>
          <HeaderColumn>
            <HeaderLink to="/" replace>
              {/* <VisualLong>My</VisualLong>
                <VisualShort>
                  <MyStudy />
                </VisualShort> */}
              {pageName === '' ? (
                <Person_black fill={'#0F4C82'} />
              ) : (
                <Person_white />
              )}
            </HeaderLink>
            <HeaderLink to="/group" replace>
              {pageName === 'group' ? (
                <People_black fill={'#0F4C82'} />
              ) : (
                <People_white />
              )}
            </HeaderLink>
            <HeaderLink to="/feed" replace>
              <List fill={pageName === 'feed' ? '#0F4C82' : 'black'} />
            </HeaderLink>
            <HeaderLink to="/shop" replace>
              <Shop fill={pageName === 'shop' ? '#0F4C82' : 'black'} />
            </HeaderLink>
            {/* <HeaderLink target="_blank" to="/userguide" replace>
                {pageName === 'userguide' ? (
                  <Guide_black fill={'#0F4C82'} />
                ) : (
                  <Guide_white />
                )}
              </HeaderLink> */}
            {!data.me ? (
              <HeaderLink to="/#">
                <User />
              </HeaderLink>
            ) : (
              <HeaderLink to={'/' + data.me.username} replace>
                <Avatar size="sm2" url={data.me.avatar} />
              </HeaderLink>
            )}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
    );
  } else {
    return <></>;
  }
});
