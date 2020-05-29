import React, { useEffect, useRef, forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Select from '../../../../Components/Select';
import Loader from '../../../../Components/Loader';
import Avatar from '../../../../Components/Avatar';
import AreaChart from '../../../../Components/Charts/AreaChart';
import RowBarChart from '../../../../Components/Charts/RowBarChart';
import DonutChart from '../../../../Components/Charts/DonutChart';
import twoArraySum from '../../../../Components/twoArraySum';
import GaugeChart from 'react-gauge-chart';
import SumArray from '../../../../Components/Array/SumArray';
import SplitArray from '../../../../Components/Array/SplitArray';
import ReactTooltip from 'react-tooltip';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Input_100 from '../../../../Components/Input_100';
import selectChange from '../../../../Components/SelectChange';
import WeekRange from '../../../../Components/Date/WeekRange';
import ObjectCopy from '../../../../Components/ObjectCopy';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 935px;
  margin-top: 20px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  &:last-child {
    background-color: ${(props) => props.theme.bgColor};
    width: 30%;
    height: 1095px;
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
let taskArray_scheduleT = [];
let schedule_label = [];
let scheduleList_selectDay = [];
let scheduleList_selectDay_week = [[], [], [], [], [], [], []];
let scheduleList_selectDay_month = [];
const tmpTime = {
  existTime: 0,
  targetTime: 0,
  time_24: new Array(288).fill(0),
};
const time_24_tmp = new Array(288).fill(0);
let donutData_1 = 0;
let donutData_2 = 0;
let donutPercent = 0;
let scheduleList_selectDay_length = 0;
// let scheduleList_selectDay_week_length = 0;
let scheduleList_selectDay_month_length = 0;

export default ({
  StaTabs,
  selectDate,
  setSelectDate,
  scheduleList,
  myInfoData,
  myInfoLoading,
  myInfoRefetch,
  networkStatus,
  refreshTerm,
  oneDayHours,
}) => {
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
    donutData_1 = 0;
    donutData_2 = 0;
    donutPercent = 0;
    if (networkStatus === 7 && myInfoData) {
      // 오늘 생선된 시간이 있는 인덱스 구하기
      let indexOfToday = myInfoData.times.findIndex(
        (i) =>
          new Date(i.createdAt).getFullYear() == selectDate.getFullYear() &&
          new Date(i.createdAt).getMonth() == selectDate.getMonth() &&
          new Date(i.createdAt).getDate() == selectDate.getDate(),
      );
      // today Time 없을 경우 값이 0인 Time 추가해주기
      if (indexOfToday === -1) {
        myInfoData.times.push(tmpTime);
        indexOfToday = myInfoData.times.length - 1;
      }
      const todayTime = myInfoData.times[indexOfToday];

      // AreaChart 계산
      const arrayBox = SplitArray(todayTime.time_24, 12);
      let resultArray = [];
      for (let j = 0; j < 24; j++) {
        resultArray.push(SumArray(arrayBox[j]));
      }
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
        const slicedTime = todayTime.time_24.slice(
          indexMin_start,
          indexMin_end,
        );
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
      taskArray_schedule = twoArraySum(
        taskArray_schedule,
        resultArray_schedule,
      );
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
      donutData_1 = todayTime.existTime;
      donutData_2 = todayTime.targetTime - todayTime.existTime;
      donutPercent = (
        (todayTime.existTime / todayTime.targetTime) *
        100
      ).toFixed(1);
      if (todayTime.targetTime === 0) {
        donutData_2 = 1;
        donutPercent = 0;
      }
    }
  };
  const weekGraph_calculate = () => {
    // 초기화
    taskArray_week = new Array(7).fill(0);
    donutData_1 = 0;
    donutData_2 = 0;
    donutPercent = 0;
    if (networkStatus === 7 && myInfoData) {
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
      let arrayBox = [
        time_24_tmp,
        time_24_tmp,
        time_24_tmp,
        time_24_tmp,
        time_24_tmp,
        time_24_tmp,
        time_24_tmp,
      ];
      let arrayBox_twoTimes = [
        // exis, target Time만 담기위해
        { existTime: 0, targetTime: 0 },
        { existTime: 0, targetTime: 0 },
        { existTime: 0, targetTime: 0 },
        { existTime: 0, targetTime: 0 },
        { existTime: 0, targetTime: 0 },
        { existTime: 0, targetTime: 0 },
        { existTime: 0, targetTime: 0 },
      ];
      if (indexOfWeek[0] !== undefined) {
        for (let k = 0; k < indexOfWeek.length; k++) {
          const dayIndex = new Date(
            myInfoData.times[indexOfWeek[k]].createdAt,
          ).getDay();
          arrayBox[dayIndex] = myInfoData.times[indexOfWeek[k]].time_24;
          arrayBox_twoTimes[dayIndex].existTime =
            myInfoData.times[indexOfWeek[k]].existTime;
          arrayBox_twoTimes[dayIndex].targetTime =
            myInfoData.times[indexOfWeek[k]].targetTime;
        }
      }

      // AreaChart 계산
      let resultArray = [];
      for (let j = 0; j < 7; j++) {
        resultArray.push(SumArray(arrayBox[j]));
      }
      taskArray_week = twoArraySum(taskArray_week, resultArray);
      // 스케줄 별 그래프 계산
      let resultArray_schedule = []; // exist 타임 용
      let resultArray_scheduleT = []; // 타겟타임용
      schedule_label = [];
      for (let k = 0; k < 7; k++) {
        const todayTime_24 = arrayBox[k];
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
              resultArray_scheduleT[duplIndex] +
              (totalMin_end - totalMin_start);
          }
        }
      }
      taskArray_schedule = new Array(resultArray_schedule.length).fill(0);
      taskArray_scheduleT = new Array(resultArray_scheduleT.length).fill(0);
      taskArray_schedule = twoArraySum(
        taskArray_schedule,
        resultArray_schedule,
      );
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
      let existTime_tmp = 0;
      let targetTime_tmp = 0;
      for (let j = 0; j < 7; j++) {
        existTime_tmp = existTime_tmp + arrayBox_twoTimes[j].existTime;
        targetTime_tmp = targetTime_tmp + arrayBox_twoTimes[j].targetTime;
      }
      donutData_1 = existTime_tmp;
      donutData_2 = targetTime_tmp - existTime_tmp;
      donutPercent = ((existTime_tmp / targetTime_tmp) * 100).toFixed(1);
      if (targetTime_tmp === 0) {
        donutData_2 = 1;
        donutPercent = 0;
      }
    }
  };
  const monthGraph_calculate = () => {
    // 초기화
    taskArray_month = new Array(lastMonthDate).fill(0);
    donutData_1 = 0;
    donutData_2 = 0;
    donutPercent = 0;
    if (networkStatus === 7 && myInfoData) {
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
      let arrayBox = new Array(lastMonthDate).fill(tmpTime);
      if (indexOfMonth[0] !== undefined) {
        for (let k = 0; k < indexOfMonth.length; k++) {
          const dateIndex =
            new Date(myInfoData.times[indexOfMonth[k]].createdAt).getDate() - 1;
          arrayBox[dateIndex] = myInfoData.times[indexOfMonth[k]];
        }
      }

      // AreaChart 계산
      let resultArray = [];
      for (let j = 0; j < lastMonthDate; j++) {
        resultArray.push(SumArray(arrayBox[j].time_24));
      }
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
      taskArray_schedule = new Array(resultArray_schedule.length).fill(0);
      taskArray_scheduleT = new Array(resultArray_scheduleT.length).fill(0);
      taskArray_schedule = twoArraySum(
        taskArray_schedule,
        resultArray_schedule,
      );
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
    }
  };

  if (networkStatus === 7) {
    if (StaTabs.currentIndex === 0) {
      todaySchedule_calculate();
      todayGraph_calculate();
    } else if (StaTabs.currentIndex === 1) {
      weekSchedule_calculate();
      weekGraph_calculate();
    } else {
      monthSchedule_calculate();
      monthGraph_calculate();
    }
  }

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <DatePickButton ref={ref} onClick={onClick}>
        {value} (Click)
      </DatePickButton>
    );
  });

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    myInfoRefetch();
  }, []);

  return (
    <Wrapper>
      <BigBox>
        {6 <= networkStatus <= 7 && myInfoData ? (
          <>
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
                  <Input_100
                    placeholder={''}
                    {...refreshTerm}
                    type={'number'}
                  />
                </RefreshInputWrap>
                <span>(Sec)&nbsp;</span>
                {myInfoLoading === false && <IngSpan></IngSpan>}
                {myInfoLoading === true && <IngSpan>ing...</IngSpan>}
              </RefreshDiv>
            </StatisRow>
            <StatisRow>
              {StaTabs.content.map((section, index) => (
                <ClassButton
                  key={index}
                  onClick={() => StaTabs.changeItem(index)}
                >
                  {section}
                </ClassButton>
              ))}
            </StatisRow>
            {StaTabs.currentIndex === 0 && (
              <>
                <StatisRow>
                  <ChartWrap>
                    <RowBarChart
                      data_1={taskArray_schedule}
                      data_2={taskArray_scheduleT}
                      labels={schedule_label}
                      label_1={'학습 시간'}
                      label_2={'목표 시간'}
                      title={'과목별 학습량'}
                      title_x={'학습량 (분)'}
                    />
                  </ChartWrap>
                </StatisRow>
                <StatisRow>
                  <ChartWrap>
                    <AreaChart
                      data_1={taskArray}
                      labels={oneDayHours}
                      title={'시간별 학습량'}
                      title_y={'학습량 (분)'}
                    />
                  </ChartWrap>
                </StatisRow>
                <StatisRow>
                  <ChartWrap>
                    <DonutChart
                      data_1={donutData_1}
                      data_2={donutData_2}
                      title={'학습 성취도'}
                      labels={['학습량', '목표량']}
                    />
                  </ChartWrap>
                  <DonutChartValue>{donutPercent}%</DonutChartValue>
                </StatisRow>
              </>
            )}
            {StaTabs.currentIndex === 1 && (
              <>
                <StatisRow>
                  <ChartWrap>
                    <RowBarChart
                      data_1={taskArray_schedule}
                      data_2={taskArray_scheduleT}
                      labels={schedule_label}
                      label_1={'학습 시간'}
                      label_2={'목표 시간'}
                      title={'과목별 학습량'}
                      title_x={'학습량 (분)'}
                    />
                  </ChartWrap>
                </StatisRow>
                <StatisRow>
                  <ChartWrap>
                    <AreaChart
                      data_1={taskArray_week}
                      labels={['일', '월', '화', '수', '목', '금', '토']}
                      title={'요일별 학습량'}
                      title_y={'학습량 (분)'}
                    />
                  </ChartWrap>
                </StatisRow>
                <StatisRow>
                  <ChartWrap>
                    <DonutChart
                      data_1={donutData_1}
                      data_2={donutData_2}
                      title={'학습 성취도'}
                      labels={['학습량', '목표량']}
                    />
                  </ChartWrap>
                  <DonutChartValue>{donutPercent}%</DonutChartValue>
                </StatisRow>
              </>
            )}
            {StaTabs.currentIndex === 2 && (
              <>
                <StatisRow>
                  <ChartWrap>
                    <RowBarChart
                      data_1={taskArray_schedule}
                      data_2={taskArray_scheduleT}
                      labels={schedule_label}
                      label_1={'학습 시간'}
                      label_2={'목표 시간'}
                      title={'과목별 학습량'}
                      title_x={'학습량 (분)'}
                    />
                  </ChartWrap>
                </StatisRow>
                <StatisRow>
                  <ChartWrap>
                    <AreaChart
                      data_1={taskArray_month}
                      labels={daysOfMonth}
                      title={'일별 학습량'}
                      title_y={'학습량 (분)'}
                    />
                  </ChartWrap>
                </StatisRow>
                <StatisRow>
                  <ChartWrap>
                    <DonutChart
                      data_1={donutData_1}
                      data_2={donutData_2}
                      title={'학습 성취도'}
                      labels={['학습량', '목표량']}
                    />
                  </ChartWrap>
                  <DonutChartValue>{donutPercent}%</DonutChartValue>
                </StatisRow>
              </>
            )}
          </>
        ) : (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </BigBox>
      <BigBox>
        <Title>
          {/* <ClassName>{selectClass.academy.name}</ClassName>
          <ClassName>{selectClass.name}</ClassName> */}
        </Title>
        <TitleGraph></TitleGraph>
        <ClassSelect>
          {/* <Select {...myClassList} id={'myClassList_id_sta'} /> */}
        </ClassSelect>
        <StudentBox>
          <LightBio>
            <SmallToggleBlue />: 학습 중 　 <SmallToggleRed />: 자리 비움
          </LightBio>
          {6 <= networkStatus <= 7 && myInfoData ? (
            <StudentList>
              {myInfoData.existToggle === true && <ToggleBlue />}
              {myInfoData.existToggle === false && <ToggleRed />}
              <AvatarWrap>
                <Avatar size="sm2" url={myInfoData.avatar} />
              </AvatarWrap>
              <StudentName>{myInfoData.fullName}</StudentName>
              {myInfoData.todayTime.attendanceStatus === '조퇴' ? (
                <ListColumn data-tip data-for="absence">
                  {myInfoData.todayTime.attendanceStatus}
                  <ReactTooltip id="absence">
                    <StudentTooltip>
                      조퇴 사유: {myInfoData.todayTime.absenceReason}
                    </StudentTooltip>
                  </ReactTooltip>
                </ListColumn>
              ) : (
                <ListColumn>{myInfoData.todayTime.attendanceStatus}</ListColumn>
              )}
            </StudentList>
          ) : (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
        </StudentBox>
      </BigBox>
    </Wrapper>
  );
};
