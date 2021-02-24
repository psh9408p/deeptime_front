import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Footer3 from '../../Components/Footer3';
import Payment from './Payment';
import styled from 'styled-components';
import './fullpage.css';
import Video from './Video';
import { BrowserView, MobileView } from 'react-device-detect';

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
    // sectionsColor={['orange', 'purple', 'green']}
    licenseKey={'8399B96F-5C5C4927-ABD5A842-D8D658BC'}
    scrollingSpeed={1000} /* Options here */
    render={({ state, fullpageApi }) => {
      return (
        <>
          <ReactFullpage.Wrapper>
            {/* <div className="section" data-anchor="slide1">
              <Introduce />
            </div> */}
            <div className="section ">
              <Video />
            </div>
            <div className="section" data-anchor="2">
              <BrowserView>
                <IsBrowser>This is rendered only in browser</IsBrowser>
              </BrowserView>
              <MobileView>
                <IsMobile> This is rendered only on mobile </IsMobile>
              </MobileView>
            </div>
            <div className="section " data-anchor="3">
              <Payment />
            </div>
            <div className="section ">
              <Footer3 />
            </div>
          </ReactFullpage.Wrapper>
        </>
      );
    }}
  />
);

export default Fullpage;
