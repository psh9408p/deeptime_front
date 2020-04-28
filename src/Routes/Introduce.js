import React from "react"
import Swiper from "react-id-swiper"
import "swiper/css/swiper.css"

export default () => {
  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  }
  return (
    <Swiper {...params}>
      <div>
        <img
          src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C1.jpg"
          alt="소개자료_1"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C2.jpg"
          alt="소개자료_2"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C3.jpg"
          alt="소개자료_3"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C4.jpg"
          alt="소개자료_4"
          width="100%"
        />
      </div>
    </Swiper>
  )
}
