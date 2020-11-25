import React, { useState } from 'react';
import styled from 'styled-components';
// import Swiper from 'react-id-swiper';
// import 'swiper/css/swiper.css';

import 'filepond/dist/filepond.min.css';
import { FilePond, File, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SwipeWrap = styled.div`
  width: 70%;
`;

const ImgDrop = styled(FilePond)`
  width: 300px;
  /* height: 100px; */
`;

export default () => {
  const [files, setFiles] = useState([]);

  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  return (
    <Wrapper>
      <ImgDrop
        files={files}
        allowReorder={true}
        allowMultiple={true}
        onupdatefiles={setFiles}
        server="/api"
        labelIdle='Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      {/* <SwipeWrap>
        <Swiper {...params}>
          <div>
            <img
              src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/welcomeImg/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C2.png"
              alt="소개자료_2"
              width="100%"
            />
          </div>
          <div>
            <img
              src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/welcomeImg/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C4.png"
              alt="소개자료_4"
              width="100%"
            />
          </div>
          <div>
            <img
              src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/welcomeImg/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C7.png"
              alt="소개자료_7"
              width="100%"
            />
          </div>
        </Swiper>
      </SwipeWrap> */}
    </Wrapper>
  );
};
