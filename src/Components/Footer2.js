import React, { useState } from 'react';
import styled from 'styled-components';

const Stick = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  content: ' ';
  margin: 0 10px;
  border-left: 1px solid #525a61;
`;
const Footer = styled.div`
  width: 100%;
`;

const Nav = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  list-style: none;
  margin: auto;
`;

const Nav_Left = styled.ul`
  width: 30%;
  display: flex;
  height: 100%;
`;
const Nav_Left_aside = styled.span`
  font-size: 1.429rem;
`;

const Nav_Right = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-start;
`;

const Nav_Right_aside = styled.div`
  margin-right: 16px;
  font-size: 1rem;
`;
const Nav_Right_Title = styled.div`
  margin-bottom: 16px;
`;

const Info = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
`;
const Policy = styled.div`
  width: 80%;
  margin: auto;
`;

export default () => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  return (
    <Footer>
      <Nav>
        <Nav_Left>
          <Nav_Left_aside>사용법</Nav_Left_aside>
          <Stick />
          <Nav_Left_aside>FAQ</Nav_Left_aside>
        </Nav_Left>
        <Nav_Right>
          <li>
            <Nav_Right_aside>
              <Nav_Right_Title>공지사항</Nav_Right_Title>
              <Nav_Right_Title>첼린지</Nav_Right_Title>
            </Nav_Right_aside>
          </li>
          <li>
            <Nav_Right_aside>
              <Nav_Right_Title>사업 제휴 문의</Nav_Right_Title>
              <Nav_Right_Title>취소 및 환불정책</Nav_Right_Title>
            </Nav_Right_aside>
          </li>
          <li>
            <Nav_Right_aside>
              <Nav_Right_Title>유투브</Nav_Right_Title>
              <Nav_Right_Title>인슽그램</Nav_Right_Title>
              <Nav_Right_Title>페이스북</Nav_Right_Title>
            </Nav_Right_aside>
          </li>
          <li>
            <Nav_Right_aside>
              <Nav_Right_Title>회사소개</Nav_Right_Title>
              <Nav_Right_Title>인재 채용</Nav_Right_Title>
            </Nav_Right_aside>
          </li>
        </Nav_Right>
      </Nav>
      <Info>
        <div>딥타임 사업자 정보</div>
        <button onClick={toggleHandler}>&#709;</button>
      </Info>
      {toggle && <div>hihihi</div>}
      <Policy>© RIDI Corp.</Policy>
    </Footer>
  );
};
