import React, { useEffect, useRef, forwardRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ME } from './MyStaQueries';
import styled, { keyframes } from 'styled-components';
import Select from '../../../../Components/Select';
import Loader from '../../../../Components/Loader';
import Avatar from '../../../../Components/Avatar';
import { Clock24 } from '../../../../Components/Image';
import AreaChart from '../../../../Components/Charts/AreaChart';
import RowBarChart from '../../../../Components/Charts/RowBarChart';
import DonutChart from '../../../../Components/Charts/DonutChart';
import DonutChart_today from '../../../../Components/Charts/DonutChart_today';
import twoArraySum from '../../../../Components/twoArraySum';
import GaugeChart from 'react-gauge-chart';
import SumArray from '../../../../Components/Array/SumArray';
import SplitArray from '../../../../Components/Array/SplitArray';
import ReactTooltip from 'react-tooltip';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Input_100 from '../../../../Components/Input_100';
import WeekRange from '../../../../Components/Date/WeekRange';
import ObjectCopy from '../../../../Components/ObjectCopy';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 935px;
  margin-top: 20px;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  height: 100%;
  width: 100%;
`;

const BigBox = styled.div`
  background-color: white;
  &:first-child {
    border: ${(props) => props.theme.boxBorder};
    border-radius: ${(props) => props.theme.borderRadius};
    width: 70%;
    height: 1095px;
    position: relative;
  }
`;

const Title = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  padding: 10px 20px;
  width: 100%;
  height: 70px;
`;

const TitleGraph = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const TitleGraphWrap = styled.div`
  height: 100%;
  width: 80%;
`;

const ClassSelect = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  width: 100%;
  height: 30px;
`;

const StudentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  padding: 5px 5px;
  width: 100%;
  height: 895px;
`;

const ClassName = styled.div`
  display: flex;
  align-items: center;
  height: 50%;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.darkGreyColor};
  &:last-child {
    flex-direction: row-reverse;
    font-size: 20px;
    color: black;
  }
`;

const StudentList = styled.div`
  display: flex;
  align-items: center;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 50px;
  &:not(:first-child) {
    margin-top: 5px;
  }
`;

const SmallToggleRed = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: #ff7675;
  height: 10px;
  width: 40px;
  margin: 5px 5px;
`;

const SmallToggleBlue = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: #7ba9eb;
  height: 10px;
  width: 40px;
  margin: 5px 5px;
`;

const ToggleRed = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: #ff7675;
  height: 40px;
  width: 10px;
  margin: 5px 5px;
`;

const ToggleBlue = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: #7ba9eb;
  height: 40px;
  width: 10px;
  margin: 5px 5px;
`;

const AvatarWrap = styled.div`
  margin-left: 5px;
  height: 40px;
`;

const StudentName = styled.div`
  width: 90px;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  margin-left: 10px;
`;

const ListColumn = styled.div`
  border: 0;
  border-radius: 15px;
  margin-left: 10px;
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.darkGreyColor};
  font-weight: 600;
  background-color: ${(props) => props.theme.bgColor};
`;

const LightBio = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StatisRow = styled.div`
  width: 634.5px;
  margin: 10px 10px 0px 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:first-child {
    height: 50px;
  }
  &:nth-child(2) {
    height: 50px;
  }
  &:nth-child(3) {
    height: 310px;
  }
  &:nth-child(4) {
    height: 310px;
  }
  &:last-child {
    height: 310px;
    margin-bottom: 10px;
  }
`;

const ChartWrap = styled.div`
  width: 570px;
  height: 280px;
`;

const DonutChartValue = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  padding-top: 173px;
`;

const ClockBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  padding-top: 72px;
  padding-right: 3px;
  justify-content: center;
  align-items: center;
`;

const ClassButton = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`;

const ClassButton_Blue = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  background-color: ${(props) => props.theme.skyBlue};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`;

const GaugeChart_2 = styled(GaugeChart)`
  font-weight: 600;
`;

const TitleGraphText = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  padding: 30px 0px 0px 20px;
`;
const TitleGraphText_2 = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  padding: 50px 0px 0px 20px;
`;

