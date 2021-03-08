import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Button_refresh,
  Button_info,
  Button_delete,
  Button_out,
} from '../../../../Components/Buttons/Button_click';
import Tab from '../../../../Components/Tab';
import PopupClose from '../../../../Components/Buttons/PopupClose';
import Avatar from '../../../../Components/Avatar';
import Loader from '../../../../Components/Loader';
import WeekRange from '../../../../Components/Date/WeekRange';
import ObjectCopy from '../../../../Components/ObjectCopy';
import HourMinCal from '../../../../Components/HourMinCal';
import Button_custom from '../../../../Components/Buttons/Button_custom';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import CUGroup from '../CUGroup';

import GroupChart from '../../../../Components/GroupChart';
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  height: 100%;
  width: 100%;
`;

const ContentRow = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  &:first-child {
    height: 60px;
  }
  &:nth-child(2) {
    height: 60px;
  }
  &:nth-child(3) {
    position: relative;
    flex-direction: column;
    height: 120px;
  }
  &:nth-child(4) {
    height: auto;
    display: grid;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    max-height: 530px;
    grid-gap: 0 30px;
    grid-template-columns: repeat(5, 90px);
    grid-template-rows: 130px;
    grid-auto-rows: 130px;
    margin: 0;
  }
`;

const ChartWrap = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  height: 100%;
`;

const DatePickDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RefreshDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const JoinDiv = styled(RefreshDiv)``;

const DatePickButton = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicGray};
  font-weight: 600;
  color: black;
  text-align: center;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
`;

const IndiWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 10px;
  span {
    font-size: 12px;
    color: ${(props) => props.theme.classicBlue};
    font-weight: bold;
    :first-child {
      text-align: center;
      margin-bottom: 3px;
    }
    :nth-child(3) {
      text-align: center;
      margin-top: 5px;
      color: black;
      font-weight: normal;
    }
    :nth-child(4) {
      text-align: center;
      margin-top: 5px;
      span {
        color: ${(props) => props.theme.classicBlue};
      }
    }
  }
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 650px !important;
    max-height: 820px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    width: auto !important;
    height: auto !important;
  }
`;

const PofileLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.inputGray};
  color: black;
  font-weight: 600;
  border: none;
  outline: none;
  :hover {
    filter: brightness(120%);
  }
`;

const TriggerCover = styled.div`
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-top: 12px;
`;

const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

let firstTime = 0;
let averageTime = 0;
let existTime_Array = [];
let selfIndex = -1;
let myTime = 0;

