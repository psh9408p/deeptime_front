import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Button_refresh,
  Button_info,
  Button_delete,
  Button_out,
  Button_attend,
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
import RowBarChart_group from '../../../../Components/Charts/RowBarChart_group';
import FatText from '../../../../Components/FatText';
import { FixedSizeList as AttendanceList } from 'react-window';
import CheckBox from '../../../../Components/CheckBox';
import moment from 'moment';

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
    height: 200px;
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
    width: 430px !important;
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

const PopupCustom3 = styled(PopupCustom)`
  &-content {
    width: 500px !important;
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

const InfoDiv = styled.div``;
const GroupInfoWrap = styled.div`
  margin-top: 20px;
  width: 400px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: rgb(238, 238, 239);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 8px;
  margin: 0 auto;
  margin-bottom: 8px;
`;

const GroupInfo = styled.div`
  display: flex;
  width: 300px;
`;

const GroupIntro = styled.div`
  width: 400px;
  margin-top: 30px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: rgb(238, 238, 239);
  margin: 0 auto;
  margin-bottom: 12px;
  max-height: 300px;
  overflow: auto;
`;

const GroupIntroTitle = styled.div`
  font-weight: 600;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-top: 8px;
  padding-left: 8px;
`;
const GroupIntroArea = styled.div`
  padding: 8px 8px;
`;

const PBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 5px;
`;

const PSubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
`;

const AttendanceTitle = styled.div`
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 442px;
  height: 25px;
  color: white;
  background-color: ${(props) => props.theme.classicBlue};
  border-top-right-radius: ${(props) => props.theme.borderRadius};
  border-top-left-radius: ${(props) => props.theme.borderRadius};
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IndiviList = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 100%;
  background-color: ${(props) => (props.isOdd ? '#FAFAFA' : '#c7c7c7')};
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 45px;
  :not(:last-child) {
    border-right: 2px solid #e6e6e6;
    border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
  }
`;

const FirstTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100px;
  padding-left: 10px;
  :not(:last-child) {
    border-right: 2px solid white;
  }
`;

const DayTitle = styled(FirstTitle)`
  justify-content: center;
  width: 45px;
  padding: 0;
`;

const DatePickButton2 = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicGray};
  font-weight: 600;
  color: black;
  text-align: center;
  padding: 7px 10px;
  font-size: 12px;
  width: 150px;
  cursor: pointer;
