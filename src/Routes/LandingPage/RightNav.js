import React from 'react';
import styled from 'styled-components';
import { List } from '../../Components/Icons';

const TopNav = styled.ul`
  /* position: fixed; */
  z-index: 999;
  display: flex;
  min-width: 300px;
  justify-content: space-between;
  list-style: none;
  box-sizing: border-box;
  align-items: center;
  font-size: 1rem;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightNav = () => {
  return (
    <TopNav className={List}>
      <li>소개</li>
      <li>사용가이드</li>
      <li>베타테스트</li>
      <li>로그인</li>
    </TopNav>
  );
};

export default RightNav;
