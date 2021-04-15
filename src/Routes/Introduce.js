import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { BrowserView, MobileView } from 'react-device-detect';
import { Play, Logo } from '../Components/Icons';
import RigtNav from './LandingPage/RightNav';
import Burger from './LandingPage/Burger';

// import Footer from '../Components/Footer';
import Fullpage from './LandingPage/Fullpage';
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  min-width: 320px;
  z-index: 10;
  background-color: #ffffff;
  border-bottom: solid 0.1px black;
  background-color: rgba(0, 0, 0, 0.001);
`;
const TopHeader = styled.div`
  /* background: white; */
  width: 100%;
  min-width: 320px;
  margin: 0;
  /* position: fixed; */
  top: 0;
  z-index: 10;
  display: flex;
  padding: 16px 20px;
`;

// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
// `;

// const SwipeWrap = styled.div`
//   width: 70%;
// `;

// const InWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 100px;
// `;

// const Title = styled.div`
//   font-size: 40px;
//   margin-bottom: 30px;
//   text-align: center;
//   line-height: 80px;
// `;

// const ButtonWrap = styled.div`
//   display: flex;
// `;

// const PotalButton = styled.button`
//   cursor: pointer;
//   display: inline-flex;
//   -webkit-box-align: center;
//   align-items: center;
//   outline: none;
//   font-weight: 600;
//   color: ${(props) => props.theme.classicBlue};
//   background-color: white;
//   border: 4px solid ${(props) => props.theme.classicBlue};
//   border-radius: 40px;
//   /* padding: 0px 10px; */
//   height: 80px;
//   padding: 0 20px;
//   :hover {
//     background-color: ${(props) => props.theme.classicGray};
//   }
//   :active {
//     background-color: ${(props) => props.theme.classicGray};
//     transform: translateY(4px);
//   }
//   &:first-child {
//     margin-right: 50px;
//     color: white;
//     background-color: ${(props) => props.theme.classicBlue};
//   }
//   &:nth-child(2) {
//     :hover {
//       filter: none;
//     }
//   }
// `;

// const IamText = styled.div`
//   font-size: 40px;
//   margin: 0px 0px 0px 5px;
// `;

// const DisplayDiv = styled.div``;

// const BoldT = styled.span`
//   font-size: 48px;
//   font-weight: bold;
// `;

export default () => {
  // let history = useHistory();

  // const onClickPotal_student = () => {
  //   const detect_window = window.open(
  //     window.location.origin + '/#/experience',
  //     'detect',
  //     'height=430,width=1000,fullscreen=yes,resizable=no,location=no,menubar=no,status=no,titlebar=no,toolbar=no',
  //   );
  // };

  const [visible, setVisible] = useState(false);
  return (
    <div>
      {/* <Header>
        <TopHeader>
          <Logo />
          <RigtNav />
          <Burger />
        </TopHeader>
      </Header> */}
      <Fullpage />
    </div>
  );
};
