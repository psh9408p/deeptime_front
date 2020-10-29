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
import {
  Coffee,
  NextSchedule,
  Setting,
  Study_true,
  Study_false,
  Film,
  Flag,
  Delete,
} from '../../Components/Icons';
import { Clock24 } from '../../Components/Image';
import Countdown from 'react-countdown';
import Switch from 'react-input-switch';
import Popup from 'reactjs-popup';
import PopupButton_solo from '../../Components/Buttons/PopupButton_solo';
import FatText from '../../Components/FatText';
import Input_100 from '../../Components/Input_100';
import Button_custom from '../../Components/Buttons/Button_custom';
import Button_refresh from '../../Components/Buttons/Button_refresh';
import html2canvas from 'html2canvas';
import { FixedSizeGrid as TodolistGrid } from 'react-window';
import { hexToRgb, fontColor_dependBg } from '../../Components/ColorTool';
import { toast } from 'react-toastify';
import useSelect from '../../Hooks/useSelect';
import useInput from '../../Hooks/useInput';
import Select from '../../Components/Select';
import Input from '../../Components/Input';

const Whammy = require('whammy/whammy');

const UPDATE_EXISTTOGGLE = gql`
  mutation update_existToggle($email: String!, $existToggle: Boolean!) {
    update_existToggle(email: $email, existToggle: $existToggle)
  }
`;

const ClockBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  padding-top: 27px;
  padding-right: 160px;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TodayTime = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  padding-top: 131px;
  padding-left: 107px;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => props.theme.skyBlue};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TodayTime_total = styled(TodayTime)`
  padding-top: 146px;
  padding-left: 129px;
  color: black;
`;

const TodayPercent = styled(TodayTime)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 25px;
  margin-top: 87px;
  margin-left: 101px;
  padding: 0;
  width: 100px;
  height: 50px;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 960px;
  height: 500px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Wrapper_b = styled.div`
  display: flex;
  flex-direction: row;
  width: 960px;
  height: 150px;
  margin-top: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const TodoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 470px;
  height: 130px;
  margin: 10px 0 10px 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ScheStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 130px;
  margin: 10px 0 10px 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ControlWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 130px;
  margin: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ControlTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 85px;
  margin-bottom: 10px;
  /* border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}; */
`;

const ControlBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 270px;
  height: 35px;
  padding-top: 3px;
  /* border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}; */
`;

const VideoBox = styled.video`
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
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const DonutWrap = styled.div`
  position: relative;
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
  margin-left: 10px;
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

const AvatarDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 15px;
`;

const SetDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px 0 0;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 460px !important;
    height: 250px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(Popup)`
  &-content {
    width: 470px !important;
    height: 130px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const SetContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SetContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const RefreshInputWrap = styled.div`
  width: 70px;
  height: 30px;
`;

const StatusSpan = styled.span`
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const IndiTodoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-left: ${(props) => (props.isOdd ? '12px' : '18px')};
  /* border: ${(props) => props.theme.boxBorder};
  border-color: black; */
`;

const RoundTodo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;
  height: 32px;
  border-radius: 16px;
  padding: 0 5px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  /* border: ${(props) => props.theme.boxBorder};
  border-color: black; */
`;

const RoundNameDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100%;
  font-weight: 600;
`;

const RoundNameDiv2 = styled(RoundNameDiv)`
  width: 100%;
`;

const NewTodoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 40px;
`;

const NewTopDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const NewBottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: 123px;
  height: 35px;
`;

const NewScheContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 160px;
  height: 25px;
  margin-bottom: 5px;
`;

const SelectInL = styled.div`
  width: 100px;
  height: 25px;
  margin-right: 10px;
`;

const SelectInR = styled.div`
  width: 50px;
  height: 25px;
`;

