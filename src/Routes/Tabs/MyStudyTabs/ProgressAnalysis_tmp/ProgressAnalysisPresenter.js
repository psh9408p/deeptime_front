import React, { useState } from 'react';
import styled from 'styled-components';
import { Add, TopArrow, BotArrow } from '../../../../Components/Icons';
import StackChart from '../../../../Components/Charts/StackChart';
import Popover from './Popover';
import Contents from './Contents';
const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 50px;
  padding: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  position: fixed !important;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;
const ProgressWrap = styled.div`
  display: flex;
  /* border: 1px solid black; */
  align-items: center;
  width: 600px;
  height: 300px;
  margin: 0 auto;
  box-shadow: 1px 2px 2px 4px #dee1e7;
  background-color: #fff;
`;

const Image = styled.div`
  /* background-image: url(${(props) => props.image}); */
  background-size: cover;
  width: 100px;
  position: relative;
  height: 120px;
  margin: 1em 1em;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
`;
const Title = styled.span`
  margin-top: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Btn = styled.button`
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 20px;
  height: auto;
  width: 100px;
  border-radius: 20px;
  text-align: center;
  justify-content: center;
  display: flex;
  background-color: #104881;
  border: none;
  color: white;
  padding: 15px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
`;
const MoreBtn = styled.span`
  cursor: pointer;
  margin-bottom: 5px;
`;

const MoreDiv = styled.div`
  display: ${(props) => (props.More ? 'block' : 'none')};
  margin-top: 5px;
`;

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const [More, setMore] = useState(false);

  const moreHandler = () => {
    setMore(!More);
  };

  const onSetIsVisible = (active) => {
    console.log('hihi');
    setIsVisible(active);
  };
  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <HeaderDiv>
          <Add />
        </HeaderDiv>
      </div>
      <div>
        <Container>
          <ProgressWrap>
            <div>
              <div>
                <Title>타이틀</Title>
              </div>
              <Image></Image>
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex' }}>
                {' '}
                <div
                  onClick={() => {
                    moreHandler();
                  }}
                >
                  <MoreBtn More={More}>
                    <span style={{ marginRight: '5px' }}>주간목표</span>
                    {More ? <BotArrow /> : <TopArrow />}
                  </MoreBtn>
                  <MoreDiv More={More}>
                    <div style={{ marginBottom: '10px' }}>- 삼각함수</div>
                    <div>- 함수의극한</div>
                  </MoreDiv>
                </div>
                <Btn
                  onClick={() => {
                    onSetIsVisible(true);
                  }}
                >
                  진도 입력
                  <Popover
                    isVisible={isVisible}
                    // onSetIsVisible={onSetIsVisible}
                  />
                </Btn>
              </div>
              <StackChart />
              <div style={{ marginTop: '20px' }}>Clear Day</div>
            </div>
          </ProgressWrap>
        </Container>
      </div>
      <Contents />
    </div>
  );
};
