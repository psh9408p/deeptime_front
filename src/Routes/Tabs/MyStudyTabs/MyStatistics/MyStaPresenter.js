import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Loader from '../../../../Components/Loader';
import AreaChart from '../../../../Components/Charts/AreaChart';
import RowBarChart from '../../../../Components/Charts/RowBarChart';
import RowBarChart_selfPercent from '../../../../Components/Charts/RowBarChart_selfPercent';
import DonutChart from '../../../../Components/Charts/DonutChart';
import PieChart from '../../../../Components/Charts/PieChart';
import twoArraySum from '../../../../Components/twoArraySum';
import SumArray from '../../../../Components/Array/SumArray';
import SplitArray from '../../../../Components/Array/SplitArray';
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
  z-index: 3;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BigBox = styled.div`
  background-color: white;
  &:first-child {
    border: ${(props) => props.theme.boxBorder};
    border-radius: ${(props) => props.theme.borderRadius};
    width: 654.5px;
    height: 1475px;
    position: relative;
  }
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
    height: 290px;
  }
  &:nth-child(4) {
    height: 270px;
  }
  &:nth-child(5) {
    height: 295px;
  }
  &:nth-child(6) {
    height: 295px;
  }
  &:last-child {
    height: 145px;
    margin-bottom: 10px;
  }
`;

const ChartWrap = styled.div`
  width: 570px;
  height: 100%;
`;

const ChartWrap_percentBar = styled.div`
  width: 300px;
  height: 100%;
`;

const TotalTime = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  padding-top: 177px;
  padding-left: 267px;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => props.theme.skyBlue};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TargetTime = styled(TotalTime)`
  padding-top: 192px;
  padding-left: 300px;
  color: black;
`;

const DonutPercent = styled(TotalTime)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 25px;
  margin-top: 128px;
  margin-left: 267px;
  padding: 0;
  width: 100px;
  height: 50px;
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

const ChangeWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ChangeButton = styled.button`
  width: 50px;
  height: 50px;
  border: 0;
  border-radius: 25px;
  background-color: ${(props) =>
    props.styleBoolean
      ? (props) => props.theme.skyBlue
      : (props) => props.theme.classicGray};
  color: ${(props) => (props.styleBoolean ? 'white' : 'black')};
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  &:first-child {
    margin-right: 400px;
  }
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
let taskArray_percent = [];
let taskArray_percentT = [];
let schedule_label = [];
let schedule_color = [];
let scheduleList_selectDay = [];
let scheduleList_selectDay_week = [[], [], [], [], [], [], []];
let scheduleList_selectDay_month = [];
let donutData_1 = 0;
let donutData_2 = 0;
let donutPercent = 0;
let rgbBox = [];
let scheduleList_selectDay_length = 0;
// let scheduleList_selectDay_week_length = 0;
let scheduleList_selectDay_month_length = 0;
let self_percent = [];
let lecture_percent = [];
let self_percentT = [];
let lecture_percentT = [];
let target_min = 0;
let target_hour = 0;
let total_min = 0;
let total_hour = 0;

export default ({
  StaTabs,
  selectDate,
  nextDate,
  setSelectDate,
  myInfoData,
  networkStatus,
  refreshTerm,
  oneDayHours,
  todayCalLoading,
  weekCalLoading,
  monthCalLoading,
  selectPercent,
  setSelectPercent,
  selectPercent2,
  setSelectPercent2,
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
        startDate === selectDate.getDate() &&
        scheduleList[i].isPrivate === false
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
        new Date(scheduleList[i].start) < real_weekEnd &&
        scheduleList[i].isPrivate === false
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
        startMonth === selectDate.getMonth() &&
        scheduleList[i].isPrivate === false
      ) {
        scheduleList_selectDay_month.push(scheduleList[i]);
      }
    }
    scheduleList_selectDay_month_length = scheduleList_selectDay_month.length;
  };

  const todayGraph_calculate = () => {
    // console.log(scheduleList_selectDay);
    // 초기화
    taskArray = new Array(24).fill(0);
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
    let indexOfNextday = myInfoData.times.findIndex(
      (i) =>
        new Date(i.createdAt).getFullYear() == nextDate.getFullYear() &&
        new Date(i.createdAt).getMonth() == nextDate.getMonth() &&
        new Date(i.createdAt).getDate() == nextDate.getDate(),
    );
    // today Time 없을 경우 값이 0인 Time 추가해주기
    if (indexOfToday === -1) {
      myInfoData.times.push({
        existTime: 0,
        time_24: new Array(288).fill(0),
      });
      indexOfToday = myInfoData.times.length - 1;
    }
    if (indexOfNextday === -1) {
      myInfoData.times.push({
        existTime: 0,
        time_24: new Array(288).fill(0),
      });
      indexOfNextday = myInfoData.times.length - 1;
    }

    const todayTime = myInfoData.times[indexOfToday];
    const nextdayTime = myInfoData.times[indexOfNextday];

    // AreaChart 계산
    const arrayBox = SplitArray(todayTime.time_24, 12);
    let resultArray = arrayBox.map((a) => SumArray(a));
    taskArray = twoArraySum(taskArray, resultArray);
    // 스케줄 별 그래프 계산
    let resultArray_schedule = []; // exist 타임 용
    let resultArray_scheduleT = []; // 타겟타임용
    schedule_label = [];
    schedule_color = [];
    self_percent = [];
    lecture_percent = [];
    self_percentT = [];
    lecture_percentT = [];
    let selfStudy_box = [];
    let lectureStudy_box = [];
    let selfStudy_boxT = [];
    let lectureStudy_boxT = [];
    for (let j = 0; j < scheduleList_selectDay_length; j++) {
      // console.log(scheduleList_selectDay);
      const totalMin =
        (new Date(scheduleList_selectDay[j].end).getTime() -
          new Date(scheduleList_selectDay[j].start).getTime()) /
        60000;
      const totalMin_start =
        new Date(scheduleList_selectDay[j].start).getHours() * 60 +
        new Date(scheduleList_selectDay[j].start).getMinutes();
      const totalMin_end =
        new Date(scheduleList_selectDay[j].end).getHours() * 60 +
        new Date(scheduleList_selectDay[j].end).getMinutes();
      const indexMin_start = totalMin_start / 5;
      const indexMin_end = totalMin_end / 5;
      let slicedTime = todayTime.time_24.slice(indexMin_start, indexMin_end);
      //만약 2틀에 걸친 스케줄이라면
      if (
        new Date(scheduleList_selectDay[j].start).getDate() !==
        new Date(scheduleList_selectDay[j].end).getDate()
      ) {
        const scheduleTime_today = todayTime.time_24.slice(indexMin_start, 288);
        const scheduleTime_nextday = nextdayTime.time_24.slice(0, indexMin_end);
        slicedTime = [...scheduleTime_today, ...scheduleTime_nextday];
      }
      const duplIndex = schedule_label.indexOf(
        scheduleList_selectDay[j].subject
          ? scheduleList_selectDay[j].subject.name
          : '과목 없음',
      );
      // 중복되는 과목 인덱스 체크
      if (duplIndex === -1) {
        schedule_label.push(
          scheduleList_selectDay[j].subject
            ? scheduleList_selectDay[j].subject.name
            : '과목 없음',
        );
        schedule_color.push(
          scheduleList_selectDay[j].subject
            ? scheduleList_selectDay[j].subject.bgColor
            : '#A1B56C',
        );
        resultArray_schedule.push(SumArray(slicedTime));
        resultArray_scheduleT.push(totalMin);
      } else {
        resultArray_schedule[duplIndex] =
          resultArray_schedule[duplIndex] + SumArray(slicedTime);
        resultArray_scheduleT[duplIndex] =
          resultArray_scheduleT[duplIndex] + totalMin;
      }
      // 자습 강의 구분하여 시간 넣기
      if (scheduleList_selectDay[j].state === '자습') {
        selfStudy_box.push(SumArray(slicedTime));
        selfStudy_boxT.push(totalMin);
      } else {
        lectureStudy_box.push(SumArray(slicedTime));
        lectureStudy_boxT.push(totalMin);
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
    // 스케줄(과목) 시간 퍼센트 계산
    const totalExsitTime = SumArray(taskArray_schedule);
    const totalTargetTime = SumArray(taskArray_scheduleT);
    if (schedule_label.length === 0) {
      taskArray_percent = [1];
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else if (totalExsitTime === 0) {
      taskArray_percent = taskArray_schedule.map(() => 0);
      taskArray_percent.push(1);
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else {
      taskArray_percent = taskArray_schedule.map((time) =>
        Math.floor((time / totalExsitTime) * 100),
      );
    }
    if (schedule_label.length === 0) {
      taskArray_percentT = [1];
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else if (totalTargetTime === 0) {
      taskArray_percentT = taskArray_scheduleT.map(() => 0);
      taskArray_percentT.push(1);
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else {
      taskArray_percentT = taskArray_scheduleT.map((time) =>
        Math.floor((time / totalTargetTime) * 100),
      );
    }
    // 도넛차트 계산
    let targetTime = SumArray(taskArray_scheduleT);
    let existTime_tmp = todayTime.existTime / 60;
    if (targetTime === 0) {
      donutData_1 = existTime_tmp > 0 ? 1 : 0;
      donutData_2 = existTime_tmp > 0 ? 0 : 1;
      donutPercent = 0;
    } else if (targetTime - existTime_tmp < 0) {
      donutData_1 = 1;
      donutData_2 = 0;
      donutPercent = ((existTime_tmp / targetTime) * 100).toFixed(0);
    } else {
      donutData_1 = existTime_tmp;
      donutData_2 = targetTime - existTime_tmp;
      donutPercent = ((existTime_tmp / targetTime) * 100).toFixed(0);
    }
    //도넛 안 시간 계산
    target_hour = String(Math.floor(targetTime / 60));
    targetTime = targetTime - target_hour * 60;
    target_min = String(Math.floor(targetTime));
    total_hour = String(Math.floor(existTime_tmp / 60));
    existTime_tmp = existTime_tmp - total_hour * 60;
    total_min = String(Math.floor(existTime_tmp));
    //자습 강의 비율 계산
    const total_self = SumArray(selfStudy_box);
    const total_lecture = SumArray(lectureStudy_box);
    const total_value = total_self + total_lecture;
    const total_selfT = SumArray(selfStudy_boxT);
    const total_lectureT = SumArray(lectureStudy_boxT);
    const total_valueT = total_selfT + total_lectureT;
    if (total_value === 0) {
      self_percent = 0;
      lecture_percent = 0;
    } else {
      self_percent = Math.round((total_self / total_value) * 100);
      lecture_percent = 100 - self_percent;
    }
    if (total_valueT === 0) {
      self_percentT = 0;
      lecture_percentT = 0;
    } else {
      self_percentT = Math.round((total_selfT / total_valueT) * 100);
      lecture_percentT = 100 - self_percentT;
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
      return { existTime: 0, time_24: new Array(288).fill(0) };
    });
    if (indexOfWeek[0] !== undefined) {
      for (let k = 0; k < indexOfWeek.length; k++) {
        const dayIndex = new Date(
          myInfoData.times[indexOfWeek[k]].createdAt,
        ).getDay();
        arrayBox[dayIndex].time_24 = myInfoData.times[indexOfWeek[k]].time_24;
        arrayBox[dayIndex].existTime =
          myInfoData.times[indexOfWeek[k]].existTime;
      }
    }

    // AreaChart 계산
    let resultArray = arrayBox.map((a) => SumArray(a.time_24));
    taskArray_week = twoArraySum(taskArray_week, resultArray);
    // 스케줄 별 그래프 계산
    let resultArray_schedule = []; // exist 타임 용
    let resultArray_scheduleT = []; // 타겟타임용
    schedule_label = [];
    schedule_color = [];
    self_percent = [];
    lecture_percent = [];
    self_percentT = [];
    lecture_percentT = [];
    let selfStudy_box = [];
    let lectureStudy_box = [];
    let selfStudy_boxT = [];
    let lectureStudy_boxT = [];
    for (let k = 0; k < 7; k++) {
      const todayTime_24 = arrayBox[k].time_24;
      for (let j = 0; j < scheduleList_selectDay_week[k].length; j++) {
        // console.log(scheduleList_selectDay);
        const totalMin =
          (new Date(scheduleList_selectDay_week[k][j].end).getTime() -
            new Date(scheduleList_selectDay_week[k][j].start).getTime()) /
          60000;
        const totalMin_start =
          new Date(scheduleList_selectDay_week[k][j].start).getHours() * 60 +
          new Date(scheduleList_selectDay_week[k][j].start).getMinutes();
        const totalMin_end =
          new Date(scheduleList_selectDay_week[k][j].end).getHours() * 60 +
          new Date(scheduleList_selectDay_week[k][j].end).getMinutes();
        const indexMin_start = totalMin_start / 5;
        const indexMin_end = totalMin_end / 5;
        let slicedTime = todayTime_24.slice(indexMin_start, indexMin_end);
        //만약 2틀에 걸친 스케줄이라면
        if (
          new Date(scheduleList_selectDay_week[k][j].start).getDate() !==
          new Date(scheduleList_selectDay_week[k][j].end).getDate()
        ) {
          /// 토요일(일주일 끝나는날) 다음날에 걸치는 스케줄 있을시 다음날 시간 땡겨오기
          let nextdayTime_24 = [];
          if (k === 6) {
            const indexOfNextday = myInfoData.times.findIndex(
              (i) =>
                new Date(i.createdAt).getFullYear() ==
                  real_weekEnd.getFullYear() &&
                new Date(i.createdAt).getMonth() == real_weekEnd.getMonth() &&
                new Date(i.createdAt).getDate() == real_weekEnd.getDate(),
            );
            if (indexOfNextday === -1) {
              nextdayTime_24 = new Array(288).fill(0);
            } else {
              nextdayTime_24 = myInfoData.times[indexOfNextday].time_24;
            }
          } else {
            nextdayTime_24 = arrayBox[k + 1].time_24;
          }

          const scheduleTime_today = todayTime_24.slice(indexMin_start, 288);
          const scheduleTime_nextday = nextdayTime_24.slice(0, indexMin_end);
          slicedTime = [...scheduleTime_today, ...scheduleTime_nextday];
        }
        const duplIndex = schedule_label.indexOf(
          scheduleList_selectDay_week[k][j].subject
            ? scheduleList_selectDay_week[k][j].subject.name
            : '과목 없음',
        ); // 중복되는 과목 인덱스 체크
        if (duplIndex === -1) {
          schedule_label.push(
            scheduleList_selectDay_week[k][j].subject
              ? scheduleList_selectDay_week[k][j].subject.name
              : '과목 없음',
          );
          schedule_color.push(
            scheduleList_selectDay_week[k][j].subject
              ? scheduleList_selectDay_week[k][j].subject.bgColor
              : '#A1B56C',
          );
          resultArray_schedule.push(SumArray(slicedTime));
          resultArray_scheduleT.push(totalMin);
        } else {
          resultArray_schedule[duplIndex] =
            resultArray_schedule[duplIndex] + SumArray(slicedTime);
          resultArray_scheduleT[duplIndex] =
            resultArray_scheduleT[duplIndex] + totalMin;
        }
        // 자습 강의 구분해서 시간 넣기
        if (scheduleList_selectDay_week[k][j].state === '자습') {
          selfStudy_box.push(SumArray(slicedTime));
          selfStudy_boxT.push(totalMin);
        } else {
          lectureStudy_box.push(SumArray(slicedTime));
          lectureStudy_boxT.push(totalMin);
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
      taskArray_week[index] = item / 3600;
    });
    // 스케줄 그래프 계산
    if (taskArray_schedule_week !== []) {
      taskArray_schedule_week.forEach(function (item, index) {
        taskArray_schedule_week[index] = item / 3600;
      });
    }
    if (taskArray_scheduleT_week !== []) {
      taskArray_scheduleT_week.forEach(function (item, index) {
        taskArray_scheduleT_week[index] = item / 60;
      });
    }
    // 스케줄(과목) 시간 퍼센트 계산
    const totalExsitTime = SumArray(taskArray_schedule_week);
    const totalTargetTime = SumArray(taskArray_scheduleT_week);
    if (schedule_label.length === 0) {
      taskArray_percent = [1];
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else if (totalExsitTime === 0) {
      taskArray_percent = taskArray_schedule_week.map(() => 0);
      taskArray_percent.push(1);
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else {
      taskArray_percent = taskArray_schedule_week.map((time) =>
        Math.floor((time / totalExsitTime) * 100),
      );
    }
    if (schedule_label.length === 0) {
      taskArray_percentT = [1];
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else if (totalTargetTime === 0) {
      taskArray_percentT = taskArray_scheduleT_week.map(() => 0);
      taskArray_percentT.push(1);
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else {
      taskArray_percentT = taskArray_scheduleT_week.map((time) =>
        Math.floor((time / totalTargetTime) * 100),
      );
    }
    // 도넛차트 계산
    let existTime_tmp = 0;
    for (let j = 0; j < 7; j++) {
      existTime_tmp = existTime_tmp + arrayBox[j].existTime;
    }
    existTime_tmp = existTime_tmp / 60;
    let targetTime = SumArray(taskArray_scheduleT_week) * 60;
    if (targetTime === 0) {
      donutData_1 = existTime_tmp > 0 ? 1 : 0;
      donutData_2 = existTime_tmp > 0 ? 0 : 1;
      donutPercent = 0;
    } else if (targetTime - existTime_tmp < 0) {
      donutData_1 = 1;
      donutData_2 = 0;
      donutPercent = ((existTime_tmp / targetTime) * 100).toFixed(0);
    } else {
      donutData_1 = existTime_tmp;
      donutData_2 = targetTime - existTime_tmp;
      donutPercent = ((existTime_tmp / targetTime) * 100).toFixed(0);
    }
    //도넛 안 시간 계산
    target_hour = String(Math.floor(targetTime / 60));
    targetTime = targetTime - target_hour * 60;
    target_min = String(Math.floor(targetTime));
    total_hour = String(Math.floor(existTime_tmp / 60));
    existTime_tmp = existTime_tmp - total_hour * 60;
    total_min = String(Math.floor(existTime_tmp));
    //자습 강의 비율 계산
    const total_self = SumArray(selfStudy_box);
    const total_lecture = SumArray(lectureStudy_box);
    const total_value = total_self + total_lecture;
    const total_selfT = SumArray(selfStudy_boxT);
    const total_lectureT = SumArray(lectureStudy_boxT);
    const total_valueT = total_selfT + total_lectureT;
    if (total_value === 0) {
      self_percent = 0;
      lecture_percent = 0;
    } else {
      self_percent = Math.round((total_self / total_value) * 100);
      lecture_percent = 100 - self_percent;
    }
    if (total_valueT === 0) {
      self_percentT = 0;
      lecture_percentT = 0;
    } else {
      self_percentT = Math.round((total_selfT / total_valueT) * 100);
      lecture_percentT = 100 - self_percentT;
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
      return { existTime: 0, time_24: new Array(288).fill(0) };
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
    schedule_color = [];
    self_percent = [];
    lecture_percent = [];
    self_percentT = [];
    lecture_percentT = [];
    let selfStudy_box = [];
    let lectureStudy_box = [];
    let selfStudy_boxT = [];
    let lectureStudy_boxT = [];
    for (let j = 0; j < scheduleList_selectDay_month_length; j++) {
      const dateIndex =
        new Date(scheduleList_selectDay_month[j].start).getDate() - 1;
      const todayTime_24 = arrayBox[dateIndex].time_24;
      const totalMin =
        (new Date(scheduleList_selectDay_month[j].end).getTime() -
          new Date(scheduleList_selectDay_month[j].start).getTime()) /
        60000;
      const totalMin_start =
        new Date(scheduleList_selectDay_month[j].start).getHours() * 60 +
        new Date(scheduleList_selectDay_month[j].start).getMinutes();
      const totalMin_end =
        new Date(scheduleList_selectDay_month[j].end).getHours() * 60 +
        new Date(scheduleList_selectDay_month[j].end).getMinutes();
      const indexMin_start = totalMin_start / 5;
      const indexMin_end = totalMin_end / 5;
      let slicedTime = todayTime_24.slice(indexMin_start, indexMin_end);
      //만약 2틀에 걸친 스케줄이라면
      if (
        new Date(scheduleList_selectDay_month[j].start).getDate() !==
        new Date(scheduleList_selectDay_month[j].end).getDate()
      ) {
        /// 토요일(일주일 끝나는날) 다음날에 걸치는 스케줄 있을시 다음날 시간 땡겨오기
        let nextdayTime_24 = [];
        if (dateIndex + 1 === lastMonthDate) {
          const nextMonthFirstDay = new Date(
            selectDate.getFullYear(),
            selectDate.getMonth() + 1,
            1,
          );
          const indexOfNextday = myInfoData.times.findIndex(
            (i) =>
              new Date(i.createdAt).getFullYear() ==
                nextMonthFirstDay.getFullYear() &&
              new Date(i.createdAt).getMonth() ==
                nextMonthFirstDay.getMonth() &&
              new Date(i.createdAt).getDate() == nextMonthFirstDay.getDate(),
          );
          if (indexOfNextday === -1) {
            nextdayTime_24 = new Array(288).fill(0);
          } else {
            nextdayTime_24 = myInfoData.times[indexOfNextday].time_24;
          }
        } else {
          nextdayTime_24 = arrayBox[dateIndex + 1].time_24;
        }

        const scheduleTime_today = todayTime_24.slice(indexMin_start, 288);
        const scheduleTime_nextday = nextdayTime_24.slice(0, indexMin_end);
        slicedTime = [...scheduleTime_today, ...scheduleTime_nextday];
      }
      const duplIndex = schedule_label.indexOf(
        scheduleList_selectDay_month[j].subject
          ? scheduleList_selectDay_month[j].subject.name
          : '과목 없음',
      ); // 중복되는 과목 인덱스 체크
      if (duplIndex === -1) {
        schedule_label.push(
          scheduleList_selectDay_month[j].subject
            ? scheduleList_selectDay_month[j].subject.name
            : '과목 없음',
        );
        resultArray_schedule.push(SumArray(slicedTime));
        schedule_color.push(
          scheduleList_selectDay_month[j].subject
            ? scheduleList_selectDay_month[j].subject.bgColor
            : '#A1B56C',
        );
        resultArray_scheduleT.push(totalMin);
      } else {
        resultArray_schedule[duplIndex] =
          resultArray_schedule[duplIndex] + SumArray(slicedTime);
        resultArray_scheduleT[duplIndex] =
          resultArray_scheduleT[duplIndex] + totalMin;
      }
      // 자습 강의 구분하여 시간 넣기
      if (scheduleList_selectDay_month[j].state === '자습') {
        selfStudy_box.push(SumArray(slicedTime));
        selfStudy_boxT.push(totalMin);
      } else {
        lectureStudy_box.push(SumArray(slicedTime));
        lectureStudy_boxT.push(totalMin);
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
      taskArray_month[index] = item / 3600;
    });
    // 스케줄 그래프 계산
    if (taskArray_schedule_month !== []) {
      taskArray_schedule_month.forEach(function (item, index) {
        taskArray_schedule_month[index] = item / 3600;
      });
    }
    if (taskArray_scheduleT_month !== []) {
      taskArray_scheduleT_month.forEach(function (item, index) {
        taskArray_scheduleT_month[index] = item / 60;
      });
    }
    // 스케줄(과목) 시간 퍼센트 계산
    const totalExsitTime = SumArray(taskArray_schedule_month);
    const totalTargetTime = SumArray(taskArray_scheduleT_month);
    if (schedule_label.length === 0) {
      taskArray_percent = [1];
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else if (totalExsitTime === 0) {
      taskArray_percent = taskArray_schedule_month.map(() => 0);
      taskArray_percent.push(1);
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else {
      taskArray_percent = taskArray_schedule_month.map((time) =>
        Math.floor((time / totalExsitTime) * 100),
      );
    }
    if (schedule_label.length === 0) {
      taskArray_percentT = [1];
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else if (totalTargetTime === 0) {
      taskArray_percentT = taskArray_scheduleT_month.map(() => 0);
      taskArray_percentT.push(1);
      schedule_color.push('rgba(233, 236, 244, 1)');
    } else {
      taskArray_percentT = taskArray_scheduleT_month.map((time) =>
        Math.floor((time / totalTargetTime) * 100),
      );
    }
    // 도넛차트 계산
    let existTime_tmp = 0;
    for (let j = 0; j < lastMonthDate; j++) {
      existTime_tmp = existTime_tmp + arrayBox[j].existTime;
    }
    existTime_tmp = existTime_tmp / 60;
    let targetTime = SumArray(taskArray_scheduleT_month) * 60;
    if (targetTime === 0) {
      donutData_1 = existTime_tmp > 0 ? 1 : 0;
      donutData_2 = existTime_tmp > 0 ? 0 : 1;
      donutPercent = 0;
    } else if (targetTime - existTime_tmp < 0) {
      donutData_1 = 1;
      donutData_2 = 0;
      donutPercent = ((existTime_tmp / targetTime) * 100).toFixed(0);
    } else {
      donutData_1 = existTime_tmp;
      donutData_2 = targetTime - existTime_tmp;
      donutPercent = ((existTime_tmp / targetTime) * 100).toFixed(0);
    }
    //도넛 안 시간 계산
    target_hour = String(Math.floor(targetTime / 60));
    targetTime = targetTime - target_hour * 60;
    target_min = String(Math.floor(targetTime));
    total_hour = String(Math.floor(existTime_tmp / 60));
    existTime_tmp = existTime_tmp - total_hour * 60;
    total_min = String(Math.floor(existTime_tmp));
    //자습 강의 비율 계산
    const total_self = SumArray(selfStudy_box);
    const total_lecture = SumArray(lectureStudy_box);
    const total_value = total_self + total_lecture;
    const total_selfT = SumArray(selfStudy_boxT);
    const total_lectureT = SumArray(lectureStudy_boxT);
    const total_valueT = total_selfT + total_lectureT;
    if (total_value === 0) {
      self_percent = 0;
      lecture_percent = 0;
    } else {
      self_percent = Math.round((total_self / total_value) * 100);
      lecture_percent = 100 - self_percent;
    }
    if (total_valueT === 0) {
      self_percentT = 0;
      lecture_percentT = 0;
    } else {
      self_percentT = Math.round((total_selfT / total_valueT) * 100);
      lecture_percentT = 100 - self_percentT;
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
                  data_color={schedule_color}
                  labels={schedule_label}
                  label_1={'학습'}
                  label_2={'목표'}
                  title={'과목별 학습 시간'}
                  title_x={'시간(분)'}
                  dateRange={'today'}
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
                  dateRange={'today'}
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
                <DonutChart
                  data_1={donutData_1}
                  data_2={donutData_2}
                  title={'학습 성취도'}
                  labels={['학습', '목표']}
                />
              </ChartWrap>
              <TotalTime>
                {total_hour.length === 1 ? '0' + total_hour : total_hour}h
                {total_min.length === 1 ? '0' + total_min : total_min}m
              </TotalTime>
              <TargetTime>
                / {target_hour.length === 1 ? '0' + target_hour : target_hour}h
                {target_min.length === 1 ? '0' + target_min : target_min}m
              </TargetTime>
              <DonutPercent>{donutPercent}%</DonutPercent>
              {todayCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <PieChart
                  data={selectPercent ? taskArray_percentT : taskArray_percent}
                  dataColor={schedule_color}
                  labels={schedule_label}
                  title={
                    selectPercent
                      ? '과목별 목표 시간 비율'
                      : '과목별 학습 시간 비율'
                  }
                  updateBoolean={selectPercent}
                />
              </ChartWrap>
              <ChangeWrap>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent(true);
                  }}
                  styleBoolean={selectPercent}
                >
                  목표
                </ChangeButton>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent(false);
                  }}
                  styleBoolean={!selectPercent}
                >
                  학습
                </ChangeButton>
              </ChangeWrap>
              {todayCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap_percentBar>
                <RowBarChart_selfPercent
                  title={
                    selectPercent2
                      ? '목표 시간 자습&강의 비율'
                      : '학습 시간 자습&강의 비율'
                  }
                  data_1={selectPercent2 ? self_percentT : self_percent}
                  data_2={selectPercent2 ? lecture_percentT : lecture_percent}
                  updateBoolean={selectPercent2}
                />
              </ChartWrap_percentBar>
              <ChangeWrap>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent2(true);
                  }}
                  styleBoolean={selectPercent2}
                >
                  목표
                </ChangeButton>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent2(false);
                  }}
                  styleBoolean={!selectPercent2}
                >
                  학습
                </ChangeButton>
              </ChangeWrap>
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
                  data_color={schedule_color}
                  labels={schedule_label}
                  label_1={'학습'}
                  label_2={'목표'}
                  title={'과목별 학습 시간'}
                  title_x={'시간(시)'}
                  dateRange={'week'}
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
                  title_y={'시간(시)'}
                  dateRange={'week'}
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
              <TotalTime>
                {total_hour.length === 1 ? '0' + total_hour : total_hour}h
                {total_min.length === 1 ? '0' + total_min : total_min}m
              </TotalTime>
              <TargetTime>
                / {target_hour.length === 1 ? '0' + target_hour : target_hour}h
                {target_min.length === 1 ? '0' + target_min : target_min}m
              </TargetTime>
              <DonutPercent>{donutPercent}%</DonutPercent>
              {weekCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <PieChart
                  data={selectPercent ? taskArray_percentT : taskArray_percent}
                  dataColor={schedule_color}
                  labels={schedule_label}
                  title={
                    selectPercent
                      ? '과목별 목표 시간 비율'
                      : '과목별 학습 시간 비율'
                  }
                  updateBoolean={selectPercent}
                />
              </ChartWrap>
              <ChangeWrap>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent(true);
                  }}
                  styleBoolean={selectPercent}
                >
                  목표
                </ChangeButton>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent(false);
                  }}
                  styleBoolean={!selectPercent}
                >
                  학습
                </ChangeButton>
              </ChangeWrap>
              {weekCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap_percentBar>
                <RowBarChart_selfPercent
                  title={
                    selectPercent2
                      ? '목표 시간 자습&강의 비율'
                      : '학습 시간 자습&강의 비율'
                  }
                  data_1={selectPercent2 ? self_percentT : self_percent}
                  data_2={selectPercent2 ? lecture_percentT : lecture_percent}
                  updateBoolean={selectPercent2}
                />
              </ChartWrap_percentBar>
              <ChangeWrap>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent2(true);
                  }}
                  styleBoolean={selectPercent2}
                >
                  목표
                </ChangeButton>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent2(false);
                  }}
                  styleBoolean={!selectPercent2}
                >
                  학습
                </ChangeButton>
              </ChangeWrap>
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
                  data_color={schedule_color}
                  labels={schedule_label}
                  label_1={'학습'}
                  label_2={'목표'}
                  title={'과목별 학습 시간'}
                  title_x={'시간(시)'}
                  dateRange={'month'}
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
                  title_y={'시간(시)'}
                  dateRange={'month'}
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
              <TotalTime>
                {total_hour.length === 1 ? '0' + total_hour : total_hour}h
                {total_min.length === 1 ? '0' + total_min : total_min}m
              </TotalTime>
              <TargetTime>
                / {target_hour.length === 1 ? '0' + target_hour : target_hour}h
                {target_min.length === 1 ? '0' + target_min : target_min}m
              </TargetTime>
              <DonutPercent>{donutPercent}%</DonutPercent>
              {monthCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap>
                <PieChart
                  data={selectPercent ? taskArray_percentT : taskArray_percent}
                  dataColor={schedule_color}
                  labels={schedule_label}
                  title={
                    selectPercent
                      ? '과목별 목표 시간 비율'
                      : '과목별 학습 시간 비율'
                  }
                  updateBoolean={selectPercent}
                />
              </ChartWrap>
              <ChangeWrap>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent(true);
                  }}
                  styleBoolean={selectPercent}
                >
                  목표
                </ChangeButton>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent(false);
                  }}
                  styleBoolean={!selectPercent}
                >
                  학습
                </ChangeButton>
              </ChangeWrap>
              {monthCalLoading.current && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </StatisRow>
            <StatisRow>
              <ChartWrap_percentBar>
                <RowBarChart_selfPercent
                  title={
                    selectPercent2
                      ? '목표 시간 자습&강의 비율'
                      : '학습 시간 자습&강의 비율'
                  }
                  data_1={selectPercent2 ? self_percentT : self_percent}
                  data_2={selectPercent2 ? lecture_percentT : lecture_percent}
                  updateBoolean={selectPercent2}
                />
              </ChartWrap_percentBar>
              <ChangeWrap>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent2(true);
                  }}
                  styleBoolean={selectPercent2}
                >
                  목표
                </ChangeButton>
                <ChangeButton
                  onClick={() => {
                    setSelectPercent2(false);
                  }}
                  styleBoolean={!selectPercent2}
                >
                  학습
                </ChangeButton>
              </ChangeWrap>
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
