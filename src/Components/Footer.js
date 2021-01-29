import React, { useState } from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  margin-top: 5rem;
  padding-top: 3rem;
  /* border-top: solid 4px; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  flex-direction: column;
  color: white;
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0;
  padding: 0;
`;

const MainFooter = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 24px 0;
  background: white;
  align-items: flex-start;
`;

const SubFooter = styled.div`
  max-width: 100%;
  background: white;
  margin-bottom: 15px;
  align-items: center;
  /* padding: 0px 16px; */
  display: flex;
  cursor: pointer;
  color: rgb(126, 137, 146);
`;

const SubFooterIn = styled.span`
  display: flex;
  color: black;
  justify-content: flex-start;
  align-items: center;
  max-width: 1200px;
  font-size: 12px;
  &:hover {
    color: #908991;
  }
`;

const SubFooterInArrow = styled.span`
  display: flex;
  align-items: center;
  font-size: 22px;
  margin-left: 5px;
  margin-top: 5px;
`;

const SubFooter2 = styled.div`
  background: white;
  width: 100%;
  color: black;
  font-size: 12px;
  margin: 15px 0px;
`;

const SubFooter2Wrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SubFooterUl = styled.ul`
  display: flex;
  margin-left: 15px;
`;
const SubFooterLi = styled.li`
  cursor: pointer;
  &:hover {
    color: #908991;
  }
`;
const FlexBox = styled.ul`
  display: flex;
  background: white;
  margin-right: 100px;
  font-size: 1rem;
  flex-direction: column;
  justify-content: flex-start;
`;
const SubFlexBox = styled.li`
  color: black;
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    color: #908991;
  }
`;

const MainFlexBox = styled.ul`
  display: flex;
  font-size: 14px;
  @media only screen and (max-width: 960px) {
    width: 300px;
  }
`;

const LeftFooter = styled.ul`
  display: flex;
  justify-content: flex-start;
  font-size: 1.5rem;
  margin-right: 140px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const LeftFooterTitle = styled.span`
  color: black;
  font-size: 20px;
  &:hover {
    color: gray;
  }
`;

const Stick = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  content: ' ';
  margin: 0 10px;
  border-left: 1px solid #525a61;
`;

const SubList = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background: white;
`;

const ToggleWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 1200px; */
  width: 105%;
  color: black;
  padding-bottom: 16px;
`;
const ToggleList = styled.div`
  width: 100%;
  background: white;
  margin-bottom: 15px;
  height: 1.5rem;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;

  color: black;
`;

const ToggleListIn = styled.div`
  font-size: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
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
      <MainWrap>
        <MainFooter>
          <LeftFooter>
            <LeftFooterTitle>사용법</LeftFooterTitle>
            <Stick></Stick>
            <LeftFooterTitle>FAQ</LeftFooterTitle>
          </LeftFooter>
          <MainFlexBox>
            <li>
              <FlexBox>
                <SubFlexBox>공지사항</SubFlexBox>
                <SubFlexBox>첼린지</SubFlexBox>
              </FlexBox>
            </li>
            <li>
              <FlexBox>
                <SubFlexBox>사업 제휴 문의</SubFlexBox>
                <SubFlexBox>취소 및 환불정책</SubFlexBox>
              </FlexBox>
            </li>
            <li>
              <FlexBox>
                <SubFlexBox>유투브</SubFlexBox>
                <SubFlexBox>인스타그램</SubFlexBox>
                <SubFlexBox>페이스북</SubFlexBox>
              </FlexBox>
            </li>
            <li>
              <FlexBox>
                <SubFlexBox>회사 소개</SubFlexBox>
                <SubFlexBox>인재 채용</SubFlexBox>
              </FlexBox>
            </li>
          </MainFlexBox>
        </MainFooter>
        <SubList>
          <SubFooter onClick={toggleHandler}>
            <SubFooterIn>딥타임 사업자 정보</SubFooterIn>
            <SubFooterInArrow>
              {!toggle ? <span>&#709;</span> : <span>&#708;</span>}
            </SubFooterInArrow>
          </SubFooter>
        </SubList>
        {!toggle ? (
          <div />
        ) : (
          <ToggleWrap>
            <ToggleList>
              <ToggleListIn>
                <span>대표자 박영석</span>
                <Stick />
                <span>사업자 등록번호 656-23-00836</span>
                <Stick />
                <span>통신판매업</span>
              </ToggleListIn>
              <ToggleListIn>
                <span>이메일 deeptime.customer@gmail.com</span>
                <Stick />
                <span>대표전화 02-xxxx-xxxx</span>
              </ToggleListIn>
              <ToggleListIn>
                <span>
                  주소 서울특별시 성동구 성수일로99 AK밸리 8층 802호 서울숲
                  스타트업센터
                </span>
              </ToggleListIn>
            </ToggleList>
          </ToggleWrap>
        )}
        <SubFooter2>
          <SubFooter2Wrap>
            <p>© RIDI Corp.</p>
            <SubFooterUl>
              <SubFooterLi>이용약관</SubFooterLi>
              <Stick />
              <SubFooterLi>개인정보 처리방침</SubFooterLi>
              <Stick />
              <SubFooterLi>사업자</SubFooterLi>
              <Stick />
              <SubFooterLi>정보 확인</SubFooterLi>
            </SubFooterUl>
          </SubFooter2Wrap>
        </SubFooter2>
        {/* <Copyright>&copy; {new Date().getFullYear()} DEEPTIME FROM SLOG</Copyright> */}
      </MainWrap>
    </Footer>
  );
};