`;

let firstTime = 0;
let averageTime = 0;
let existTime_Array = [];
let selfIndex = -1;
let myTime = 0;
const dayArray = ['일', '월', '화', '수', '목', '금', '토'];
let attend_member = [];
let attend_Array = [];

export default ({
  selectDate,
  setSelectDate,
  DateTabs,
  close,
  isSearch,
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
  attendDate,
  setAttendDate,
  setSelectFile,
}) => {
  // 리랜더
  const [renderBool, setRenderBool] = useState(false);

  // 날짜 관련
  const {
    real_weekStart: attendRS,
    real_weekEnd: attendRE,
    weekEnd: attendE,
  } = WeekRange(attendDate);
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

  const CustomInput2 = forwardRef(({ onClick, text }, ref) => {
    return (
      <DatePickButton2 ref={ref} onClick={onClick}>
        {text}
      </DatePickButton2>
    );
  });

  const attend_calculate = () => {
    attend_member = [];
    attend_Array = []; // 출석여부 넣기
    for (let k = 0; k < groupData.member.length; k++) {
      const nowMember = groupData.member[k];
      let default_attend = new Array(7).fill(false);
      // 선택할 날짜 일요일부터 일주일 출석 점검
      for (let j = 0; j < 7; j++) {
        const baseDate = new Date(attendRS);
        baseDate.setDate(attendRS.getDate() + j);
        const indexOfTime = nowMember.times.findIndex(
          (i) =>
            new Date(i.createdAt).getFullYear() === baseDate.getFullYear() &&
            new Date(i.createdAt).getMonth() === baseDate.getMonth() &&
            new Date(i.createdAt).getDate() === baseDate.getDate(),
        );
        if (indexOfTime !== -1) {
          //해당 날짜 총 시간 시간으로 환산
          const timesHour = nowMember.times[indexOfTime].existTime / 3600;
          if (timesHour >= groupData.targetTime) {
            default_attend[j] = true;
          }
        }
      }
      attend_member.push(nowMember);
      attend_Array.push(default_attend);
    }
    setRenderBool(!renderBool);
  };

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

  useEffect(() => {
    attend_calculate();
  }, [attendDate, networkStatus]);

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

  const attendanceRow = ({ index, style }) => (
    <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
      <FirstTitle>{attend_member[index].username}</FirstTitle>
      {dayArray.map((day, index2) => (
        <CheckBoxWrap key={index2} isOdd={Boolean(index % 2)}>
          <CheckBox
            checked={attend_Array[index][index2]}
            onChange={() => {}}
            boxSize={'25px'}
            margin={'0'}
          />
        </CheckBoxWrap>
      ))}
    </IndiviList>
  );

  const AttendanceDiv = ({ close }) => {
    return (
      <PBody>
        <PopupClose
          onClick={() => {
            close();
          }}
        />
        <PTitle text={'출석부'} />
        <PSubTitle>(목표 시간 : {groupData.targetTime}시간)</PSubTitle>
        <div style={{ marginBottom: '10px' }}>
          <DatePicker
            dateFormat={'yyyy/MM/dd'}
            selected={attendDate}
            onChange={(date) => {
              setAttendDate(date);
            }}
            customInput={
              <CustomInput2
                text={`${moment(attendRS).format('MM.DD')}(일) ~
                                ${moment(attendE).format('MM.DD')}(토)`}
              />
            }
          />
        </div>
        <AttendanceTitle>
          <FirstTitle>그룹원</FirstTitle>
          {dayArray.map((day, index) => (
            <DayTitle key={index}>{day}</DayTitle>
          ))}
        </AttendanceTitle>
        <ListWrap>
          <AttendanceList
            height={300}
            itemCount={groupData.member.length}
            itemSize={30}
            width={440}
          >
            {attendanceRow}
          </AttendanceList>
        </ListWrap>
      </PBody>
    );
  };

  const InforDiv = ({ close }) => {
    return (
      <InfoDiv>
        <PopupClose
          onClick={() => {
            close();
          }}
        />
        <div style={{ height: '12px' }} />
        {groupData.imManager && (
          <Button_custom
            width={'400px'}
            height={'32px'}
            text={'그룹 정보 수정'}
            bgColor={'#DB4437'}
            margin={'0 auto 8px auto'}
            onClick={() => {
              close();
              groupPush();
              setViewTabs(1);
            }}
          />
        )}
        <GroupInfoWrap>
          <div>
            <GroupInfo>
              <div>
                <span style={{ fontWeight: '600' }}>수용인원</span>
                <span>
                  {' '}
                  : {groupData.memberCount} / {groupData.maxMember}
                </span>
              </div>
            </GroupInfo>
            <GroupInfo>
              <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>카테고리</span>
                <span> : {groupData.category}</span>
              </div>
            </GroupInfo>
            <GroupInfo>
              <div>
                <span style={{ fontWeight: '600' }}>목표 시간</span>
                <span> : {groupData.targetTime} 시간</span>
              </div>
            </GroupInfo>
            <GroupInfo>
              <div>
                <span style={{ fontWeight: '600' }}>평균 학습 시간</span>
                <span> : {groupData.lastStudyTime.toFixed(0)} 시간</span>
              </div>
            </GroupInfo>
            <GroupInfo>
              <div>
                <span style={{ fontWeight: '600' }}>평균 출석률</span>
                <span> : {groupData.lastAttendance.toFixed(0)} %</span>
              </div>
            </GroupInfo>
          </div>
        </GroupInfoWrap>
        <GroupIntro>
          <GroupIntroTitle>그룹소개</GroupIntroTitle>
          <GroupIntroArea>{groupData.bio}</GroupIntroArea>
        </GroupIntro>
      </InfoDiv>
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
                <PopupCustom3
                  trigger={<Button_attend />}
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => <AttendanceDiv close={close} />}
                </PopupCustom3>
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
            {DateTabs.currentIndex === 0 && (
              <RowBarChart_group
                data_1={
                  isSearch
                    ? [firstTime / 60, averageTime / 60]
                    : [firstTime / 60, myTime / 60, averageTime / 60]
                }
                data_2={new Array(isSearch ? 2 : 3).fill(
                  groupData.targetTime * 60,
                )}
                dateRange={'today'}
                isSearch={isSearch}
              />
            )}
            {DateTabs.currentIndex !== 0 && (
              <RowBarChart_group
                data_1={
                  isSearch
                    ? [firstTime / 3600, averageTime / 3600]
                    : [firstTime / 3600, myTime / 3600, averageTime / 3600]
                }
                // data_2={new Array(3).fill(groupData.targetTime)}
                dateRange={'other'}
                isSearch={isSearch}
              />
            )}
          </ContentRow>
          {/* <ChartWrap>
            <GroupChart
              averageTime={groupData.targetTime}
              myTime={myTime}
              targetTime={groupData.targetTime}
            />
          </ChartWrap> */}
          <ContentRow>
            {groupData.member.map((member, index) => {
              // 그룹 서치에서 통계를 위한 임시 myData있으면 아바타에서는 제거(화면에 표현X)
              if (member.id !== 'tmpData') {
                return <Avatars key={index} member={member} />;
              }
            })}
          </ContentRow>
          {isSearch && <PopupClose onClick={() => close()} />}
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
          imgUrl={groupData.imgUrl}
          name={name}
          onSubmit={onEditGroup}
          groupClear={groupClear}
          loading={updateLoad}
          setSelectFile={setSelectFile}
        />
      )}
    </Wrapper>
  );
};
