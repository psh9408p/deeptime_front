import React from 'react';
import styled from 'styled-components';
const VideoWrap = styled.div`
  background-position: center;
  background-size: cover;
  filter: brightness(100%);
  opacity: 0.3;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  @media (max-width: 767px) {
    display: none;
  }
`;

const VideoIn = styled.video`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
`;

const TitleVideo = () => {
  return (
    <VideoWrap>
      <VideoIn
        //   autoPlay
        //   playsInline
        //   muted
        loop
        //   controls
        muted
        data-autoplay
      >
        <source src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/IntroTimelapse.mp4"></source>
      </VideoIn>
    </VideoWrap>
  );
};

export default TitleVideo;