const InputWrapper = styled.div`
  margin-left: 10px;
  width: 225px;
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
let target_min = 0;
let target_hour = 0;
let total_min = 0;
let total_hour = 0;
//영상처리
let time = new Date().getTime();
let interval = 0;
let decision = [true, true, true, true, true, true];
let detection_area = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
];
let finalDecision = 1; //1.공부 2. 부재중 3. 잠
let timeCount = 0;

export default ({
  myInfoData,
  networkStatus,
  autoSwitch,
  refreshBool,
  myInfoRefetch,
  refreshTerm,
  TermChange,
  studyBool,
  setStudyBool,
  todolistData,
  todolistRefetch,
  subjectData,
  deleteTodolistMutation,
  finishTodolistMutation,
  addTodolistMutation,
  startScheduleMutation,
  stopScheduleMutation,
  todolistName,
  newTodoView,
  setNewTodoView,
  scheduleTitle,
}) => {
  const [defaultMin, setDefaultMin] = useState(30);
  const fiveStepMin = (value) => value >= 5 && value % 5 === 0;
  const scheduleTerm = useInput(defaultMin);
  const [modelPose, setModelPose] = useState(null);
  const [modelDetect, setModelDetect] = useState(null);
  // const [modelFace, setModelFace] = useState(null)
  // const [modelFaceMatcher, setModelFaceMatcher] = useState(null)
  const [detectButton, setDetectbutton] = useState(true);
  const [poseButton, setPosebutton] = useState(true);
  // const [faceButton, setFacebutton] = useState(true)

  const [Mutation, setMutation] = useState(true);

  const [cameraLoad, setCameraLoad] = useState(false);
  const [modelLoad, setModelLoad] = useState(false);

  const video1 = useRef();
  // const canvas1 = createRef();

  const [ctx, setCtx] = useState();
  const [existToggleMutation] = useMutation(UPDATE_EXISTTOGGLE);

  // todolist 미완료&북마크 된거 구분
  let todolistData_new = [];
  todolistData.map((todolist) => {
    if (!todolist.finish && todolist.subject.bookMark) {
      todolistData_new.push(todolist);
    }
  });
  // todolistData_new 오름차순 정렬 (만든 순서대로는 백앤드에서 이미 반영)
  todolistData_new.sort(function (a, b) {
    return a.subject.name < b.subject.name
      ? -1
      : a.subject.name > b.subject.name
      ? 1
      : 0;
  });
  // todolistData_new Task 없음이 위로오게
  todolistData_new.sort(function (a, b) {
    const word = 'TASK 없음';
    return a.subject.name === word && b.subject.name !== word
      ? -1
      : a.subject.name !== word && b.subject.name === word
      ? 1
      : 0;
  });

  // 북마크 된 TASK(subject)
  let task_tmp = subjectData.map((subject) => {
    if (subject.bookMark) {
      return subject;
    }
  });
  task_tmp = task_tmp.filter(function (el) {
    return el != undefined;
  });
  // TASK(subject) 오름차순 정렬
  task_tmp.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  const listName_tmp = task_tmp.map((List) => `${List.name}`);
  const listId_tmp = task_tmp.map((List) => `${List.id}`);
  const mySubjectList = useSelect(
    ['TASK 없음', ...listName_tmp],
    ['', ...listId_tmp],
  );
  const mySubjectList2 = useSelect(
    ['TASK 없음', ...listName_tmp],
    ['', ...listId_tmp],
  );
  const stateList = useSelect(['자습', '인강'], ['자습', '인강']);

  const onImgSave = () => {
    const saveAs = (uri, filename) => {
      var link = document.createElement('a');
      console.log(link);
      if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    };

    html2canvas(document.querySelector('#capture')).then((canvas) => {
      // document.body.appendChild(canvas);
      saveAs(canvas.toDataURL('image/png'), 'capture-test.png');
    });
  };

  const maxTimeCal = (nowDate) => {
    let maxTermMin = 0;
    const totalMin_now =
      Math.floor((nowDate.getHours() * 60 + nowDate.getMinutes()) / 5) * 5;

    // 오늘 다음 스케줄이 있으면 부터
    if (nextScheduleIndex !== -1) {
      const nextSchedule = scheduleList_selectDay[nextScheduleIndex];
      const nextDate = new Date(nextSchedule.start);
      // 5분 단위 외 찌꺼기 시간 버림
      const totalMin_next = nextDate.getHours() * 60 + nextDate.getMinutes();
      maxTermMin = totalMin_next - totalMin_now;
    } else {
      //24시간은 1440분
      maxTermMin = 1440 - totalMin_now;
    }
    return maxTermMin;
  };

  const onStopSchedule = async () => {
    // 업데이트 오래걸릴 수 있어 toast 위로
    toast.info('현재 스케줄을 마치는 중...');
    // 스케줄 데이터르 최신으로 업데이트 후 현재 진행중인 스케줄 확인
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex === -1) {
      alert('현재 진행 중인 스케줄이 없습니다.');
      return;
    }
    // 끝나는 시간 계산
    const end_origin = new Date();
    const end = new Date();
    end.setTime(end_origin.getTime());
    end.setSeconds(0);
    end.setMilliseconds(0);
    end.setMinutes(Math.floor(end.getMinutes() / 5) * 5);
    // 스케줄 시작과 지금 사이가 0~5 사이면 스케줄을 그냥 삭제
    let deleteBool = false;
    const start_schedule = new Date(
      scheduleList_selectDay[nowScheduleIndex].start,
    );
    if (end_origin.getTime() - start_schedule.getTime() < 300000) {
      if (
        window.confirm(
          '현재 스케줄이 시작된 지 5분 이내여서 삭제됩니다.\n그래도 스케줄을 멈추시겠습니까?',
        ) === true
      ) {
        deleteBool = true;
      } else {
        return;
      }
    }

    try {
      const {
        data: { stopSchedule_study },
      } = await stopScheduleMutation({
        variables: {
          scheduleId: scheduleList_selectDay[nowScheduleIndex].id,
          end,
          deleteBool,
        },
      });
      if (!stopSchedule_study) {
        alert('현재 스케줄을 마칠 수 없습니다.');
      } else {
        await myInfoRefetch();
        toast.success('현재 스케줄을 마쳤습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onStartSchedule = async () => {
    // 5분 단위 최소 5분 검증
    if (scheduleTerm.value < 5) {
      alert('스케줄을 시작하기 위한 최소 시간은 5분입니다.');
      return;
    } else if (scheduleTerm.value % 5 !== 0) {
      alert('스케줄 시간은 5분 단위로 입력해주세요.\n예) 5분, 10분, 15분...');
      return;
    }
    // 업데이트 오래걸릴 수 있어 toast 위로
    toast.info('새로운 스케줄을 시작 중...');
    // 스케줄 데이터르 최신으로 업데이트 후 현재 진행중인 스케줄 확인
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex !== -1) {
      alert(
        '현재 진행 중인 스케줄이 있습니다.\n현재 스케줄 마무리 후 시도해주세요.',
      );
      return;
    }
    // 사전 점검
    if (scheduleTitle.value === '') {
      alert('To Do List를 입력하세요.');
      return;
    }
    if (scheduleTitle.value.includes('/')) {
      alert(
        "To Do List는 1개만 입력 가능합니다.\n즉, '/'는 입력이 불가능합니다.",
      );
      return;
    }
    // 입력 시간이 최대 시간이내 인지 점검
    const nowDate = new Date();
    const maxTime = maxTimeCal(nowDate);
    if (maxTime < scheduleTerm.value) {
      alert(`현재 가능한 최대 설정 시간은 ${maxTime}분 입니다.`);
      scheduleTerm.setValue(maxTime);
      return;
    }
    // todolist 중복 체크
    const findTodo = (i) =>
      i.subject.id === mySubjectList2.option && i.name === scheduleTitle.value;
    const existIndex = todolistData_new.findIndex(findTodo);
    const existTodo = existIndex === -1 ? false : true;
    // 입력 시간 계산
    const start = new Date();
    start.setTime(nowDate.getTime());
    start.setSeconds(0);
    start.setMilliseconds(0);
    start.setMinutes(Math.floor(start.getMinutes() / 5) * 5);
    const end = new Date();
    end.setTime(start.getTime() + scheduleTerm.value * 60000);

    try {
      const {
        data: { startSchedule_study },
      } = await startScheduleMutation({
        variables: {
          title: scheduleTitle.value,
          start,
          end,
          totalTime: (end.getTime() - start.getTime()) / 1000,
          calendarId: mySubjectList2.option,
          state: stateList.option,
          existTodo,
        },
      });
      if (!startSchedule_study) {
        alert('스케줄을 시작할 수 없습니다.');
      } else {
        await myInfoRefetch();
        await todolistRefetch();
        mySubjectList2.setOption('');
        stateList.setOption('자습');
        scheduleTitle.setValue('');
        scheduleTerm.setValue(30);
        toast.success('새로운 스케줄이 시작되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onTodolistAdd = async () => {
    if (todolistName.value === '') {
      alert('내용을 입력하세요.');
      return;
    }
    try {
      toast.info('새로운 To Do List를 추가 중...');
      const {
        data: { addTodolist },
      } = await addTodolistMutation({
        variables: {
          name: todolistName.value,
          subjectId: mySubjectList.option,
        },
      });
      if (!addTodolist) {
        alert('To Do List를 추가할 수 없습니다.');
      } else {
        await todolistRefetch();
        toast.success('새로운 To DO List가 추가되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      setNewTodoView(false);
    }
  };

  const onTodolistDelete = async (todolistId) => {
    try {
      toast.info('To Do List를 제거 중...');
      const {
        data: { deleteTodolist },
      } = await deleteTodolistMutation({
        variables: {
          todolistId,
        },
      });
      if (!deleteTodolist) {
        alert('To Do List를 제거할 수 없습니다.');
      } else {
        await todolistRefetch();
        toast.success('To DO List가 제거되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onTodolistFinish = async (todolistId) => {
    try {
      toast.info('To Do List를 완료 중...');
      const {
        data: { finishTodolist },
      } = await finishTodolistMutation({
        variables: {
          todolistId,
        },
      });
      if (!finishTodolist) {
        alert('To Do List를 완료할 수 없습니다.');
      } else {
        await todolistRefetch();
        toast.success('To DO List가 완료되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  function updateTime() {
    const newTime = new Date().getTime();
    interval = interval + (newTime - time);
    console.log(interval / 1000);

    time = newTime;
  }

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
  };

  const loadCtx = async (canvas) => {
    const temp = canvas.current.getContext('2d');
    setCtx(temp);
  };

  const detectFromVideoFrame = async (video) => {
    try {
      // const ctx = canvas.current.getContext('2d');
      // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴

      const posePredictions = await modelPose.estimateMultiplePoses(video, {
        flipHorizontal: false,
        maxDetections: 1,
        minPoseConfidence: 0.15,
        minPartConfidence: 0.1,
        scoreThreshold: 0.5,
        nmsRadius: 30,
      });

      const objectPredictions = await modelDetect.detect(video);
      const personDetections = objectPredictions.filter(
        (p) => p.class === 'person',
      );

      // showDetections(posePredictions, personDetections);
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

  // const showDetections = (posePredictions, objectPredictions) => {
  //   console.log('Show detect');

  //   // const ctx = canvas.current.getContext('2d');
  //   const font = '20px Arial';
  //   ctx.font = font;
  //   if (poseButton) {
  //     posePredictions.forEach((poses) => {
  //       const area_data = 3;
  //       ctx.strokeStyle = '0F4C81';
  //       ctx.lineWidth = 4;

  //       const area = new Array(area_data);
  //       for (var i = 0; i < area.length; i++) {
  //         area[i] = false;
  //       }
  //       //   const img_width = video.webcamVideoElement.width
  //       const img_width = canvas1.current.width;
  //       ctx.strokeStyle = '#0F4C81';
  //       ctx.lineWidth = 4;
  //       for (var j = 0; j < poses.keypoints.length; j++) {
  //         ctx.strokeRect(
  //           poses.keypoints[j].position.x,
  //           poses.keypoints[j].position.y,
  //           1,
  //           1,
  //         );
  //         area[
  //           Math.floor(
  //             (poses.keypoints[0].position.x / img_width) * area.length,
  //           )
  //         ] = true;
  //       }
  //     });
  //   }
  //   if (detectButton) {
  //     objectPredictions.forEach((prediction) => {
  //       ctx.strokeStyle = '#0F4C81';
  //       ctx.lineWidth = 4;
  //       ctx.strokeRect(...prediction.bbox);

  //       const x = prediction.bbox[0];
  //       const y = prediction.bbox[1];
  //       const height = prediction.bbox[3];
  //       const label = prediction.class;
  //       // console.log(prediction.class)
  //       ctx.fillStyle = '#0F4C81';
  //       const textWidth = ctx.measureText(label).width;
  //       const textHeight = parseInt(font, 10);
  //       ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
  //       // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

  //       ctx.fillStyle = '#FFFFFF';
  //       ctx.fillText(label, x, y + textHeight);
  //       // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
  //     });
  //   }
  // };
  const createPredictionArray = (prediction) => {
    const bbox = prediction.bbox;
    const len_x = bbox[2];
    const len_y = bbox[3];
    return len_x; //x값을 이용하여 가장 크게 잡힌 객체 감지
  };

  const ConcludeFinaldecision = (posePredictions, objectPredictions) => {
    // 1. 모든 사람 인식 결과를 array 데이터로 변환
    // 2. 가장큰 사람 인식 결과 판단
    // 3. objectPrediction에 판단 결과 저장 1. 공부중 2. 부재중 3. 잠
    let result = [];
    let maxBboxArea = 100000;
    if (objectPredictions.length > 0) {
      const temp = objectPredictions.map(createPredictionArray);
      const maxObject = objectPredictions[temp.indexOf(Math.max(...temp))];
      maxBboxArea = maxObject.bbox[2] * maxObject.bbox[3];
      console.log(maxBboxArea);
      detection_area = detection_area.slice(1);
      detection_area = [...detection_area, maxBboxArea];
    }
    if (
      objectPredictions.length > 0 &&
      posePredictions.length > 0 &&
      maxBboxArea > 90000
    ) {
      result = true;
    } else {
      result = false;
    }

    decision = decision.slice(1);
    decision = [...decision, result];

    const temp = decision.reduce((obj, value, index, array) => {
      if (obj.hasOwnProperty(value)) {
        obj[value] += 1;
      } else {
        obj[value] = 1;
      }
      return obj;
    }, {});

    if (temp.true > 2) {
      finalDecision = 1; //공부
      console.log(finalDecision);
      setStudyBool(true);
    } else {
      finalDecision = 2; //부재중
      console.log(finalDecision);
      setStudyBool(false);
    }
  };
  useInterval(() => {
    // console.log(timeCount);
    updateTime();
    if (
      modelPose !== null &&
      modelDetect !== null
      // canvas1.current !== null &&
      // canvas1 !== null
    ) {
      if (timeCount % 10 === 1) {
        detectFromVideoFrame(video1.current);
        console.log(decision);
        timeCount = timeCount + 1;
      } else {
        // const ctx = canvas1.current.getContext('2d');
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // ctx.drawImage(
        //   video1.current,
        //   0,
        //   0,
        //   ctx.canvas.width,
        //   ctx.canvas.height,
        // );

        timeCount = timeCount + 1;
      }
      if (Mutation === true && interval > 59 * 1000) {
        interval = interval - 59 * 1000;
        if (finalDecision === 1) {
          console.log('Final decision : true');
          existToggleMutation({
            variables: { email: userEmail, existToggle: true },
          });
        } else if (finalDecision === 2) {
          console.log('Final decision : false');
          existToggleMutation({
            variables: { email: userEmail, existToggle: false },
          });
        }
      }
    }
  }, 1000);

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

  // useMouseLeave(donleaveme)

  useEffect(() => {
    // LoadCamera();
    // LoadModel();
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

    // 현재 TASK 찾기
    const nowDate = new Date();
    const findShedule = (i) =>
      new Date(i.start) <= nowDate && new Date(i.end) > nowDate;
    nowScheduleIndex = scheduleList_selectDay.findIndex(findShedule);
    // 다음 TASK 찾기
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
          : 'TASK 없음',
      );
      // 중복되는 TASK 인덱스 체크
      if (duplIndex === -1) {
        schedule_label.push(
          scheduleList_selectDay[j].subject
            ? scheduleList_selectDay[j].subject.name
            : 'TASK 없음',
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
    // 스케줄(TASK) 시간 퍼센트 계산
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
            rgbBox.push('#EAD6D4'); // 분홍색 지금 이전 시간
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
            rgbBox.push('#EAD6D4'); // 분홍색 지금 이전 시간
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
          rgbBox.push('#7BA9EB'); // 스카이 블루 학습시간
          break; // 학습시간으로 끝남
        } else {
          const studyTime = slicedTimes.slice(0, index_tmp2);
          slicedTimeBox.push(studyTime);
          rgbBox.push('#7BA9EB'); // 스카이 블루 학습시간
          slicedTimes = slicedTimes.slice(index_tmp2);
        }
      }
    }
    donutData = slicedTimeBox.map((a) => a.length * 5);
    const targetTime = SumArray(taskArray_scheduleT) * 60;
    if (targetTime === 0) {
      donutPercent = 0;
    } else {
      donutPercent = ((todayTime.existTime / targetTime) * 100).toFixed(0);
    }
    //도넛 안 시간 계산
    let targetTime_min = targetTime / 60;
    let existTime_min = todayTime.existTime / 60;
    target_hour = String(Math.floor(targetTime_min / 60));
    targetTime_min = targetTime_min - target_hour * 60;
    target_min = String(Math.floor(targetTime_min));
    total_hour = String(Math.floor(existTime_min / 60));
    existTime_min = existTime_min - total_hour * 60;
    total_min = String(Math.floor(existTime_min));
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
    // CalLoading.current = false;
  }

  const todolistRow = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 2 + columnIndex;
    if (index === 0) {
      return (
        <IndiTodoWrap
          key={index}
          style={style}
          isOdd={Boolean(columnIndex % 2)}
        >
          <RoundTodo
            bgColor={'#DDE7E9'}
            color={'black'}
            onClick={() => {
              setNewTodoView(true);
            }}
          >
            <RoundNameDiv2>To Do List 추가 👆</RoundNameDiv2>
          </RoundTodo>
        </IndiTodoWrap>
      );
    } else {
      if (todolistData_new[index - 1] === undefined) {
        return <div></div>;
      }
      const rgb_tmp = hexToRgb(todolistData_new[index - 1].subject.bgColor);
      const fontColor = fontColor_dependBg(rgb_tmp);
      return (
        <IndiTodoWrap
          key={index}
          style={style}
          isOdd={Boolean(columnIndex % 2)}
        >
          <RoundTodo
            bgColor={todolistData_new[index - 1].subject.bgColor}
            color={fontColor}
            onClick={() => {
              mySubjectList2.setOption(todolistData_new[index - 1].subject.id);
              scheduleTitle.setValue(todolistData_new[index - 1].name);
            }}
          >
            <RoundNameDiv>{todolistData_new[index - 1].name}</RoundNameDiv>
            <Flag
              fill={fontColor}
              margin={'0 5px 0 0'}
              onClick={() => onTodolistFinish(todolistData_new[index - 1].id)}
            />
            <Delete
              fill={fontColor}
              onClick={() => {
                onTodolistDelete(todolistData_new[index - 1].id);
              }}
            />
          </RoundTodo>
        </IndiTodoWrap>
      );
    }
  };

  return (
    <TopWrap>
      <Wrapper id="capture">
        <VideoWrap>
          <div>
            <VideoBox ref={video1} playsInline autoPlay muted />
          </div>
        </VideoWrap>
        <GraphDiv>
          <HeaderDiv>
            <AvatarDiv>
              {studyBool ? (
                <>
                  <Study_true />
                  <StatusSpan>학습중</StatusSpan>
                </>
              ) : (
                <>
                  <Study_false />
                  <StatusSpan>부재중</StatusSpan>
                </>
              )}
            </AvatarDiv>
            <SetDiv>
              <button
                onClick={() => {
                  onImgSave();
                }}
              >
                test
              </button>
              <Button_refresh
                onClick={() => {
                  myInfoRefetch();
                }}
              />
              <PopupCustom
                trigger={
                  <div style={{ cursor: 'pointer' }}>
                    <Setting />
                  </div>
                }
                closeOnDocumentClick={false}
                modal
              >
                {(close) => {
                  return (
                    <PBody>
                      <PTitle text={'학습 세팅'} />
                      <SetContentWrap>
                        <SetContentBox>
                          자동 새로고침 on/off :　
                          <Switch
                            on={true}
                            off={false}
                            value={refreshBool}
                            onChange={autoSwitch}
                          />{' '}
                        </SetContentBox>
                        <SetContentBox>
                          자동 새로고침 간격 :　
                          <RefreshInputWrap>
                            <Input_100
                              placeholder={''}
                              {...refreshTerm}
                              type={'number'}
                            />
                          </RefreshInputWrap>
                          초
                          <Button_custom
                            text={'적용'}
                            onClick={() => {
                              TermChange();
                            }}
                          />
                        </SetContentBox>
                      </SetContentWrap>
                      <ButtonDiv>
                        <PopupButton_solo
                          type="button"
                          onClick={() => {
                            close();
                          }}
                          text={'닫기'}
                        />
                      </ButtonDiv>
                    </PBody>
                  );
                }}
              </PopupCustom>
            </SetDiv>
          </HeaderDiv>
          <DonutWrap>
            <DonutChart_today
              data={donutData}
              color={rgbBox}
              title={'Today Study Log'}
              labels={[
                '학습',
                '학습 외 ' + '　' + '　' + '　' + '　',
                '나머지',
              ]}
            />
            <ClockBox>
              <Clock24 />
            </ClockBox>
            <TodayTime>
              {total_hour.length === 1 ? '0' + total_hour : total_hour}h
              {total_min.length === 1 ? '0' + total_min : total_min}m
            </TodayTime>
            <TodayTime_total>
              / {target_hour.length === 1 ? '0' + target_hour : target_hour}h
              {target_min.length === 1 ? '0' + target_min : target_min}m
            </TodayTime_total>
            <TodayPercent>{donutPercent}%</TodayPercent>
          </DonutWrap>
          <NowNextWrap>
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
            <BarWrap>
              <RowBarChart_now
                title1={nowTitle1}
                title2={nowTitle2}
                data_1={nowScheduleTime}
                data_2={nowScheduleTimeT}
                scheduleColor={nowScheduleColor}
              />
            </BarWrap>
          </NowNextWrap>
        </GraphDiv>
      </Wrapper>
      <Wrapper_b>
        <TodoWrap>
          {newTodoView ? (
            <NewTodoDiv>
              <NewTopDiv>
                <SelectWrapper>
                  <Select {...mySubjectList} id={'mySubject_id_study'} />
                </SelectWrapper>
                <InputWrapper>
                  <Input
                    placeholder={'내용 (예: 1단원 암기)'}
                    bgColor={'white'}
                    {...todolistName}
                  />
                </InputWrapper>
              </NewTopDiv>
              <NewBottomDiv>
                <Button_custom
                  text={'추가'}
                  width={'100px'}
                  height={'35px'}
                  bgColor={'#0F4C82'}
                  color={'white'}
                  margin={'0 60px 0 0'}
                  onClick={() => {
                    onTodolistAdd();
                  }}
                />
                <Button_custom
                  text={'닫기'}
                  width={'100px'}
                  height={'35px'}
                  bgColor={'#0F4C82'}
                  color={'white'}
                  margin={'0'}
                  onClick={() => {
                    setNewTodoView(false);
                  }}
                />
              </NewBottomDiv>
            </NewTodoDiv>
          ) : (
            <TodolistGrid
              height={130}
              width={470}
              columnWidth={225}
              rowHeight={44}
              rowCount={Math.floor(todolistData_new.length / 2) + 1}
              columnCount={2}
            >
              {todolistRow}
            </TodolistGrid>
          )}
        </TodoWrap>
        <ScheStart>
          <NewScheContent>
            <SelectInL>
              <Select {...mySubjectList2} id={'mySubject_id_study'} />
            </SelectInL>
            <SelectInR>
              <Select {...stateList} id={'mySubject_state_study'} />
            </SelectInR>
          </NewScheContent>
          <NewScheContent>
            <Input
              placeholder={'To Do list (예: 1장 복습)'}
              height={'25px'}
              bgColor={'white'}
              {...scheduleTitle}
            />
          </NewScheContent>
          <NewScheContent>
            <Input_100
              placeholder={''}
              {...scheduleTerm}
              type={'number'}
              step={5}
              width={'80px'}
              height={'25px'}
              bgColor={'white'}
            />
            분&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button_custom
              text={'Max'}
              margin={'0'}
              width={'50px'}
              height={'25px'}
              onClick={() => {
                const maxTime_tmp = maxTimeCal(new Date());
                scheduleTerm.setValue(maxTime_tmp);
              }}
            />
          </NewScheContent>
          <Button_custom
            text={'스케줄 시작'}
            width={'160px'}
            height={'25px'}
            margin={'0'}
            bgColor={'#0F4C82'}
            color={'white'}
            padding={'0'}
            onClick={() => {
              onStartSchedule();
            }}
          />
        </ScheStart>
        <ControlWrap>
          <ControlTop></ControlTop>
          <ControlBottom>
            <Button_custom
              text={'현재 스케줄 마침'}
              width={'120px'}
              height={'25px'}
              margin={'0 10px 0 0'}
              bgColor={'#DB4437'}
              color={'black'}
              padding={'0'}
              onClick={() => {
                onStopSchedule();
              }}
            />
            <Button_custom
              text={'다음 스케줄 당김'}
              width={'120px'}
              height={'25px'}
              margin={'0'}
              bgColor={'#0F4C82'}
              color={'white'}
              padding={'0'}
              onClick={() => {
                // onStartSchedule();
              }}
            />
          </ControlBottom>
        </ControlWrap>
      </Wrapper_b>
    </TopWrap>
  );
};
