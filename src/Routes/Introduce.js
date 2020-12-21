import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { Play } from '../Components/Icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SwipeWrap = styled.div`
  width: 70%;
`;

const InWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

const Title = styled.div`
  font-size: 40px;
  margin-bottom: 30px;
  text-align: center;
  line-height: 80px;
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const PotalButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  outline: none;
  font-weight: 600;
  color: ${(props) => props.theme.classicBlue};
  background-color: white;
  border: 4px solid ${(props) => props.theme.classicBlue};
  border-radius: 40px;
  /* padding: 0px 10px; */
  height: 80px;
  padding: 0 20px;
  :hover {
    background-color: ${(props) => props.theme.classicGray};
  }
  :active {
    background-color: ${(props) => props.theme.classicGray};
    transform: translateY(4px);
  }
  &:first-child {
    margin-right: 50px;
    color: white;
    background-color: ${(props) => props.theme.classicBlue};
  }
  &:nth-child(2) {
    :hover {
      filter: none;
    }
  }
`;

const IamText = styled.div`
  font-size: 40px;
  margin: 0px 0px 0px 5px;
`;

const DisplayDiv = styled.div``;

const BoldT = styled.span`
  font-size: 48px;
  font-weight: bold;
`;

export default () => {
  let history = useHistory();

  const onClickPotal_student = () => {
    const detect_window = window.open(
      window.location.origin + '/#/experience',
      'detect',
      'height=430,width=1000,fullscreen=yes,resizable=no,location=no,menubar=no,status=no,titlebar=no,toolbar=no',
    );
  };

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
      <InWrap>
        <Title>
          <BoldT style={{ color: '#DB4437' }}>코로나</BoldT>로{' '}
          <BoldT>지겨운 집콕...</BoldT>
          <br />
          <BoldT style={{ color: '#0F4C82' }}>DEEPTIME 챌린지</BoldT>로{' '}
          <BoldT style={{ color: '#DB4437' }}>극뽁!</BoldT>
          <br />
          <BoldT style={{ color: '#0F4C82' }}>
            SNS로 학습 결과 공유
          </BoldT>하고 <BoldT>상품</BoldT>{' '}
          <BoldT style={{ color: '#DB4437' }}>겟겟~</BoldT>
        </Title>
        <ButtonWrap>
          <PotalButton type="button" onClick={onClickPotal_student}>
            {/* <Play /> */}
            <DisplayDiv>
              <IamText>딥타 체험하기</IamText>
            </DisplayDiv>
          </PotalButton>
          <PotalButton
            type="button"
            onClick={() => {
              history.push('/auth');
            }}
          >
            <DisplayDiv>
              <IamText>지금 참여하기</IamText>
            </DisplayDiv>
          </PotalButton>
        </ButtonWrap>
      </InWrap>
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
