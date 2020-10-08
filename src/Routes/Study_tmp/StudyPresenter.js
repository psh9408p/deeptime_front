import React, { useEffect, useRef, useState, createRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as faceapi from "face-api.js"
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
// import LoadCamera from "../Components/LoadCamera/LoadCamera"
import useMouseLeave from '../../Hooks/useMouseLeave';
import useMouseEnter from '../../Hooks/useMouseEnter';
import useInterval from '../../Hooks/useInterval';
import { userEmail } from '../../Components/Routes';
import DonutChart_today from '../../Components/Charts/DonutChart_today';
import SplitArray from '../../Components/Array/SplitArray';
import SumArray from '../../Components/Array/SumArray';
import twoArraySum from '../../Components/twoArraySum';
import ObjectCopy from '../../Components/ObjectCopy';
import RowBarChart_now from '../../Components/Charts/RowBarChart_now';
import moment from 'moment';
import { Coffee, NextSchedule } from '../../Components/Icons';
import Countdown from 'react-countdown';
import Avatar from '../../Components/Avatar';

const UPDATE_EXISTTOGGLE = gql`
  mutation update_existToggle($email: String!, $existToggle: Boolean!) {
    update_existToggle(email: $email, existToggle: $existToggle)
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 960px;
  height: 500px;
  margin: 30px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const CanvasBox = styled.canvas`
  width: 450px;
  height: 460px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const VideoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 470px;
  height: 480px;
  margin: 10px 0 10px 10px;
  padding: 10px 10px 10px 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const GraphDiv = styled.div`
  width: 480px;
  height: 500px;
  padding: 10px;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
  padding: 0 0 0 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const DonutWrap = styled.div`
  width: 100%;
  height: 240px;
  margin-bottom: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const NowNextWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 160px;
  margin-bottom: 10px;
`;

const BarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 100%;
  margin-right: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const BreakNextWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 100%;
`;

const BreakTimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50%;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 10px;
`;

const NextTimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50%;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const TimeIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5em;
  width: 70%;
  height: 100%;
  font-size: 13px;
  font-weight: bold;
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  border-right: ${(props) => props.theme.boxBorder};
`;

let scheduleList_selectDay = [];
let scheduleList_selectDay_length = 0;
let taskArray = [];
let taskArray_percent = [];
let taskArray_percentT = [];
let taskArray_schedule = [];
let taskArray_scheduleT = [];
let donutData = [];
let donutData_1 = 0;
let donutData_2 = 0;
let donutPercent = 0;
let rgbBox = [];
let self_percent = [];
let lecture_percent = [];
let self_percentT = [];
let lecture_percentT = [];
let schedule_label = [];
let schedule_color = [];
let nowScheduleIndex = -1;
let nowScheduleTime = 0;
let nowScheduleTimeT = 0;
let nowScheduleColor = 'rgba(123, 169, 235, 1)';
let nowTitle1 = '';
let nowTitle2 = '';
let nextScheduleIndex = -1;
let nextTitle1 = '';
let nextTitle2 = '';
let next_TimeText = '';
let break_title = '';
let break_time = '';
let break_boolean = false;
let break_countdown = 0;

export default ({ myInfoData, networkStatus, startPolling }) => {
  const [modelPose, setModelPose] = useState(null);
  const [modelDetect, setModelDetect] = useState(null);
  // const [modelFace, setModelFace] = useState(null)
  // const [modelFaceMatcher, setModelFaceMatcher] = useState(null)
  const [detectButton, setDetectbutton] = useState(true);
  const [poseButton, setPosebutton] = useState(true);
  // const [faceButton, setFacebutton] = useState(true)
  const [decision, setDecision] = useState([true]);
  const [finalDecision, setFinalDecision] = useState(true);
  const [Mutation, setMutation] = useState(true);

  const [timeCount, setTimeCount] = useState(0);
  const [cameraLoad, setCameraLoad] = useState(false);
  const [modelLoad, setModelLoad] = useState(false);

  const video1 = useRef();
  const canvas1 = createRef();

  const [existToggleMutation] = useMutation(UPDATE_EXISTTOGGLE);

  const LoadModel = async () => {
    console.log('Load model');

    const loadedModelPose = await posenet.load();
    const loadedModelDetect = await cocoSsd.load({ base: 'mobilenet_v2' });
    setModelPose(loadedModelPose);
    setModelDetect(loadedModelDetect);
  };

  // for # Camera
  // 1. SetVideoElement
  // 1. LoadCamera
  // 1. ConnectElAndCamera
  const LoadCamera = async () => {
    console.log('Load camera');
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }

    const deviceIds = await navigator.mediaDevices.enumerateDevices();
    const videoDeviceIds = [];

    deviceIds.forEach(function (deviceId) {
      if (deviceId.kind === 'videoinput') {
        videoDeviceIds.push(deviceId);
      }
    });

    for (let i = 0; i < 1; i++) {
      if (getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: videoDeviceIds[i].deviceId } })
          .then(function (stream) {
            video1.current.srcObject = stream;
          })
          .catch(function (error) {
            console.log(error);
            console.log('Something went wrong!');
          });
      }
    }
    setCameraLoad(true);
  };

  const detectFromVideoFrame = async (video, canvas) => {
    try {
      console.log(timeCount);
      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴

      // if (poseButton) {

      const posePredictions = await modelPose.estimateMultiplePoses(
        canvas.current,
        {
          flipHorizontal: false,
          maxDetections: 1,
          minPoseConfidence: 0.15,
          minPartConfidence: 0.1,
          scoreThreshold: 0.5,
          nmsRadius: 30,
        },
      );

      const objectPredictions = await modelDetect.detect(canvas.current);
      const personDetections = objectPredictions.filter(
        (p) => p.class === 'person',
      );

      showDetections(canvas, posePredictions, personDetections);
      const Finaldecision = await ConcludeFinaldecision(
        posePredictions,
        personDetections,
      );
      return Finaldecision;
    } catch (error) {
      console.log("Couldn't start the webcam");
      console.error(error);
    }
  };

  const showDetections = (canvas, posePredictions, objectPredictions) => {
    console.log('Show detect');

    const ctx = canvas.current.getContext('2d');
    const font = '20px Arial';
    ctx.font = font;
    if (poseButton) {
      posePredictions.forEach((poses) => {
        const area_data = 3;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;

        const area = new Array(area_data);
        for (var i = 0; i < area.length; i++) {
          area[i] = false;
        }
        //   const img_width = video.webcamVideoElement.width
        const img_width = canvas.current.width;
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 4;
        for (var j = 0; j < poses.keypoints.length; j++) {
          ctx.strokeRect(
            poses.keypoints[j].position.x,
            poses.keypoints[j].position.y,
            1,
            1,
          );
          area[
            Math.floor(
              (poses.keypoints[0].position.x / img_width) * area.length,
            )
          ] = true;
        }
      });
    }
    if (detectButton) {
      objectPredictions.forEach((prediction) => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.strokeRect(...prediction.bbox);

        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const height = prediction.bbox[3];
        const label = prediction.class;
        // console.log(prediction.class)
        ctx.fillStyle = 'red';
        const textWidth = ctx.measureText(label).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
        // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, x, y + textHeight);
        // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
      });
    }
  };

  const ConcludeFinaldecision = (posePredictions, objectPredictions) => {
    let result = [];

    if (objectPredictions.length > 0 && posePredictions.length > 0) {
      result = true;
    } else {
      result = false;
    }
    setTimeCount(timeCount + 1);
    setDecision([...decision, result]);

    const temp = decision.reduce((obj, value, index, array) => {
      if (obj.hasOwnProperty(value)) {
        obj[value] += 1;
      } else {
        obj[value] = 1;
      }
      return obj;
    }, {});
    console.log(temp);
    if (decision.length === 3) {
      console.log(decision);
      // setDecision([])
      // console.log(decision)

      if (temp.true > 1) {
        setFinalDecision(true);
        console.log(finalDecision);
      } else {
        setFinalDecision(false);
        console.log(finalDecision);
      }
    }
  };
  useInterval(() => {
    console.log(timeCount);
    console.log(decision);
    console.log(canvas1.current);
    console.log(video1.current);
    if (
      modelPose !== null &&
      modelDetect !== null &&
      canvas1.current !== null &&
      video1.current !== null
    ) {
      if (timeCount % 20 === 1) {
        detectFromVideoFrame(video1.current, canvas1);
      } else {
        const ctx = canvas1.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(
          video1.current,
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height,
        );
        setTimeCount(timeCount + 1);
      }
      // setTimeCount(timeCount + 1)
      if (Mutation === true) {
        if (finalDecision === true && decision.length === 3) {
          // existToggleTableMutation({ variables: { email: Mydata.me.email, existToggle: true } })
          console.log('Final decision : true');
          existToggleMutation({
            variables: { email: userEmail, existToggle: true },
          });
          setDecision([]);
          // setFinalDecision([])
        } else if (finalDecision === false) {
          // existToggleTableMutation({ variables: { email: Mydata.me.email, existToggle: false } })
          console.log('Final decision : false');
          existToggleMutation({
            variables: { email: userEmail, existToggle: false },
          });
          setDecision([]);
          // setFinalDecision([])
        }
      }
    }
  }, 5000);

  const Toggle = (toggleValue, togglesetValue, toggleName) => {
    const toggle = () => togglesetValue(!toggleValue);
    return (
      <div>
        {toggleName}
        <button onClick={toggle}>{toggleValue ? 'ON' : 'OFF'}</button>
      </div>
    );
  };

  const whatNee = () => {
    console.log('왔니?');
  };
  const donleaveme = () => {
    // alert('마우스를 화면에 올려 놓으세요!!!');
    console.log('날 떠나지마');
  };

  // useMouseEnter(whatNee);

  // useMouseLeave(donleaveme);

  useEffect(() => {
    // LoadCamera();
    // LoadModel();
    startPolling(10000);
  }, []);

  const scheduleList = myInfoData.schedules;
  const selectDate = new Date();
  const nextDate = new Date();
  nextDate.setDate(new Date().getDate() + 1);

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

    // 현재 과목 찾기
    const nowDate = new Date();
    const findShedule = (i) =>
      new Date(i.start) <= nowDate && new Date(i.end) > nowDate;
    nowScheduleIndex = scheduleList_selectDay.findIndex(findShedule);
    // 다음 과목 찾기
    const findShedule_next = (i) => nowDate < new Date(i.start);
    nextScheduleIndex = scheduleList_selectDay.findIndex(findShedule_next);
  };

  const todayGraph_calculate = () => {
    // console.log(scheduleList_selectDay);
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

    // nowSchedule 계산
    if (nowScheduleIndex !== -1) {
      const nowSchedule = scheduleList_selectDay[nowScheduleIndex];
      const nowMin_start =
        new Date(nowSchedule.start).getHours() * 60 +
        new Date(nowSchedule.start).getMinutes();
      const nowMin_end =
        new Date(nowSchedule.end).getHours() * 60 +
        new Date(nowSchedule.end).getMinutes();
      const indexMin_start = nowMin_start / 5;
      const indexMin_end = nowMin_end / 5;
      let slicedTime_now = todayTime.time_24.slice(
        indexMin_start,
        indexMin_end,
      );
      if (
        new Date(nowSchedule.start).getDate() !==
        new Date(nowSchedule.end).getDate()
      ) {
        const Time_today = todayTime.time_24.slice(indexMin_start, 288);
        const Time_nextday = nextdayTime.time_24.slice(0, indexMin_end);
        slicedTime_now = [...Time_today, ...Time_nextday];
      }
      nowScheduleTime = SumArray(slicedTime_now) / 60;
      nowScheduleTimeT = nowSchedule.totalTime / 60 - nowScheduleTime;
      nowScheduleColor = nowSchedule.subject?.bgColor;
      const startPoint = new Date(nowSchedule.start);
      const endPoint = new Date(nowSchedule.end);
      nowTitle1 = nowSchedule.subject?.name + ' (' + nowSchedule.title + ')';
      nowTitle2 =
        moment(startPoint).format('hh:mma') +
        ' ~ ' +
        moment(endPoint).format('hh:mma');
    } else {
      nowScheduleTime = 0;
      nowScheduleTimeT = 0;
      nowScheduleColor = 'rgba(123, 169, 235, 1)';
      nowTitle1 = '현재 스케줄 없음';
      nowTitle2 = 'X';
    }
    // nextSchedule 계산
    if (nextScheduleIndex !== -1) {
      const nextSchedule = scheduleList_selectDay[nextScheduleIndex];
      nextTitle1 = nextSchedule.subject?.name;
      nextTitle2 = '(' + nextSchedule.title + ')';
      const startPoint_next = new Date(nextSchedule.start);
      const endPoint_next = new Date(nextSchedule.end);
      next_TimeText =
        moment(startPoint_next).format('hh:mma') +
        '~' +
        moment(endPoint_next).format('hh:mma');
    } else {
      nextTitle1 = '다음 스케줄 없음';
      nextTitle2 = 'X';
      next_TimeText = '';
    }
    // breakTime 계산
    if (nextScheduleIndex > 0) {
      const startPoint_break = new Date(
        scheduleList_selectDay[nextScheduleIndex - 1].end,
      );
      const endPoint_break = new Date(
        scheduleList_selectDay[nextScheduleIndex].start,
      );
      const nowTime_break = new Date();
      if (nowTime_break >= startPoint_break && nowTime_break < endPoint_break) {
        break_boolean = true;
        break_title = '휴식 시간';
        break_countdown =
          endPoint_break.getTime() - nowTime_break.getTime() + 60000;
      } else {
        break_boolean = false;
        break_title = '다음 휴식 시간';
      }
      break_time =
        moment(startPoint_break).format('hh:mma') +
        '~' +
        moment(endPoint_break).format('hh:mma');
    } else {
      break_title = '다음 휴식 없음';
      break_time = 'X';
      break_boolean = false;
    }

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
      const totalMin = scheduleList_selectDay[j].totalTime / 60;
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
    let slicedTimeBox = [];
    // console.log(todayTime.time_24);
    let slicedTimes = ObjectCopy(todayTime.time_24);
    while (true) {
      const index_tmp = slicedTimes.findIndex((i) => i > 0);
      if (index_tmp === -1) {
        slicedTimeBox.push(slicedTimes);
        const nowDateMin_count =
          Math.floor(
            (new Date().getHours() * 60 + new Date().getMinutes()) / 5,
          ) + 1;
        if (nowDateMin_count === 288) {
          // 지금이 23시 55분 이상이라는 뜻
          rgbBox.push('rgba(233, 236, 244, 1)'); // 회색
          break; // 빈시간으로 끝남
        } else {
          const lastIndex = 288 - nowDateMin_count; // 아직 지나지 않은 시간이 몇칸인지 알려주는 변수
          const lastZeroTime = slicedTimeBox[slicedTimeBox.length - 1];
          if (lastZeroTime.length - lastIndex === 0) {
            // 현재 학습중이므로 지금 뒤에 시간은 다 이전시간으로 처리
            rgbBox.push('rgba(123, 169, 235, 1)'); // 파란색 지금 이전 시간
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
            rgbBox.push('rgba(123, 169, 235, 1)'); // 파란색 지금 이전 시간
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
          rgbBox.push('rgba(15,76,130, 1)'); // 클래식 블루 학습시간
          break; // 학습시간으로 끝남
        } else {
          const studyTime = slicedTimes.slice(0, index_tmp2);
          slicedTimeBox.push(studyTime);
          rgbBox.push('rgba(15,76,130, 1)'); // 클래식 블루 학습시간
          slicedTimes = slicedTimes.slice(index_tmp2);
        }
      }
    }
    donutData = slicedTimeBox.map((a) => a.length * 5);
    const targetTime = SumArray(taskArray_scheduleT) * 60;
    if (targetTime === 0) {
      donutPercent = 0;
    } else {
      donutPercent = ((todayTime.existTime / targetTime) * 100).toFixed(1);
    }
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
    todaySchedule_calculate();
    todayGraph_calculate();
    // todayCalLoading.current = false;
  }

  return (
    <Wrapper>
      <VideoWrap>
        {/* <div>
          <video ref={video1} playsInline width="0" height="0" autoPlay muted />
          <CanvasBox ref={canvas1} />
        </div> */}
      </VideoWrap>
      <GraphDiv>
        <HeaderDiv>
          <Avatar size="sm2" url={myInfoData.avatar} />
          <span
            style={{ marginLeft: '10px', fontSize: '15px', fontWeight: 'bold' }}
          >
            {myInfoData.username}
          </span>
        </HeaderDiv>
        <DonutWrap>
          <DonutChart_today
            data={donutData}
            color={rgbBox}
            title={'Today Study Log'}
            labels={[
              '학습',
              '학습 외',
              '나머지',
              '현재 시간 ' + '　' + '　' + '　',
            ]}
          />
        </DonutWrap>
        <NowNextWrap>
          <BarWrap>
            <RowBarChart_now
              title1={nowTitle1}
              title2={nowTitle2}
              data_1={nowScheduleTime}
              data_2={nowScheduleTimeT}
              scheduleColor={nowScheduleColor}
            />
          </BarWrap>
          <BreakNextWrap>
            <BreakTimeDiv>
              <IconWrap>
                <Coffee />
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>Break</div>
              </IconWrap>
              <TimeIn>
                {break_title}
                <br />
                {break_time}
                {break_boolean && (
                  <Countdown
                    date={Date.now() + break_countdown}
                    renderer={({ hours, minutes }) => (
                      <span style={{ color: 'red' }}>
                        {hours > 0 && <span>{hours}시간 </span>}
                        {minutes}분 남음
                      </span>
                    )}
                  />
                )}
              </TimeIn>
            </BreakTimeDiv>
            <NextTimeDiv>
              <IconWrap>
                <NextSchedule />
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>Next</div>
              </IconWrap>
              <TimeIn>
                {nextTitle1}
                <br />
                {nextTitle2}
                <br />
                {next_TimeText}
              </TimeIn>
            </NextTimeDiv>
          </BreakNextWrap>
        </NowNextWrap>
      </GraphDiv>
    </Wrapper>
  );
};
