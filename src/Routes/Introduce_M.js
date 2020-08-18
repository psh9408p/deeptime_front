import React from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SwipeWrap = styled.div`
  width: 70%;
`;

export default () => {
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
      <SwipeWrap>
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
      </SwipeWrap>
    </Wrapper>
  );
};
