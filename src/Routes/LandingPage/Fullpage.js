import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Footer from '../../Components/Footer';
import styled from 'styled-components';
import Video from './Video';
import { BrowserView, MobileView } from 'react-device-detect';
import LandingContent from './LandingContent';
import LandingTitle from './LandingTitle';
import TitleVideo from './TitleVideo';

const Environment =
  'https://slog-iam.s3.ap-northeast-2.amazonaws.com/introduce/Environment.png';
const Rocket =
  'https://slog-iam.s3.ap-northeast-2.amazonaws.com/introduce/Rocket.png';
const Todo =
  'https://slog-iam.s3.ap-northeast-2.amazonaws.com/introduce/Todo.png';
const Scheduler =
  'https://slog-iam.s3.ap-northeast-2.amazonaws.com/introduce/Scheduler.png';
const Group =
  'https://slog-iam.s3.ap-northeast-2.amazonaws.com/introduce/Group.png';

const Click =
  'https://www.wiredmango.com/types-of-ads-in-google-adwords/699458-icon-27-one-finger-click-512/';

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

const anchors = ['', '', 'Payment', '', '', ''];
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
              <TitleVideo />
              <LandingTitle />
            </div>
            <div className="section" data-anchor="1">
              <LandingContent
                title={'나를 공부하게 하는건 너가 처음이야'}
                subTitle1={'딥타임의 AI 영상처리 엔진이'}
                subTitle2={'여러분의 정확한 학습 시간을 측정합니다.'}
                Img={Environment}
                imgWidth={'100%'}
              />
            </div>
            <div className="section" data-anchor="2">
              {/* <BrowserView>
                <IsBrowser>This is rendered only in browser</IsBrowser>
              </BrowserView>
              <MobileView>
                <IsMobile> This is rendered only on mobile </IsMobile>
              </MobileView> */}
              <LandingContent
                title={'세상 편한 시간 관리'}
                subTitle1={'“투두”와 “플레너”의 완벽한 조화.'}
                subTitle2={'할일은 손쉽게 기록, 계획은 체계적으로 .'}
                Img={Todo}
                Img2={Scheduler}
                imgWidth={'30%'}
              />
            </div>
            <div className="section " data-anchor="3">
              <LandingContent
                title={'목표, 함께하면 더 가까워진다.'}
                subTitle1={'서로 감시만 하는 그룹 스터디는 그만. '}
                subTitle2={
                  '서로에게 도움이 되는 진짜 그룹 스터디를 경험하세요.'
                }
                Img={Group}
                imgWidth={'100%'}
              />
            </div>
            <div className="section " data-anchor="4">
              <LandingContent
                title={'같은 시간, 같은 환경, 같은 행동'}
                subTitle1={'마법이 시작될 때까지 이 모든 것을 반복하라.'}
                subTitle2={'- HABIT, 인간 행동 연구 전문가 웬디 우드'}
              />
            </div>
            <div className="section " data-anchor="5">
              <LandingContent
                title={'써보면서 이해하는게 가장 빨라요.'}
                // subTitle1={'딥타임으로 2분만에 갈아 타기'}
                Img={Rocket}
                imgWidth={'100%'}
                isLast={true}
              />
            </div>
          </ReactFullpage.Wrapper>
        </>
      );
    }}
  />
);

export default Fullpage;
