import React from 'react';
import styled from 'styled-components';

const VideoWrap = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  /* -webkit-filter: brightness(60%);
  filter: brightness(60%); */
`;

const VideoIn = styled.video`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
`;

const Video = () => {
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
        // style={{
        //   width: '100%',
        //   height: '100vh',
        //   objectFit: 'contain',
        //   position: 'absolute',
        //   top: '-6%',
        //   //   left: '0%',
        //   zIndex: '-100',
      >
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"></source>
      </VideoIn>
    </VideoWrap>
  );
};

export default Video;
