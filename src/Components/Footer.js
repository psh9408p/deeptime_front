import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopStick = styled.span`
  position: relative;
  font-size: 12px;
  align-items: center;
  content: '|';
  z-index: 999;
  top: -0.5px;
  color: white;
  margin: 0 5.5px;
  margin-top: 1.5px;
`;

const Stick = styled.span`
  position: relative;
  font-size: 6px;
  content: '|';
  z-index: 999;
  top: -0.5px;
  color: #525a61;
  margin: 0 5.5px;
`;

const Section = styled.div`
  background: #0f4c82;
  width: 100%;
  color: white;
  height: ${(props) => (props.isIntro ? '100vh' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.isIntro ? '0' : '15vh')};
  bottom: 0;
  z-index: 9999;
`;

const Footer = styled.div`
  background: #0f4c82;
  color: white;

  width: 480px;
  padding-bottom: 14px;
  margin-left: 10%;
  margin-right: 10%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  @media (min-width: 950px) {
    width: 50%;
    margin: 0 auto;
    padding-inline-start: 0px;

    /* align-items: center; */
  }
`;

const FooterTop = styled.div`
  width: 110%;
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
  @media (min-width: 950px) {
  }
`;

const FooterTop_Left = styled.ul`
  padding-top: 16px;
  font-size: 18px;
  width: 30%;
  display: flex;
  margin-bottom: 16px;
  /* flex-basis: 300; */
  @media (min-width: 950px) {
    /* margin: 0 auto; */
    width: 30%;
    margin-right: -60px;
  }
`;
const FooterTop_Left_Item = styled(Link)`
  /* margin-right: 8px; */
  color: white;
  width: 60px;
  &:hover {
    color: #908991;
  }
`;

const FooterTop_Right = styled.ul`
  padding-top: 16px;
  width: 70%;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  flex-basis: 550px;
  @media (max-width: 950px) {
    display: none;
  }
`;
const FooterTop_Right_Item = styled.li`
  margin-bottom: 16px;
  margin-right: 24px;
  color: white;
  &:hover {
    color: #908991;
  }
`;

const HiddenFooterTop_Right = styled.ul`
  list-style: none;
  margin-bottom: 16px;
  margin-right: 24px;
  margin: 0 16px auto;

  @media (min-width: 950px) {
    display: none;
  }
`;
const HiddenFooterTop_Right_Item = styled.li`
  list-style: none;
  padding-top: 16px;
  margin-bottom: 16px;
  margin-right: 24px;
  &:hover {
    color: #908991;
  }
  @media (min-width: 950px) {
    display: none;
  }
`;

// const FooterTop_Right2_ItemList = styled.ul``;
// const FooterTop_Right2_Item = styled.li`
//   margin-bottom: 16px;
//   &:hover {
//     color: #908991;
//   }
// `;
const FooterMid = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  /* justify-content: center; */
  &:hover {
    color: #908991;
  }
  @media (min-width: 950px) {
    width: 40%;
  }
`;
const FooterMidBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 25px;
  margin-left: 5px;
  transform: rotate(90deg);
`;

const FooterMidToggle = styled.div`
  font-size: 10px;
  margin-bottom: 8px;
  flex-basis: 2000px;
  @media (min-width: 950px) {
    width: 40%;
  }
`;

const FooterMidToggle_Itemlist = styled.div`
  margin-bottom: 4px;
  width: 1000px;
`;

const FooterMidToggle_Item = styled.span``;

const FooterBot = styled.div`
  width: 100%;
  font-size: 14px;

  @media (min-width: 950px) {
    width: 40%;
  }
`;

const FooterBot_Title = styled.p`
  margin-bottom: 8px;
`;

const FooterBotUl = styled.ul`
  display: flex;
  font-size: 11px;
  /* margin-right: 5.5px; */
  width: 1000px;
`;
const FooterBotli = styled.li`
  /* margin-right: 5.5px; */
  &:hover {
    color: #908991;
  }
`;

