import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import GuideBody from './GuideBody';

const ItemBox = styled.ul`
  display: flex;
`;
const Item = styled.li`
  width: 100px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? '#3498db' : 'transparent')};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;
const GuideHeader = ({ location: { pathname } }) => {
  return (
    <>
      {' '}
      <div>
        <ItemBox>
          <Item current={pathname === '/jungbo'}>
            <SLink to="/jungbo">사용 안내</SLink>
          </Item>
          <Item current={pathname === '/jilmoon'}>
            <SLink to="/jilmoon">자주 묻는 질문</SLink>
          </Item>
        </ItemBox>
      </div>{' '}
      <GuideBody />
    </>
  );
};

export default withRouter(GuideHeader);