const DatePickButton = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
`;

const StudentTooltip = styled.span`
  line-height: 1.5;
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
  justify-content: flex-end;
  align-items: center;
  span {
    font-weight: 600;
  }
`;

const RefreshInputWrap = styled.div`
  width: 70px;
  height: 30px;
`;

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const IngSpan = styled.span`
  animation: ${Animation} 1s linear infinite;
  color: red;
  width: 50px;
  font-weight: 600;
`;

let taskArray = [];
let taskArray_week = [];
let taskArray_month = [];
let taskArray_schedule = [];
let taskArray_schedule_week = [];
let taskArray_schedule_month = [];
let taskArray_scheduleT = [];
let taskArray_scheduleT_week = [];
let taskArray_scheduleT_month = [];
let schedule_label = [];
let scheduleList_selectDay = [];
let scheduleList_selectDay_week = [[], [], [], [], [], [], []];
let scheduleList_selectDay_month = [];
let donutData = [];
let donutData_1 = 0;
let donutData_2 = 0;
let donutPercent = 0;
let rgbBox = [];
let scheduleList_selectDay_length = 0;
// let scheduleList_selectDay_week_length = 0;
let scheduleList_selectDay_month_length = 0;

export default ({
  StaTabs,
  selectDate,
  setSelectDate,
  myInfoData,
  networkStatus,
  refreshTerm,
  oneDayHours,
  todayCalLoading,
  weekCalLoading,
  monthCalLoading,
}) => {
  const scheduleList = myInfoData.schedules;
  const { real_weekStart, real_weekEnd } = WeekRange(selectDate);
  const lastMonthDate = new Date(
    selectDate.getFullYear(),
    selectDate.getMonth() + 1,
    0,
  ).getDate();
  // daysOfMonth Area차트의 x축 라벨 변수
  const daysOfMonth_tmp = Array.from(Array(lastMonthDate).keys());
  const daysOfMonth_number = daysOfMonth_tmp.map((a) => a + 1);
  const daysOfMonth = daysOfMonth_number.map(String);

  const todaySchedule_calculate = () => {
    scheduleList_selectDay = [];
    for (let i = 0; i < scheduleList.length; i++) {
      const startYear = new Date(scheduleList[i].start).getFullYear();
      const startMonth = new Date(scheduleList[i].start).getMonth();
      const startDate = new Date(scheduleList[i].start).getDate();
      if (
        startYear === selectDate.getFullYear() &&
        startMonth === selectDate.getMonth() &&
        startDate === selectDate.getDate()
      ) {
        scheduleList_selectDay.push(scheduleList[i]);
      }
    }
    scheduleList_selectDay_length = scheduleList_selectDay.length;
  };
  const weekSchedule_calculate = () => {
    scheduleList_selectDay_week = [[], [], [], [], [], [], []];
    for (let i = 0; i < scheduleList.length; i++) {
      if (
        new Date(scheduleList[i].start) >= real_weekStart &&
        new Date(scheduleList[i].start) < real_weekEnd
      ) {
        const dayIndex = new Date(scheduleList[i].start).getDay();
        scheduleList_selectDay_week[dayIndex].push(scheduleList[i]);
      }
    }
    // let schedule_length = 0;
    // for (let i = 0; i < 7; i++) {
    //   schedule_length = schedule_length + scheduleList_selectDay_week[i].length;
    // }
    // scheduleList_selectDay_week_length = schedule_length;
  };
  const monthSchedule_calculate = () => {
    scheduleList_selectDay_month = [];
    for (let i = 0; i < scheduleList.length; i++) {
      const startYear = new Date(scheduleList[i].start).getFullYear();
      const startMonth = new Date(scheduleList[i].start).getMonth();
      if (
        startYear === selectDate.getFullYear() &&
        startMonth === selectDate.getMonth()
      ) {
        scheduleList_selectDay_month.push(scheduleList[i]);
      }
    }
    scheduleList_selectDay_month_length = scheduleList_selectDay_month.length;
  };

  const todayGraph_calculate = () => {
    // 초기화
    taskArray = new Array(24).fill(0);
    donutData = [];
    donutData_1 = 0;
    donutData_2 = 0;
    donutPercent = 0;
    rgbBox = [];
    // 오늘 생선된 시간이 있는 인덱스 구하기
    let indexOfToday = myInfoData.times.findIndex(
      (i) =>
        new Date(i.createdAt).getFullYear() == selectDate.getFullYear() &&
        new Date(i.createdAt).getMonth() == selectDate.getMonth() &&
        new Date(i.createdAt).getDate() == selectDate.getDate(),
    );
    // today Time 없을 경우 값이 0인 Time 추가해주기
    if (indexOfToday === -1) {
      myInfoData.times.push({
        existTime: 0,
        targetTime: 0,
        time_24: new Array(288).fill(0),
      });
      indexOfToday = myInfoData.times.length - 1;
    }
    const todayTime = myInfoData.times[indexOfToday];

    // AreaChart 계산
    const arrayBox = SplitArray(todayTime.time_24, 12);
    let resultArray = arrayBox.map((a) => SumArray(a));
    taskArray = twoArraySum(taskArray, resultArray);
    // 스케줄 별 그래프 계산
    let resultArray_schedule = []; // exist 타임 용
    let resultArray_scheduleT = []; // 타겟타임용
    schedule_label = [];
    for (let j = 0; j < scheduleList_selectDay_length; j++) {
      // console.log(scheduleList_selectDay);
      const totalMin_start =
        new Date(scheduleList_selectDay[j].start).getHours() * 60 +
        new Date(scheduleList_selectDay[j].start).getMinutes();
      const totalMin_end =
        new Date(scheduleList_selectDay[j].end).getHours() * 60 +
        new Date(scheduleList_selectDay[j].end).getMinutes();
      const indexMin_start = totalMin_start / 5;
      const indexMin_end = totalMin_end / 5;
      const slicedTime = todayTime.time_24.slice(indexMin_start, indexMin_end);
      const duplIndex = schedule_label.indexOf(
        scheduleList_selectDay[j].subjectName,
      ); // 중복되는 과목 인덱스 체크
      if (duplIndex === -1) {
        schedule_label.push(scheduleList_selectDay[j].subjectName);
        resultArray_schedule.push(SumArray(slicedTime));
        resultArray_scheduleT.push(totalMin_end - totalMin_start);
      } else {
        resultArray_schedule[duplIndex] =
          resultArray_schedule[duplIndex] + SumArray(slicedTime);
        resultArray_scheduleT[duplIndex] =
          resultArray_scheduleT[duplIndex] + (totalMin_end - totalMin_start);
      }
    }
    taskArray_schedule = new Array(resultArray_schedule.length).fill(0);
    taskArray_scheduleT = new Array(resultArray_scheduleT.length).fill(0);
    taskArray_schedule = twoArraySum(taskArray_schedule, resultArray_schedule);
    taskArray_scheduleT = twoArraySum(
      taskArray_scheduleT,
      resultArray_scheduleT,
    );
    // AreaChart 계산
    taskArray.forEach(function (item, index) {
      taskArray[index] = item / 60;
    });
    // 스케줄 그래프 계산
    if (taskArray_schedule !== []) {
      taskArray_schedule.forEach(function (item, index) {
        taskArray_schedule[index] = item / 60;
      });
    }
    // 도넛차트 계산
    let slicedTimeBox = [];
    // console.log(todayTime.time_24);
    let slicedTimes = ObjectCopy(todayTime.time_24);
    while (true) {
      const index_tmp = slicedTimes.findIndex((i) => i > 0);
      if (index_tmp === -1) {
        slicedTimeBox.push(slicedTimes);
        const nowDateMin_count = Math.ceil(
          (new Date().getHours() * 60 + new Date().getMinutes()) / 5,
        );
        if (nowDateMin_count === 288) {
          // 지금이 23시 55분 이상이라는 뜻
          rgbBox.push('rgba(233, 236, 244, 1)'); // 회색
          break; // 빈시간으로 끝남
        } else {
          const lastIndex = 288 - nowDateMin_count; // 아직 지나지 않은 시간이 몇칸인지 알려주는 변수
          const lastZeroTime = slicedTimeBox[slicedTimeBox.length - 1];
          if (lastZeroTime.length - lastIndex === 0) {
            // 현재 학습중이므로 지금 뒤에 시간은 다 이전시간으로 처리
            rgbBox.push('rgba(15,76,130, 1)'); // 클래식 블루 지금 이전 시간
            break; // 현재 이전시간으로 끝남
          } else {
            const grayTime = lastZeroTime.slice(
              0,
              lastZeroTime.length - lastIndex,
            );
            const blueTime = lastZeroTime.slice(
              lastZeroTime.length - lastIndex,
            );
            slicedTimeBox[slicedTimeBox.length - 1] = grayTime;
            slicedTimeBox.push(blueTime);
            rgbBox.push('rgba(233, 236, 244, 1)'); // 회색
            rgbBox.push('rgba(15,76,130, 1)'); // 클래식 블루 지금 이전 시간
            break; // 현재 이전시간으로 끝남
          }
        }
      } else {
        if (index_tmp !== 0) {
          // 0인 시간이 하나라도 있어야 빈시간을 넣지
          slicedTimeBox.push(slicedTimes.slice(0, index_tmp));
          rgbBox.push('rgba(233, 236, 244, 1)'); // 회색
          slicedTimes = slicedTimes.slice(index_tmp);
        }
        const index_tmp2 = slicedTimes.findIndex((i) => i == 0);
        if (index_tmp2 === -1) {
          slicedTimeBox.push(slicedTimes);
          rgbBox.push('rgba(123, 169, 235, 1)'); // 파란색 학습시간
          break; // 학습시간으로 끝남
        } else {
          const studyTime = slicedTimes.slice(0, index_tmp2);
          slicedTimeBox.push(studyTime);
          rgbBox.push('rgba(123, 169, 235, 1)'); // 파란색 학습시간
          slicedTimes = slicedTimes.slice(index_tmp2);
        }
      }
    }
    donutData = slicedTimeBox.map((a) => a.length * 5);
    console.log(todayTime.existTime, todayTime.targetTime);
    donutPercent = ((todayTime.existTime / todayTime.targetTime) * 100).toFixed(
      1,
    );
    if (todayTime.targetTime === 0) {
      donutPercent = 0;
    }
  };
  const weekGraph_calculate = () => {
    // 초기화
    taskArray_week = new Array(7).fill(0);
    donutData_1 = 0;
    donutData_2 = 0;
    donutPercent = 0;
    // 이번주에 생선된 시간이 있는 인덱스 구하기
    let indexOfWeek = [];
    let stackIndex = 0; // 원래 인덱스에서 잘려나간 부분을 추가해주는 변수
    let slicedTimes = ObjectCopy(myInfoData.times);
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
    let arrayBox = new Array(7).fill(null).map(() => {
      return { existTime: 0, targetTime: 0, time_24: new Array(288).fill(0) };
    });
    if (indexOfWeek[0] !== undefined) {
      for (let k = 0; k < indexOfWeek.length; k++) {
        const dayIndex = new Date(
          myInfoData.times[indexOfWeek[k]].createdAt,
        ).getDay();
        arrayBox[dayIndex].time_24 = myInfoData.times[indexOfWeek[k]].time_24;
        arrayBox[dayIndex].existTime =
          myInfoData.times[indexOfWeek[k]].existTime;
        arrayBox[dayIndex].targetTime =
          myInfoData.times[indexOfWeek[k]].targetTime;
      }
    }

    // AreaChart 계산
    let resultArray = arrayBox.map((a) => SumArray(a.time_24));
    taskArray_week = twoArraySum(taskArray_week, resultArray);
    // 스케줄 별 그래프 계산
    let resultArray_schedule = []; // exist 타임 용
    let resultArray_scheduleT = []; // 타겟타임용
    schedule_label = [];
    for (let k = 0; k < 7; k++) {
      const todayTime_24 = arrayBox[k].time_24;
      for (let j = 0; j < scheduleList_selectDay_week[k].length; j++) {
        // console.log(scheduleList_selectDay);
        const totalMin_start =
          new Date(scheduleList_selectDay_week[k][j].start).getHours() * 60 +
          new Date(scheduleList_selectDay_week[k][j].start).getMinutes();
        const totalMin_end =
          new Date(scheduleList_selectDay_week[k][j].end).getHours() * 60 +
          new Date(scheduleList_selectDay_week[k][j].end).getMinutes();
        const indexMin_start = totalMin_start / 5;
        const indexMin_end = totalMin_end / 5;
        const slicedTime = todayTime_24.slice(indexMin_start, indexMin_end);
        const duplIndex = schedule_label.indexOf(
          scheduleList_selectDay_week[k][j].subjectName,
        ); // 중복되는 과목 인덱스 체크
        if (duplIndex === -1) {
          schedule_label.push(scheduleList_selectDay_week[k][j].subjectName);
          resultArray_schedule.push(SumArray(slicedTime));
          resultArray_scheduleT.push(totalMin_end - totalMin_start);
        } else {
          resultArray_schedule[duplIndex] =
            resultArray_schedule[duplIndex] + SumArray(slicedTime);
          resultArray_scheduleT[duplIndex] =
            resultArray_scheduleT[duplIndex] + (totalMin_end - totalMin_start);
        }
      }
    }
    taskArray_schedule_week = new Array(resultArray_schedule.length).fill(0);
    taskArray_scheduleT_week = new Array(resultArray_scheduleT.length).fill(0);
    taskArray_schedule_week = twoArraySum(
      taskArray_schedule_week,
      resultArray_schedule,
    );
    taskArray_scheduleT_week = twoArraySum(
      taskArray_scheduleT_week,
      resultArray_scheduleT,
    );
    // AreaChart 계산
    taskArray_week.forEach(function (item, index) {
      taskArray_week[index] = item / 60;
    });
    // 스케줄 그래프 계산
    if (taskArray_schedule_week !== []) {
      taskArray_schedule_week.forEach(function (item, index) {
        taskArray_schedule_week[index] = item / 60;
      });
    }
    // 도넛차트 계산
    let existTime_tmp = 0;
    let targetTime_tmp = 0;
    for (let j = 0; j < 7; j++) {
      existTime_tmp = existTime_tmp + arrayBox[j].existTime;
      targetTime_tmp = targetTime_tmp + arrayBox[j].targetTime;
    }
    donutData_1 = existTime_tmp;
    donutData_2 = targetTime_tmp - existTime_tmp;
    donutPercent = ((existTime_tmp / targetTime_tmp) * 100).toFixed(1);
    if (targetTime_tmp === 0) {
      donutData_2 = 1;
      donutPercent = 0;
    }
  };
  const monthGraph_calculate = () => {
    // 초기화
    taskArray_month = new Array(lastMonthDate).fill(0);
    donutData_1 = 0;
    donutData_2 = 0;
    donutPercent = 0;
    // 이번달에 생선된 시간이 있는 인덱스 구하기
    let indexOfMonth = [];
    let stackIndex = 0; // 원래 인덱스에서 잘려나간 부분을 추가해주는 변수
    let slicedTimes = ObjectCopy(myInfoData.times);
    while (true) {
      const index_tmp = slicedTimes.findIndex(
        (i) =>
          new Date(i.createdAt).getFullYear() == selectDate.getFullYear() &&
          new Date(i.createdAt).getMonth() == selectDate.getMonth(),
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
    let arrayBox = new Array(lastMonthDate).fill(null).map(() => {
      return { existTime: 0, targetTime: 0, time_24: new Array(288).fill(0) };
    });
    if (indexOfMonth[0] !== undefined) {
      for (let k = 0; k < indexOfMonth.length; k++) {
        const dateIndex =
          new Date(myInfoData.times[indexOfMonth[k]].createdAt).getDate() - 1;
        arrayBox[dateIndex] = myInfoData.times[indexOfMonth[k]];
      }
    }

    // AreaChart 계산
    let resultArray = arrayBox.map((a) => SumArray(a.time_24));
    taskArray_month = twoArraySum(taskArray_month, resultArray);
    // 스케줄 별 그래프 계산
    let resultArray_schedule = []; // exist 타임 용
    let resultArray_scheduleT = []; // 타겟타임용
    schedule_label = [];
    for (let j = 0; j < scheduleList_selectDay_month_length; j++) {
      const dateIndex =
        new Date(scheduleList_selectDay_month[j].start).getDate() - 1;
      const todayTime_24 = arrayBox[dateIndex].time_24;
      const totalMin_start =
        new Date(scheduleList_selectDay_month[j].start).getHours() * 60 +
        new Date(scheduleList_selectDay_month[j].start).getMinutes();
      const totalMin_end =
        new Date(scheduleList_selectDay_month[j].end).getHours() * 60 +
        new Date(scheduleList_selectDay_month[j].end).getMinutes();
      const indexMin_start = totalMin_start / 5;
      const indexMin_end = totalMin_end / 5;
      const slicedTime = todayTime_24.slice(indexMin_start, indexMin_end);
      const duplIndex = schedule_label.indexOf(
        scheduleList_selectDay_month[j].subjectName,
      ); // 중복되는 과목 인덱스 체크
      if (duplIndex === -1) {
        schedule_label.push(scheduleList_selectDay_month[j].subjectName);
        resultArray_schedule.push(SumArray(slicedTime));
        resultArray_scheduleT.push(totalMin_end - totalMin_start);
      } else {
        resultArray_schedule[duplIndex] =
          resultArray_schedule[duplIndex] + SumArray(slicedTime);
        resultArray_scheduleT[duplIndex] =
          resultArray_scheduleT[duplIndex] + (totalMin_end - totalMin_start);
      }
    }
    taskArray_schedule_month = new Array(resultArray_schedule.length).fill(0);
    taskArray_scheduleT_month = new Array(resultArray_scheduleT.length).fill(0);
    taskArray_schedule_month = twoArraySum(
      taskArray_schedule_month,
      resultArray_schedule,
    );
    taskArray_scheduleT_month = twoArraySum(
      taskArray_scheduleT_month,
      resultArray_scheduleT,
    );
    // AreaChart 계산
    taskArray_month.forEach(function (item, index) {
      taskArray_month[index] = item / 60;
    });
    // 스케줄 그래프 계산
    if (taskArray_schedule_month !== []) {
      taskArray_schedule_month.forEach(function (item, index) {
        taskArray_schedule_month[index] = item / 60;
      });
    }
    // 도넛차트 계산
    let existTime_tmp = 0;
    let targetTime_tmp = 0;
    for (let j = 0; j < lastMonthDate; j++) {
      existTime_tmp = existTime_tmp + arrayBox[j].existTime;
      targetTime_tmp = targetTime_tmp + arrayBox[j].targetTime;
    }
    donutData_1 = existTime_tmp;
    donutData_2 = targetTime_tmp - existTime_tmp;
    donutPercent = ((existTime_tmp / targetTime_tmp) * 100).toFixed(1);
    if (targetTime_tmp === 0) {
      donutData_2 = 1;
      donutPercent = 0;
    }
  };

  if (7 === networkStatus) {
    if (StaTabs.currentIndex === 0) {
      todaySchedule_calculate();
      todayGraph_calculate();
      todayCalLoading.current = false;
    } else if (StaTabs.currentIndex === 1) {
      weekSchedule_calculate();
      weekGraph_calculate();
      weekCalLoading.current = false;
    } else {
      monthSchedule_calculate();
      monthGraph_calculate();
      monthCalLoading = false;
    }
  }

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <DatePickButton ref={ref} onClick={onClick}>
        {value} (Click)
      </DatePickButton>
    );
  });

  return (
    <Wrapper>
      <BigBox>
        <StatisRow>
          <DatePickDiv>
            <DatePicker
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
              customInput={<CustomInput />}
            />
          </DatePickDiv>
          <RefreshDiv>
            <span>자동 새로고침:&nbsp;</span>
            <RefreshInputWrap>
              <Input_100 placeholder={''} {...refreshTerm} type={'number'} />
            </RefreshInputWrap>
            <span>(Sec)&nbsp;</span>
            {networkStatus === 7 && <IngSpan></IngSpan>}
            {networkStatus === 6 && <IngSpan>ing...</IngSpan>}
          </RefreshDiv>
        </StatisRow>
        <StatisRow>
          {StaTabs.content.map((section, index) => {
            if (index === StaTabs.currentIndex) {
              return (
                <ClassButton_Blue
                  key={index}
                  onClick={() => StaTabs.changeItem(index)}
                >
                  {section}
                </ClassButton_Blue>
              );
            } else {
              return (
                <ClassButton
                  key={index}
                  onClick={() => StaTabs.changeItem(index)}
                >
                  {section}
                </ClassButton>
              );
            }
          })}
        </StatisRow>
        {StaTabs.currentIndex === 0 && (
          <>
            <StatisRow>
              <ChartWrap>
                <RowBarChart
                  data_1={taskArray_schedule}
                  data_2={taskArray_scheduleT}
                  labels={schedule_label}
                  label_1={'학습'}
                  label_2={'목표'}
                  title={'과목별 학습 시간'}
                  title_x={'시간(분)'}
                />
              </ChartWrap>
              {todayCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <AreaChart
                  data_1={taskArray}
                  labels={oneDayHours}
                  title={'시간별 학습 시간'}
                  title_y={'학습 시간(분)'}
                />
              </ChartWrap>
              {todayCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <DonutChart_today
                  data={donutData}
                  color={rgbBox}
                  title={'학습 로그'}
                  labels={['학습', '학습 외', '나머지', '현재 시간']}
                />
              </ChartWrap>
              <DonutChartValue>{donutPercent}%</DonutChartValue>
              <ClockBox>
                <Clock24 />
              </ClockBox>
              {todayCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
          </>
        )}
        {StaTabs.currentIndex === 1 && (
          <>
            <StatisRow>
              <ChartWrap>
                <RowBarChart
                  data_1={taskArray_schedule_week}
                  data_2={taskArray_scheduleT_week}
                  labels={schedule_label}
                  label_1={'학습'}
                  label_2={'목표'}
                  title={'과목별 학습 시간'}
                  title_x={'시간(분)'}
                />
              </ChartWrap>
              {weekCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <AreaChart
                  data_1={taskArray_week}
                  labels={['일', '월', '화', '수', '목', '금', '토']}
                  title={'요일별 학습 시간'}
                  title_y={'시간(분)'}
                />
              </ChartWrap>
              {weekCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <DonutChart
                  data_1={donutData_1}
                  data_2={donutData_2}
                  title={'학습 성취도'}
                  labels={['학습', '목표']}
                />
              </ChartWrap>
              <DonutChartValue>{donutPercent}%</DonutChartValue>
              {weekCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
          </>
        )}
        {StaTabs.currentIndex === 2 && (
          <>
            <StatisRow>
              <ChartWrap>
                <RowBarChart
                  data_1={taskArray_schedule_month}
                  data_2={taskArray_scheduleT_month}
                  labels={schedule_label}
                  label_1={'학습'}
                  label_2={'목표'}
                  title={'과목별 학습 시간'}
                  title_x={'시간(분)'}
                />
              </ChartWrap>
              {monthCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <AreaChart
                  data_1={taskArray_month}
                  labels={daysOfMonth}
                  title={'일별 학습 시간'}
                  title_y={'시간(분)'}
                />
              </ChartWrap>
              {monthCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <DonutChart
                  data_1={donutData_1}
                  data_2={donutData_2}
                  title={'학습 성취도'}
                  labels={['학습', '목표']}
                />
              </ChartWrap>
              <DonutChartValue>{donutPercent}%</DonutChartValue>
              {monthCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
          </>
        )}
      </BigBox>
    </Wrapper>
  );
};
