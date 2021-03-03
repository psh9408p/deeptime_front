import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Footer from '../../Components/Footer';
import Payment from './Payment';
import styled from 'styled-components';
import Video from './Video';
import { BrowserView, MobileView } from 'react-device-detect';
import LandingContent from './LandingContent';
import LandingTitle from './LandingTitle';
const IsBrowser = styled.div`
  background: black;
  color: white;
  text-align: center;
  font-size: 40px;
  height: 400px;
`;

const IsMobile = styled.div`
  background: dodgerblue;
  color: white;
  height: 400px;
  text-align: center;
  font-size: 40px;
`;

const anchors = ['', '', 'Payment'];
const Fullpage = () => (
  <ReactFullpage
    //fullpage options
    anchors={anchors}
    navigation
    navigationTooltips
    lockAnchors
    sectionsColor={['white', 'white', 'white']}
    licenseKey={process.env.REACT_APP_FULLPAGE_KEY}
    scrollingSpeed={1000} /* Options here */
    render={({ state, fullpageApi }) => {
      return (
        <>
          <ReactFullpage.Wrapper>
            {/* <div className="section" data-anchor="slide1">
              <Introduce />
            </div> */}
            <div className="section ">
              {/* <Video /> */}
              <LandingTitle />
            </div>
            <div className="section" data-anchor="2">
              {/* <BrowserView>
                <IsBrowser>This is rendered only in browser</IsBrowser>
              </BrowserView>
              <MobileView>
                <IsMobile> This is rendered only on mobile </IsMobile>
              </MobileView> */}
              <LandingContent
                title={'속지마세요'}
                subTitle1={'타이머의 거짓말에 속지마세요.'}
                subTitle2={'DEEPTIME이 진짜 공부 시간을 찾아드립니다.'}
              />
            </div>
            <div className="section " data-anchor="3">
              <LandingContent
                title={'비교하세요'}
                subTitle1={'목표와 실행의 객관적 비교.'}
                subTitle2={'같은 목표를 가진 사람들의 데이터'}
                subTitle3={'이 두가지로 나만의 학습습관을 만들어보세요.'}
              />
            </div>
          </ReactFullpage.Wrapper>
        </>
      );
    }}
  />
);

export default Fullpage;
