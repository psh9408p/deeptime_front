import React, { useState } from 'react';
import styled from 'styled-components';
import { Add, TopArrow, BotArrow } from '../../../../Components/Icons';
import StackChart from '../../../../Components/Charts/StackChart';
import Popover from './Popover';
import PopButton_custom from '../../../../Components/Buttons/PopButton_custom';
import Popup from 'reactjs-popup';

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
  background-image: url(${(props) => props.image});
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

const MoreBtn = styled.span`
  cursor: pointer;
  margin-bottom: 5px;
`;

const MoreDiv = styled.div`
  display: ${(props) => (props.More ? 'block' : 'none')};
  margin-top: 5px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 300px !important;
    /* height: 240px !important; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

export default ({
  userbooks,
  startPage,
  endPage,
  finishDate,
  setFinishDate,
  onCreateRecord,
  setViewForm,
}) => {
  const [More, setMore] = useState(false);

  const moreHandler = () => {
    setMore(!More);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <HeaderDiv>
        <Add
          onClick={() => {
            setViewForm('search');
          }}
        />
      </HeaderDiv>
      {userbooks.map((userbook, index) => (
        <Container key={index}>
          <ProgressWrap>
            <div>
              <div>
                <Title>{userbook.title}</Title>
              </div>
              <Image image={userbook.image} />
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex' }}>
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
                <PopupCustom
                  trigger={
                    <PopButton_custom
                      width={'100px'}
                      height={'35px'}
                      margin={'0 20px 20px auto'}
                      text={'진도 입력'}
                      bgColor={'#0F4C82'}
                      color={'white'}
                    />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <Popover
                      close={close}
                      startPage={startPage}
                      endPage={endPage}
                      finishDate={finishDate}
                      setFinishDate={setFinishDate}
                      onCreateRecord={onCreateRecord}
                      userbook={userbook}
                    />
                  )}
                </PopupCustom>
              </div>
              <StackChart />
              <div style={{ marginTop: '20px' }}>Clear Day</div>
            </div>
          </ProgressWrap>
        </Container>
      ))}
    </div>
  );
};