export default ({ isIntro = false }) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  return (
    <Section isIntro={isIntro}>
      <Footer>
        <FooterTop>
          <FooterTop_Left>
            <FooterTop_Left_Item to="/userguide/play">
              ?????????
            </FooterTop_Left_Item>
            <TopStick>|</TopStick>
            <FooterTop_Left_Item>FAQ</FooterTop_Left_Item>
          </FooterTop_Left>
          <FooterTop_Right>
            <li>
              <ul>
                <FooterTop_Right_Item>????????????</FooterTop_Right_Item>
                {/* <FooterTop_Right_Item>?????????</FooterTop_Right_Item> */}
              </ul>
            </li>
            <li>
              <ul>
                <FooterTop_Right_Item>?????? ????????????</FooterTop_Right_Item>
                {/* <Link to="/refund">
                  <FooterTop_Right_Item>?????? ??? ???????????? </FooterTop_Right_Item>
                </Link> */}
              </ul>
            </li>
            <li>
              <ul>
                <FooterTop_Right_Item>?????????</FooterTop_Right_Item>
                <FooterTop_Right_Item>???????????????</FooterTop_Right_Item>
                <FooterTop_Right_Item>????????????</FooterTop_Right_Item>
              </ul>
            </li>
            <li>
              <ul>
                <FooterTop_Right_Item>????????????</FooterTop_Right_Item>
                {/* <FooterTop_Right_Item>????????????</FooterTop_Right_Item> */}
              </ul>
            </li>
          </FooterTop_Right>
          <li style={{ listStyle: 'none' }}>
            <HiddenFooterTop_Right>
              <HiddenFooterTop_Right_Item>????????????</HiddenFooterTop_Right_Item>
              {/* <HiddenFooterTop_Right_Item>?????????</HiddenFooterTop_Right_Item> */}
              <HiddenFooterTop_Right_Item>
                ?????? ????????????
              </HiddenFooterTop_Right_Item>
              {/* <HiddenFooterTop_Right_Item>
                ?????? ??? ????????????
              </HiddenFooterTop_Right_Item> */}
            </HiddenFooterTop_Right>
          </li>
          <li style={{ listStyle: 'none' }}>
            <HiddenFooterTop_Right>
              <HiddenFooterTop_Right_Item>?????????</HiddenFooterTop_Right_Item>
              <HiddenFooterTop_Right_Item>
                ???????????????
              </HiddenFooterTop_Right_Item>
              <HiddenFooterTop_Right_Item>
                {/* <a
                  style={{
                    hover: 'black',
                    textDecoration: 'none',
                    outline: 'none',
                    color: 'white',
                  }}
                  href="https://www.facebook.com/"
                > */}
                ????????????
                {/* </a> */}
              </HiddenFooterTop_Right_Item>
              <HiddenFooterTop_Right_Item>????????????</HiddenFooterTop_Right_Item>
              {/* <HiddenFooterTop_Right_Item>????????????</HiddenFooterTop_Right_Item> */}
            </HiddenFooterTop_Right>
          </li>
        </FooterTop>
        <FooterMid onClick={toggleHandler}>
          <span>????????? ????????? ??????</span>
          {!toggle ? (
            <FooterMidBtn>&#8250;</FooterMidBtn>
          ) : (
            <FooterMidBtn>&#8249;</FooterMidBtn>
          )}
        </FooterMid>
        {toggle && (
          <FooterMidToggle>
            <FooterMidToggle_Itemlist>
              <FooterMidToggle_Item>????????? ?????????</FooterMidToggle_Item>
              <Stick>|</Stick>
              <FooterMidToggle_Item>
                ????????? ???????????? 656-23-00836
              </FooterMidToggle_Item>
              <Stick>|</Stick>
              <FooterMidToggle_Item>???????????????</FooterMidToggle_Item>
            </FooterMidToggle_Itemlist>
            <FooterMidToggle_Itemlist>
              <FooterMidToggle_Item>
                ????????? deeptime.customer@gmail.com
              </FooterMidToggle_Item>
              <Stick>|</Stick>
              <FooterMidToggle_Item>???????????? 02-xxxx-xxxx</FooterMidToggle_Item>
            </FooterMidToggle_Itemlist>
            <FooterMidToggle_Itemlist>
              <FooterMidToggle_Item>
                ?????? ??????????????? ????????? ????????????99 AK?????? 8??? 802??? ?????????
                ??????????????????
              </FooterMidToggle_Item>
            </FooterMidToggle_Itemlist>
          </FooterMidToggle>
        )}
        <FooterBot>
          <FooterBot_Title>@SLOG.</FooterBot_Title>
          <FooterBotUl>
            <FooterBotli>?????? ??????</FooterBotli>
            <Stick>|</Stick>
            <FooterBotli>???????????? ????????????</FooterBotli>
            <Stick>|</Stick>
            <FooterBotli>?????????</FooterBotli>
            <Stick>|</Stick>
            <FooterBotli>?????? ??????</FooterBotli>
          </FooterBotUl>
        </FooterBot>
      </Footer>
    </Section>
  );
};