export default ({
  selectDate,
  setSelectDate,
  DateTabs,
  close,
  closeActive,
  groupData,
  groupRefetch,
  networkStatus,
  onJoin,
  onDelete,
  onOut,
  viewTabs,
  setViewTabs,
  maxMember,
  groupCategory,
  targetTime,
  password,
  bio,
  name,
  onEditGroup,
  groupClear,
  updateLoad,
  groupPush,
  onOutMember,
}) => {
  // 날짜 관련
  const { real_weekStart, real_weekEnd } = WeekRange(selectDate);
  const selectMonthDate = new Date(
    selectDate.getFullYear(),
    selectDate.getMonth() + 1,
    0,
  ).getDate();

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <DatePickButton ref={ref} onClick={onClick}>
        {value} (클릭)
      </DatePickButton>
    );
  });

  const todayTime_calculate = ({ times }) => {
    let indiTimes = times;
    // 오늘 생선된 시간이 있는 인덱스 구하기
    let indexOfToday = indiTimes.findIndex(
      (i) =>
        new Date(i.createdAt).getFullYear() === selectDate.getFullYear() &&
        new Date(i.createdAt).getMonth() === selectDate.getMonth() &&
        new Date(i.createdAt).getDate() === selectDate.getDate(),
    );
    // today Time 없을 경우 값이 0인 Time 추가해주기
    if (indexOfToday === -1) {
      indiTimes.push({
        existTime: 0,
        time_24: new Array(288).fill(0),
      });
      indexOfToday = indiTimes.length - 1;
    }
    return {
      today_existTime: indiTimes[indexOfToday].existTime,
    };
  };

  const weekTime_calculate = ({ times }) => {
    // 해당주에 생선된 시간이 있는 인덱스 구하기
    let indexOfWeek = [];
    let stackIndex = 0; // 원래 인덱스에서 잘려나간 부분을 추가해주는 변수
    let slicedTimes = ObjectCopy(times);
    while (true) {
      const index_tmp = slicedTimes.findIndex(
        (i) =>
          new Date(i.createdAt) >= real_weekStart &&
          new Date(i.createdAt) < real_weekEnd,
      );
      if (index_tmp === -1) {
        break;
      } else {
        indexOfWeek.push(index_tmp + stackIndex);
        if (index_tmp === slicedTimes.length - 1) {
          break;
        }
      }
      slicedTimes = slicedTimes.slice(index_tmp + 1);
      stackIndex = stackIndex + index_tmp + 1;
    }
    let arrayBox = new Array(7).fill(0);
    if (indexOfWeek[0] !== undefined) {
      for (let k = 0; k < indexOfWeek.length; k++) {
        const dayIndex = new Date(times[indexOfWeek[k]].createdAt).getDay();
        arrayBox[dayIndex] = times[indexOfWeek[k]].existTime;
      }
    }
    return {
      week_existTime: arrayBox,
    };
  };

  const monthTime_calculate = ({ times }) => {
    // 이번달에 생선된 시간이 있는 인덱스 구하기 & time 뽑기
    let indexOfMonth = [];
    let stackIndex = 0; // 원래 인덱스에서 잘려나간 부분을 추가해주는 변수
    let slicedTimes = ObjectCopy(times);
    while (true) {
      const index_tmp = slicedTimes.findIndex(
        (i) =>
          new Date(i.createdAt).getFullYear() === selectDate.getFullYear() &&
          new Date(i.createdAt).getMonth() === selectDate.getMonth(),
      );
      if (index_tmp === -1) {
        break;
      } else {
        indexOfMonth.push(index_tmp + stackIndex);
        if (index_tmp === slicedTimes.length - 1) {
          break;
        }
      }
      slicedTimes = slicedTimes.slice(index_tmp + 1);
      stackIndex = stackIndex + index_tmp + 1;
    }
    let arrayBox = new Array(selectMonthDate).fill(0);
    if (indexOfMonth[0] !== undefined) {
      for (let k = 0; k < indexOfMonth.length; k++) {
        const dateIndex =
          new Date(times[indexOfMonth[k]].createdAt).getDate() - 1;
        arrayBox[dateIndex] = times[indexOfMonth[k]].existTime;
      }
    }
    return {
      month_existTime: arrayBox,
    };
  };

  const statisticsCal = () => {
    // 1등 시간 계산
    firstTime = existTime_Array.reduce(function (a, b) {
      return Math.max(a, b);
    });
    // 평균 시간 계산
    const timeSum = existTime_Array.reduce((a, b) => a + b, 0);
    averageTime = timeSum / existTime_Array.length;
    // 나의 시간 있으면 추가
    const checkSelf = (a) => a.isSelf === true;
    selfIndex = groupData.member.findIndex(checkSelf);
    myTime = selfIndex === -1 ? 0 : existTime_Array[selfIndex];
  };

  // 맴버 개별 데이터 계산
  if (7 === networkStatus) {
    existTime_Array = []; // 시간모음 초기화
    for (let i = 0; i < groupData.member.length; i++) {
      // 학습 시간 초단위
      let total_existTime = 0;
      const nowMember = groupData.member[i];

      if (DateTabs.currentIndex === 0) {
        const { today_existTime } = todayTime_calculate({
          times: nowMember.times,
        });
        total_existTime = today_existTime;
      } else if (DateTabs.currentIndex === 1) {
        const { week_existTime } = weekTime_calculate({
          times: nowMember.times,
        });
        total_existTime = week_existTime.reduce((a, b) => a + b, 0);
      } else {
        const { month_existTime } = monthTime_calculate({
          times: nowMember.times,
        });
        total_existTime = month_existTime.reduce((a, b) => a + b, 0);
      }

      // 학습시간을 누적 배열 그리고 member 데이터에 추가
      existTime_Array.push(total_existTime);
      groupData.member[i].total_existTime = total_existTime;
      // 시간 단위 계산
      const { hourTime, minTime } = HourMinCal(total_existTime);
      groupData.member[i].total_hour = hourTime;
      groupData.member[i].total_min = minTime;
      // 매니저인지 판단
      groupData.member[i].isManager = groupData.manager.id === nowMember.id;

      if (i === groupData.member.length - 1) {
        statisticsCal(); //통계치 계산
        // 학습시간 많은 순서 정렬
        groupData.member.sort(function (a, b) {
          return b.total_existTime - a.total_existTime;
        });
      }
    }
  }

  const Avatars = ({ member }) => {
    return (
      <IndiWrap>
        <span>
          {member.total_hour.length === 1
            ? '0' + member.total_hour
            : member.total_hour}{' '}
          :{' '}
          {member.total_min.length === 1
            ? '0' + member.total_min
            : member.total_min}
        </span>
        <Avatar
          size="md"
          url={member.avatar}
          confirmSet={true}
          exist={member.existToggle}
        />
        <span>{member.username}</span>
        <PopupCustom2
          trigger={<TriggerCover />}
          closeOnDocumentClick={false}
          modal
        >
          {(close) => (
            <PopupBody>
              <PopupClose
                onClick={() => {
                  close();
                }}
              />
              <PofileLink target="_blank" to={'/' + member.username} replace>
                프로필 정보
              </PofileLink>
              {groupData.imManager && !member.isSelf && (
                <Button_custom
                  width={'150px'}
                  height={'30px'}
                  margin={'10px 0 0 0'}
                  text={'추방'}
                  onClick={() => {
                    onOutMember(groupData.id, member.id, close);
                  }}
                />
              )}
            </PopupBody>
          )}
        </PopupCustom2>
        {member.isManager && member.isSelf ? (
          <span style={{ color: '#DB4437' }}>
            방장<span>(ME)</span>
          </span>
        ) : member.isManager ? (
          <span style={{ color: '#DB4437' }}>방장</span>
        ) : (
          member.isSelf && <span>ME</span>
        )}
      </IndiWrap>
    );
  };

  const InforDiv = ({ close }) => {
    return (
      <div>
        <PopupClose
          onClick={() => {
            close();
          }}
        />
        <p>임시</p>
        {groupData.imManager && (
          <Button_custom
            width={'100px'}
            height={'32px'}
            text={'그룹 정보 수정'}
            onClick={() => {
              close();
              groupPush();
              setViewTabs(1);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <Wrapper>
      {viewTabs === 0 ? (
        <>
          <ContentRow>
            <DatePickDiv>
              <DatePicker
                dateFormat={'yyyy/MM/dd'}
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                customInput={<CustomInput />}
              />
            </DatePickDiv>
            {selfIndex !== -1 ? (
              <RefreshDiv>
                {/* <Button_capture
                onClick={() => {
                  onImgSave();
                }}
              /> */}
                <Button_refresh
                  onClick={() => {
                    groupRefetch();
                  }}
                />
                <PopupCustom
                  trigger={<Button_info />}
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => <InforDiv close={close} />}
                </PopupCustom>
                {groupData.imManager ? (
                  <Button_delete
                    onClick={() => {
                      onDelete(groupData.id);
                    }}
                  />
                ) : (
                  <Button_out
                    onClick={() => {
                      onOut(groupData.id);
                    }}
                  />
                )}
              </RefreshDiv>
            ) : (
              <JoinDiv>
                <Button_custom
                  width={'100px'}
                  height={'33px'}
                  bgColor={'#DB4437'}
                  text={'가입하기'}
                  onClick={() => {
                    onJoin(groupData.id);
                  }}
                />
              </JoinDiv>
            )}
          </ContentRow>
          <ContentRow>
            <Tab tabs={DateTabs} />
          </ContentRow>
          <ContentRow>
            <p>1등 시간: {firstTime}초</p>
            <p>평균 시간: {averageTime}초</p>
            <p>나의 시간: {myTime}초</p>
            <p>그룹 최소 학습 시간: {groupData.targetTime}시간</p>
          </ContentRow>
          <ChartWrap>
            <GroupChart
              averageTime={groupData.targetTime}
              myTime={myTime}
              targetTime={groupData.targetTime}
            />
          </ChartWrap>
          <ContentRow>
            {groupData.member.map((member, index) => (
              <Avatars key={index} member={member} />
            ))}
          </ContentRow>
          {closeActive && <PopupClose onClick={() => close()} />}
          {(networkStatus === 4 || networkStatus === 2) && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
        </>
      ) : (
        <CUGroup
          CU_check={'update'}
          setViewTabs={setViewTabs}
          maxMember={maxMember}
          groupCategory={groupCategory}
          targetTime={targetTime}
          password={password}
          bio={bio}
          name={name}
          onSubmit={onEditGroup}
          groupClear={groupClear}
          loading={updateLoad}
        />
      )}
    </Wrapper>
  );
};
