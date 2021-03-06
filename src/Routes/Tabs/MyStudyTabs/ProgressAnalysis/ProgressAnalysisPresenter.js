import React, { useState } from 'react';
import styled from 'styled-components';
import { TopArrow, BotArrow } from '../../../../Components/Icons';
import Popover from './Popover';
import PopButton_custom from '../../../../Components/Buttons/PopButton_custom';
import Popup from 'reactjs-popup';
import ChartCall from './ChartCall';
import WeekRange from '../../../../Components/Date/WeekRange';
import SumArray from '../../../../Components/Array/SumArray';

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 50px;
  padding: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  /* position: fixed !important; */
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
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
  margin: 1em 1em;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  max-width: 150px;
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

const ClearDay = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-right: 20px;
  margin-top: 20px;
`;

const AddBtn = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 7px 10px;
  font-size: 12px;
  cursor: pointer;
  width: 90px;
  height: auto;
  margin: 0 10px 0 10px;
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

  const nowDate = new Date();
  const calRemainDay = (userbook) => {
    const { real_weekEnd: target_weekEnd } = WeekRange(
      new Date(userbook.startDate_target),
    ); // ?????? ????????? ?????? ?????????
    const { real_weekStart } = WeekRange(nowDate);
    // ????????? ?????? ?????? ?????? ??????????????? ??? ???????????? ??????????????? ?????? ????????? ?????????????????? 0 ??????
    if (nowDate < target_weekEnd) {
      return 0;
    }
    const records = userbook.clearRecords;
    const preRecords = records.filter(
      (record) => new Date(record.clearDate) < real_weekStart,
    );
    //????????? ?????? ????????? ?????????
    const clearPage = SumArray(preRecords.map((record) => record.totalPage));
    // ?????? ????????? ?????? ????????? ?????? ?????????
    const startDate = new Date(userbook.startDate_target);
    startDate.setHours(0, 0, 0, 0);
    const targetDay =
      (real_weekStart.getTime() - startDate.getTime()) / 86400000;
    const tartgetPage = targetDay * userbook.pageOfDay; //????????? ?????? ?????????
    const delayDay = Math.ceil((tartgetPage - clearPage) / userbook.pageOfDay);
    return delayDay;
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <HeaderDiv>
        <AddBtn
          onClick={() => {
            setViewForm('search');
          }}
        >
          ??? ??????
        </AddBtn>
        <AddBtn>??? ???</AddBtn>
      </HeaderDiv>
      {userbooks.map((userbook, index) => {
        const { real_weekEnd } = WeekRange(new Date(userbook.endDate_target)); // ?????? ????????? ????????? ?????? ??????
        const delayDay = calRemainDay(userbook);
        return (
          <Container key={index}>
            <ProgressWrap>
              <div style={{ marginRight: '20px' }}>
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
                      <span style={{ marginRight: '5px' }}>????????????</span>
                      {More ? <BotArrow /> : <TopArrow />}
                    </MoreBtn>
                    <MoreDiv More={More}>
                      <div style={{ marginBottom: '10px' }}>- ????????????</div>
                      <div>- ???????????????</div>
                    </MoreDiv>
                  </div>
                  <PopupCustom
                    trigger={
                      <PopButton_custom
                        width={'100px'}
                        height={'35px'}
                        margin={'0 20px 20px auto'}
                        text={'?????? ??????'}
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
                <ChartCall userbook={userbook} />
                <div>
                  <ClearDay>Clear Day</ClearDay>
                  {nowDate >= real_weekEnd ? (
                    <ClearDay>(?????? ??? ??????)</ClearDay>
                  ) : (
                    <ClearDay>
                      ({delayDay > 0 && '+'}
                      {delayDay})
                    </ClearDay>
                  )}
                </div>
              </div>
            </ProgressWrap>
          </Container>
        );
      })}
    </div>
  );
};
