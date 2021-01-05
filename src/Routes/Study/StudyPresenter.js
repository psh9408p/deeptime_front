import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
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
  Study_true,
  Study_false,
  Flag,
  Delete,
  Add_12,
  Logo,
} from '../../Components/Icons';
import { Clock24 } from '../../Components/Image';
import Countdown from 'react-countdown';
import Switch from 'react-input-switch';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupButton from '../../Components/Buttons/PopupButton';
import FatText from '../../Components/FatText';
import Input_100 from '../../Components/Input_100';
import Loader from '../../Components/Loader';
import Button_custom from '../../Components/Buttons/Button_custom';
import {
  Button_refresh,
  Button_capture,
  Button_setting,
  Button_control,
} from '../../Components/Buttons/Button_click';
import html2canvas from 'html2canvas';
import {
  FixedSizeGrid as ListGrid,
  FixedSizeList as FixedList,
} from 'react-window';
import { hexToRgb, fontColor_dependBg } from '../../Components/ColorTool';
import { toast } from 'react-toastify';
import useSelect from '../../Hooks/useSelect';
import useInput from '../../Hooks/useInput';
import Select from '../../Components/Select';
import Input from '../../Components/Input';
import videoCanvas from 'video-canvas';
import Avatar from '../../Components/Avatar';
import PopupButton_solo from '../../Components/Buttons/PopupButton_solo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UPDATE_EXISTTOGGLE = gql`
  mutation update_existToggle($email: String!, $existToggle: Boolean!) {
    update_existToggle(email: $email, existToggle: $existToggle)
  }
`;

const ClockBox = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  z-index: 10;
  display: flex;
  margin-top: 113.5px;
  margin-left: 534px;
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
  margin-top: 188px;
  margin-left: 599.5px;
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.skyBlue};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 30px;
`;

const TodayTime_total = styled(TodayTime)`
  margin-top: 218px;
  margin-left: 604px;
  font-size: 20px;
  color: black;
  width: 100px;
  height: 30px;
`;

const TodayPercent = styled(TodayTime)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 25px;
  margin-top: 167px;
  margin-left: 588px;
  padding: 0;
  width: 97px;
  height: 50px;
`;

const AllWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 960px;
  height: 500px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Wrapper_b = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 500px;
  height: 150px;
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
  /* border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}; */
`;

const ControlTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 80px;
  margin-bottom: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ControlBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 40px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ControlTop1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  width: 100%;
  height: 50%;
`;

const ControlTop2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

const VideoBox = styled.video`
  position: absolute;
  z-index: 2;
  width: 450px;
  height: 340px;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-top: 120px;
`;

const CanvasBox = styled.canvas`
  position: absolute;
  z-index: 3;
  width: 450px;
  height: 340px;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-top: 120px;
`;

const AvatarBox = styled.div`
  display: ${(props) => props.display};
  justify-content: center;
  position: absolute;
  z-index: 1;
  margin-top: 40px;
  width: 100%;
  height: 100%;
`;

const AvatarBoxCover = styled.div`
  display: ${(props) => props.display};
  justify-content: center;
  position: absolute;
  z-index: 3;
  margin-top: 40px;
  width: 100%;
  height: 100%;
`;

const WhiteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${(props) => props.theme.bgColor}; */
  font-size: 22px;
  font-weight: 600;
  width: 100%;
  height: 110px;
`;

const VideoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 470px;
  height: 480px;
  margin: 10px 0 10px 10px;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  font-weight: 600;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const VideoText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px 0;
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
  /* position: relative; */
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
`;

const NextTimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50%;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 10px;
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

const DDayDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 0 0 15px;
  font-weight: 800;
`;

const DName = styled.div`
  font-size: 14px;
`;

const DNumber = styled.div`
  font-size: 28px;
  color: ${(props) => props.theme.classicBlue};
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
    height: 440px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 300px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const PBody2 = styled(PBody)`
  width: 400px;
`;

const PBody3 = styled(PBody)`
  width: 500px;
  padding: 0;
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
  height: 35px;
  border-radius: 16px;
  padding: 0 5px 0 10px;
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
  font-weight: 600;
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

const IndiWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px 0 5px;
  span {
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
    font-weight: normal;
  }
`;

const AddDiv = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 60px;
  height: 50px;
  margin-bottom: 25px;
`;

const PofileLink = styled(Link)`
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-bottom: 25px;
  border-radius: 50%;
`;

const BlackBack = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 50%;
`;

const CustomPopup = styled.div`
  position: absolute;
  z-index: 11;
  width: 420px;
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
`;

const NonFollow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  height: 300px;
  margin-bottom: 20px;
  color: #7f8c8d;
`;

const IndiviList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

const IndiviName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 215px;
  font-weight: 600;
  margin-left: 10px;
  span {
    margin-top: 3px;
    font-weight: normal;
    color: #7f8c8d;
  }
`;

const IndiviLink = styled(Link)`
  cursor: pointer;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding-left: 10px;
  border-radius: 50%;
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

let scheduleList_selectDay = [];
let scheduleList_selectDay_length = 0;
let taskArray_schedule = [];
let taskArray_scheduleT = [];
let donutData = [];
let donutPercent = 0;
let rgbBox = [];
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
let detection_area = Array.from({ length: 18 }, (_, i) => i + 1);
let finalDecision = 1; //1.공부 2. 부재중 3. 잠
let timeCount = 0;

export default ({
  myInfoData,
  networkStatus,
  myInfoRefetch,
  studyBool,
  setStudyBool,
  todolistData,
  todolistRefetch,
  subjectData,
  subjectRefetch,
  deleteTodolistMutation,
  finishTodolistMutation,
  addTodolistMutation,
  startScheduleMutation,
  stopScheduleMutation,
  pullScheduleMutation,
  cutScheduleMutation,
  extensionScheduleMutation,
  editStudySetMutation,
  todolistName,
  newTodoView,
  setNewTodoView,
  scheduleTitle,
  startPolling,
  stopPolling,
  popupView,
  setPopupView,
  goWithMutation,
  onLoading,
  setOnLoading,
  coverView,
  setCoverView,
  reCount,
  setReCount,
}) => {
  // 팔로우한 각 유저 데이터에 알맞은 createdAt 넣어주기(내가가 언제 팔로우 했는지)
  for (let i = 0; i < myInfoData.followDates.length; i++) {
    const findUser = (a) => a.id === myInfoData.followDates[i].followId;
    const tmpIndex = myInfoData.following.findIndex(findUser);
    const createdDate = new Date(myInfoData.followDates[i].createdAt);
    myInfoData.following[tmpIndex].followingTime = createdDate.getTime();
    // 동행자인지 정보 넣어주기
    myInfoData.following[tmpIndex].goWith = myInfoData.followDates[i].goWith;
    myInfoData.following[tmpIndex].followDateId = myInfoData.followDates[i].id;
  }
  // 팔로우한 날짜 순으로 정렬 최신이 위로
  myInfoData.following.sort(function (a, b) {
    return b.followingTime - a.followingTime;
  });

  const [followingLoad, setFollowingLoad] = useState(
    new Array(myInfoData.following.length).fill(false),
  );
  const [dDate, setDDate] = useState(
    myInfoData.studyDefaultSet.dDate
      ? new Date(myInfoData.studyDefaultSet.dDate)
      : new Date(),
  );
  // dDay 계산
  const nowDate_tmp = new Date();
  const gap = nowDate_tmp.getTime() - dDate.getTime();
  const realDDay = Math.floor(gap / (1000 * 60 * 60 * 24));

  const prevent_float = (value) => value % 1 === 0;
  const max10 = (value) => value.length < 16;
  const [nonScheduleRecord, setNonScheduleRecord] = useState(
    myInfoData.studyDefaultSet.nonScheduleRecord,
  );
  const [autoRefresh, setAutoRefresh] = useState(
    myInfoData.studyDefaultSet.autoRefresh,
  );
  const [timelapse, setTimelapse] = useState(
    myInfoData.studyDefaultSet.timelapseRecord,
  );
  const [dDayOn, setDDayOn] = useState(myInfoData.studyDefaultSet.dDayOn);
  const dDateName = useInput(myInfoData.studyDefaultSet.dDateName, max10);
  const autoRefreshTerm = useInput(
    myInfoData.studyDefaultSet.autoRefreshTerm,
    prevent_float,
    undefined,
    true,
  );
  const startScheduleTerm = useInput(
    myInfoData.studyDefaultSet.startScheduleTerm,
    prevent_float,
    undefined,
    true,
  );
  const extensionTerm = useInput(
    myInfoData.studyDefaultSet.cutExtenTerm,
    prevent_float,
    undefined,
    true,
  );
  const startScheduleTerm_forSet = useInput(
    myInfoData.studyDefaultSet.startScheduleTerm,
    prevent_float,
    undefined,
    true,
  );
  const extensionTerm_forSet = useInput(
    myInfoData.studyDefaultSet.cutExtenTerm,
    prevent_float,
    undefined,
    true,
  );

  const timelapseSwitch = () => {
    if (timelapse) {
      setTimelapse(false);
    } else {
      setTimelapse(true);
    }
  };
  const recordSwitch = () => {
    if (nonScheduleRecord) {
      setNonScheduleRecord(false);
    } else {
      setNonScheduleRecord(true);
    }
  };
  const autoSwitch = () => {
    if (autoRefresh) {
      setAutoRefresh(false);
    } else {
      setAutoRefresh(true);
    }
  };
  const dDaySwitch = () => {
    if (dDayOn) {
      setDDayOn(false);
    } else {
      setDDayOn(true);
    }
  };

  // 영상 처리 변수
  const [modelPose, setModelPose] = useState(null);
  const [modelDetect, setModelDetect] = useState(null);
  const [Mutation, setMutation] = useState(true);

  const video1 = useRef();
  const canvas1 = useRef();

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
    const word = '과목 없음';
    return a.subject.name === word && b.subject.name !== word
      ? -1
      : a.subject.name !== word && b.subject.name === word
      ? 1
      : 0;
  });

  // 북마크 된 과목(subject)
  let task_tmp = subjectData.map((subject) => {
    if (subject.bookMark) {
      return subject;
    }
  });
  task_tmp = task_tmp.filter(function (el) {
    return el != undefined;
  });
  // 과목(subject) 오름차순 정렬
  task_tmp.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  // 과목 기타가 아래로오게
  task_tmp.sort(function (a, b) {
    const word = '기타';
    return a.name !== word && b.name === word
      ? -1
      : a.name === word && b.name !== word
      ? 1
      : 0;
  });

  const listName_tmp = task_tmp.map((List) => `${List.name}`);
  const listId_tmp = task_tmp.map((List) => `${List.id}`);
  const mySubjectList = useSelect([...listName_tmp], [...listId_tmp]);
  const mySubjectList2 = useSelect([...listName_tmp], [...listId_tmp]);
  const stateBox = ['자습', '강의'];
  const stateList = useSelect(stateBox, stateBox);

  const onImgSave = () => {
    // const ctx = canvas1.current.getContext('2d');
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.drawImage(video1.current, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴
    videoCanvas(video1.current, {
      canvas: canvas1.current,
    });

    const saveAs = (uri, filename) => {
      var link = document.createElement('a');
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

    const now_Date = new Date();
    const file_tail = moment(now_Date).format('YYMMDD_HHmmss');
    const target = document.querySelector('#capture');
    html2canvas(target, {
      width: target.clientWidth + 20,
      useCORS: true,
      // removeContainer: false,
    }).then((canvas) => {
      // document.body.appendChild(canvas);
      saveAs(
        canvas.toDataURL('image/png'),
        'deeptime_play_' + file_tail + '.png',
      );
    });
    // 팔로워 영역 임시 화면 꺼주기
    setCoverView(false);
    // 주기적으로 캐시 지우기위해 새로고침 30회 마다
    if (reCount === 29) {
      setTimeout(() => window.location.reload(), 1000);
    } else {
      setReCount(reCount + 1);
    }
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

  const onChangeLoad = (index, bool) => {
    let newArr = [...followingLoad];
    newArr[index] = bool;
    setFollowingLoad(newArr);
  };

  const onGoWith = async (index) => {
    try {
      onChangeLoad(index, true);
      const {
        data: { goWith },
      } = await goWithMutation({
        variables: {
          followDateId: myInfoData.following[index].followDateId,
          goWithBool: !myInfoData.following[index].goWith,
        },
      });
      if (!goWith) {
        alert('동행 정보를 변경할 수 없습니다.');
      } else {
        await myInfoRefetch();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      onChangeLoad(index, false);
    }
  };

  const onSaveSet = async () => {
    if (autoRefreshTerm.value < 60) {
      alert('자동 새로고침 최소 기간은 60초입니다.');
      autoRefreshTerm.setValue(60);
      return;
    }
    if (
      startScheduleTerm_forSet.value % 5 !== 0 ||
      startScheduleTerm_forSet.value < 5
    ) {
      alert(
        '스케줄 시작(생성) 기간은 최소 5분, 5분 단위로 입력해주세요.\n예) 5분, 10분, 15분...',
      );
      return;
    } else if (
      extensionTerm_forSet.value % 5 !== 0 ||
      extensionTerm_forSet.value < 5
    ) {
      alert(
        '스케줄 단축&연장 기간은 최소 5분, 5분 단위로 입력해주세요.\n예) 5분, 10분, 15분...',
      );
      return;
    }

    try {
      toast.info('기본값 세팅 적용 중...');
      const {
        data: { editStudySet },
      } = await editStudySetMutation({
        variables: {
          timelapseRecord: timelapse,
          nonScheduleRecord,
          autoRefresh,
          autoRefreshTerm: Number(autoRefreshTerm.value),
          startScheduleTerm: Number(startScheduleTerm_forSet.value),
          cutExtenTerm: Number(extensionTerm_forSet.value),
          dDayOn,
          dDateName: dDateName.value,
          dDate,
        },
      });
      if (!editStudySet) {
        alert('기본값 세팅을 적용할 수 없습니다.');
      } else {
        if (autoRefresh) {
          startPolling(autoRefreshTerm.value * 1000);
        } else {
          stopPolling();
        }
        startScheduleTerm.setValue(startScheduleTerm_forSet.value);
        extensionTerm.setValue(extensionTerm_forSet.value);
        await myInfoRefetch();
        toast.success('새로운 기본값 세팅을 적용하였습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onExtensionSchedule = async ({ close }) => {
    // 5분 단위 최소 5분 검증
    if (extensionTerm.value < 5) {
      alert('스케줄을 연장하기 위한 최소 시간은 5분입니다.');
      return;
    } else if (extensionTerm.value % 5 !== 0) {
      alert('연장 시간은 5분 단위로 입력해주세요.\n예) 5분, 10분, 15분...');
      return;
    }
    // 업데이트 오래걸릴 수 있어 toast 위로
    toast.info('현재 스케줄 연장 중...');
    // 스케줄 데이터르 최신으로 업데이트 후 현재 진행중인 스케줄 확인
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex === -1) {
      alert('현재 진행 중인 스케줄이 없습니다.');
      return;
    }
    // 최대 연장시간 점검
    const end = new Date(scheduleList_selectDay[nowScheduleIndex].end);
    const posibleMin = 1440 - (end.getHours() * 60 + end.getMinutes());
    if (end.getHours() === 0 && end.getMinutes() === 0) {
      alert('현재 스케줄은 더는 연장이 불가능합니다.');
      return;
    } else if (posibleMin < extensionTerm.value) {
      alert(`오늘 연장 가능한 최대 시간은 ${posibleMin}분입니다.`);
      extensionTerm.setValue(posibleMin);
      return;
    }
    // 연장시간
    const start = new Date(scheduleList_selectDay[nowScheduleIndex].start);
    let deleteArray = [];
    let cutId = '';
    let cutTotalTime = 0;
    end.setTime(end.getTime() + extensionTerm.value * 60000);
    // 삭제할 단축할 스케줄 계산
    for (var i = 0; i < scheduleList_selectDay.length; i++) {
      const start_tmp = new Date(scheduleList_selectDay[i].start);
      const end_tmp = new Date(scheduleList_selectDay[i].end);
      if (start < start_tmp && end >= end_tmp) {
        deleteArray.push({ id: scheduleList_selectDay[i].id });
      } else if (start < start_tmp && end > start_tmp) {
        cutId = scheduleList_selectDay[i].id;
        cutTotalTime = (end_tmp.getTime() - end.getTime()) / 1000;
      }
    }
    if (deleteArray.length !== 0 || cutId !== '') {
      if (
        window.confirm(
          '스케줄 연장 시 시간이 중복돼 단축(삭제)되는 스케줄이 존재합니다.\n그래도 스케줄 연장을 진행하시겠습니까?',
        ) === false
      ) {
        return;
      }
    }

    try {
      const {
        data: { extensionSchedule_study },
      } = await extensionScheduleMutation({
        variables: {
          scheduleId: scheduleList_selectDay[nowScheduleIndex].id,
          totalTime: (end.getTime() - start.getTime()) / 1000,
          end,
          cutId,
          cutTotalTime,
          deleteArray,
        },
      });
      if (!extensionSchedule_study) {
        alert('현재 스케줄을 연장할 수 없습니다.');
      } else {
        await myInfoRefetch();
        toast.success('현재 스케줄을 연장했습니다.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onCutSchedule = async ({ close }) => {
    // 5분 단위 최소 5분 검증
    if (extensionTerm.value < 5) {
      alert('스케줄을 단축하기 위한 최소 시간은 5분입니다.');
      return;
    } else if (extensionTerm.value % 5 !== 0) {
      alert('단축 시간은 5분 단위로 입력해주세요.\n예) 5분, 10분, 15분...');
      return;
    }
    // 업데이트 오래걸릴 수 있어 toast 위로
    toast.info('현재 스케줄 단축 중...');
    // 스케줄 데이터르 최신으로 업데이트 후 현재 진행중인 스케줄 확인
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex === -1) {
      alert('현재 진행 중인 스케줄이 없습니다.');
      return;
    }
    // 축소시 남은 시간 계산 5분 이하면 삭제 불리언 true
    let deleteBool = false;
    if (
      scheduleList_selectDay[nowScheduleIndex].totalTime / 60 -
        extensionTerm.value <
      5
    ) {
      if (
        window.confirm(
          '현재 스케줄이 5분 미만으로 축소돼 삭제됩니다.\n그래도 스케줄 단축을 진행하시겠습니까?',
        ) === true
      ) {
        deleteBool = true;
      } else {
        return;
      }
    }

    const start = new Date(scheduleList_selectDay[nowScheduleIndex].start);
    const end = new Date(scheduleList_selectDay[nowScheduleIndex].end);
    end.setTime(end.getTime() - extensionTerm.value * 60000);

    try {
      const {
        data: { cutSchedule_study },
      } = await cutScheduleMutation({
        variables: {
          scheduleId: scheduleList_selectDay[nowScheduleIndex].id,
          totalTime: deleteBool ? 0 : (end.getTime() - start.getTime()) / 1000,
          end,
          deleteBool,
        },
      });
      if (!cutSchedule_study) {
        alert('현재 스케줄을 단축할 수 없습니다.');
      } else {
        await myInfoRefetch();
        if (deleteBool) {
          toast.success('현재 스케줄을 삭제했습니다.');
        } else {
          toast.success('현재 스케줄을 단축했습니다.');
        }
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onPullSchedule = async ({ close }) => {
    // 업데이트 오래걸릴 수 있어 toast 위로
    toast.info('다음 스케줄 당기는 중...');
    // 스케줄 데이터르 최신으로 업데이트 후 현재 진행중인 스케줄 확인
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex !== -1) {
      alert('현재 스케줄이 없을 때 사용 가능합니다.');
      return;
    } else if (nextScheduleIndex === -1) {
      alert('다음 스케줄이 없습니다.');
      return;
    }
    // 시작 시간 계산
    const start = new Date();
    const end = new Date();
    start.setSeconds(0);
    start.setMilliseconds(0);
    start.setMinutes(Math.floor(start.getMinutes() / 5) * 5);
    end.setTime(
      start.getTime() +
        scheduleList_selectDay[nextScheduleIndex].totalTime * 1000,
    );

    try {
      const {
        data: { pullSchedule_study },
      } = await pullScheduleMutation({
        variables: {
          scheduleId: scheduleList_selectDay[nextScheduleIndex].id,
          start,
          end,
        },
      });
      if (!pullSchedule_study) {
        alert('다음 스케줄을 당길 수 없습니다.');
      } else {
        await myInfoRefetch();
        toast.success('다음 스케줄을 당겼습니다.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onStopSchedule = async ({ close }) => {
    // 업데이트 오래걸릴 수 있어 toast 위로
    toast.info('현재 스케줄 마치는 중...');
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
          totalTime: deleteBool
            ? 0
            : (end.getTime() - start_schedule.getTime()) / 1000,
          end,
          deleteBool,
        },
      });
      if (!stopSchedule_study) {
        alert('현재 스케줄을 마칠 수 없습니다.');
      } else {
        await myInfoRefetch();
        toast.success('현재 스케줄을 마쳤습니다.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onStartSchedule = async ({ close }) => {
    try {
      setOnLoading(true);

      // 5분 단위 최소 5분 검증
      if (startScheduleTerm.value < 5) {
        alert('스케줄을 시작하기 위한 최소 시간은 5분입니다.');
        return;
      } else if (startScheduleTerm.value % 5 !== 0) {
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
      if (maxTime < startScheduleTerm.value) {
        alert(`현재 가능한 최대 설정 시간은 ${maxTime}분 입니다.`);
        startScheduleTerm.setValue(maxTime);
        return;
      }
      // todolist 중복 체크
      const findTodo = (i) =>
        i.subject.id === mySubjectList2.option &&
        i.name === scheduleTitle.value;
      const existIndex = todolistData_new.findIndex(findTodo);
      const existTodo = existIndex === -1 ? false : true;
      // 입력 시간 계산
      const start = new Date();
      start.setTime(nowDate.getTime());
      start.setSeconds(0);
      start.setMilliseconds(0);
      start.setMinutes(Math.floor(start.getMinutes() / 5) * 5);
      const end = new Date();
      end.setTime(start.getTime() + startScheduleTerm.value * 60000);

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
        // await todolistRefetch();
        mySubjectList2.setOption('');
        stateList.setOption('자습');
        scheduleTitle.setValue('');
        startScheduleTerm.setValue(30);
        toast.success('새로운 스케줄이 시작되었습니다.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      setOnLoading(false);
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
        todolistName.setValue('');
        mySubjectList.setOption('');
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
    // console.log(interval / 1000);

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
      navigator.mediaDevices.getUserMedia ||
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

  const detectFromVideoFrame = async (video) => {
    try {
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
      // console.log(maxBboxArea);
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
      // console.log(finalDecision);
      setStudyBool(true);
    } else {
      finalDecision = 2; //부재중
      // console.log(finalDecision);
      setStudyBool(false);
    }
  };
  useInterval(async () => {
    // console.log(timeCount);
    updateTime();
    if (modelPose !== null && modelDetect !== null) {
      if (timeCount % 10 === 1) {
        detectFromVideoFrame(video1.current);
        // console.log(decision);
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
          // console.log('Final decision : true');
          existToggleMutation({
            variables: { email: userEmail, existToggle: true },
          });
          // 타임랩스용 이미지 저장
          if (timelapse) {
            await setCoverView(true);
            onImgSave();
          }
        } else if (finalDecision === 2) {
          // console.log('Final decision : false');
          existToggleMutation({
            variables: { email: userEmail, existToggle: false },
          });
        }
      }
    }
  }, 1000);

  const whatNee = () => {
    console.log('왔니?');
  };
  const donleaveme = () => {
    // alert('마우스를 화면에 올려 놓으세요!!!');
    console.log('날 떠나지마');
  };

  // useMouseEnter(whatNee);

  // useMouseLeave(donleaveme)

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      if (myInfoData.studyDefaultSet.autoRefresh) {
        startPolling(autoRefreshTerm.value * 1000);
      }
      LoadCamera();
      LoadModel();
      isFirstRun.current = false;
      return;
    }
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
        startDate === selectDate.getDate()
        // scheduleList[i].isPrivate === false
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
    // 초기화
    donutData = [];
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
      nowScheduleColor = nowSchedule.subject
        ? nowSchedule.subject.bgColor
        : 'rgba(123, 169, 235, 1)';
      const startPoint = new Date(nowSchedule.start);
      const endPoint = new Date(nowSchedule.end);
      nowTitle1 =
        (nowSchedule.subject ? nowSchedule.subject.name : '과목 없음') +
        ' (' +
        nowSchedule.title +
        ')';
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

    // 스케줄 별 그래프 계산
    let resultArray_schedule = []; // exist 타임 용
    let resultArray_scheduleT = []; // 타겟타임용
    schedule_label = [];
    schedule_color = [];
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
    }
    taskArray_schedule = new Array(resultArray_schedule.length).fill(0);
    taskArray_scheduleT = new Array(resultArray_scheduleT.length).fill(0);
    taskArray_schedule = twoArraySum(taskArray_schedule, resultArray_schedule);
    taskArray_scheduleT = twoArraySum(
      taskArray_scheduleT,
      resultArray_scheduleT,
    );
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
  };

  if (7 === networkStatus) {
    todaySchedule_calculate();
    todayGraph_calculate();
  }

  const todolistRow = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 2 + columnIndex;
    // if (index === 0) {
    //   return (
    //     <IndiTodoWrap
    //       key={index}
    //       style={style}
    //       isOdd={Boolean(columnIndex % 2)}
    //     >
    //       <RoundTodo
    //         bgColor={'#DDE7E9'}
    //         color={'black'}
    //         onClick={() => {
    //           setNewTodoView(true);
    //         }}
    //       >
    //         <RoundNameDiv2>To Do List 추가 👆</RoundNameDiv2>
    //       </RoundTodo>
    //     </IndiTodoWrap>
    //   );
    // } else {
    if (todolistData_new[index] === undefined) {
      return <div></div>;
    }
    const rgb_tmp = hexToRgb(todolistData_new[index].subject.bgColor);
    const fontColor = fontColor_dependBg(rgb_tmp);
    return (
      <IndiTodoWrap key={index} style={style} isOdd={Boolean(columnIndex % 2)}>
        <RoundTodo
          bgColor={todolistData_new[index].subject.bgColor}
          color={fontColor}
          onClick={() => {
            mySubjectList2.setOption(todolistData_new[index].subject.id);
            scheduleTitle.setValue(todolistData_new[index].name);
          }}
        >
          <RoundNameDiv>{todolistData_new[index].name}</RoundNameDiv>
          <Flag
            fill={fontColor}
            margin={'0 5px 0 0'}
            onClick={() => onTodolistFinish(todolistData_new[index].id)}
          />
          <Delete
            fill={fontColor}
            onClick={() => {
              onTodolistDelete(todolistData_new[index].id);
            }}
          />
        </RoundTodo>
      </IndiTodoWrap>
    );
    // }
  };

  const followingList = ({ index, style }) => {
    const indiUser = myInfoData.following[index];

    return (
      <IndiviList key={index} style={style}>
        <Avatar size="sm" url={indiUser.avatar} />
        <IndiviName>
          {indiUser.email}
          <span>{indiUser.username}</span>
        </IndiviName>
        <Button_custom
          text={indiUser.goWith ? '동행중' : '동행'}
          width={'60px'}
          height={'28px'}
          margin={'0 15px'}
          padding={'0'}
          bgColor={indiUser.goWith ? '#c7c7c7' : '#7BA9EB'}
          color={indiUser.goWith ? 'black' : 'white'}
          loading={followingLoad[index]}
          onClick={() => {
            onGoWith(index);
          }}
        />
        <IndiviLink target="_blank" to={'/' + indiUser.username} replace />
      </IndiviList>
    );
  };

  const Avatars = ({ index, style }) => {
    if (index === 0) {
      return (
        <IndiWrap style={style}>
          <Avatar
            size="md"
            url={myInfoData.avatar}
            confirmSet={true}
            exist={studyBool}
          />
          <span>{myInfoData.username}</span>
          <AddDiv
            onClick={() => {
              setPopupView(true);
            }}
          >
            <Add_12
              fill={'#0F4C82'}
              boxShadow={'0 0 0 2px white'}
              borderRadius={'50%'}
            />
          </AddDiv>
        </IndiWrap>
      );
    } else {
      const index2 = index - 1;
      const indiUser = myInfoData.withFollowing[index2];
      return (
        <IndiWrap style={style}>
          <Avatar
            size="md"
            url={indiUser.avatar}
            confirmSet={true}
            exist={indiUser.existToggle}
          />
          <span>{indiUser.username}</span>
          <PofileLink target="_blank" to={'/' + indiUser.username} replace />
        </IndiWrap>
      );
    }
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <DatePickButton ref={ref} onClick={onClick}>
        {value}
      </DatePickButton>
    );
  });

  return (
    <AllWrap>
      <TopWrap>
        <Wrapper id="capture">
          <VideoWrap>
            <div style={{ paddingTop: '100px' }}>
              <Loader />
              <br />
              <VideoText>카메라 로딩중...</VideoText>
              <span style={{ color: '#DB4437' }}>
                (로딩 중 조작, 닫기 금지!!!)
              </span>
            </div>
            <AvatarBox display={coverView ? 'none' : 'flex'}>
              <FixedList
                height={110}
                width={450}
                layout="horizontal"
                itemSize={90}
                itemCount={myInfoData.withFollowing.length + 1}
              >
                {Avatars}
              </FixedList>
            </AvatarBox>
            <AvatarBoxCover display={coverView ? 'flex' : 'none'}>
              <WhiteBox>
                <Logo />
              </WhiteBox>
            </AvatarBoxCover>
            <CanvasBox ref={canvas1} />
            <VideoBox ref={video1} playsInline autoPlay muted />
          </VideoWrap>
          <GraphDiv>
            <HeaderDiv>
              <DDayDiv>
                {dDayOn && (
                  <>
                    <DName>{dDateName.value}</DName>
                    <DNumber>
                      {realDDay === 0
                        ? 'D-day'
                        : realDDay > 0
                        ? `D+${realDDay}`
                        : `D${realDDay}`}
                    </DNumber>
                  </>
                )}
              </DDayDiv>
              <SetDiv>
                <Button_capture
                  onClick={async () => {
                    await setCoverView(true);
                    onImgSave();
                  }}
                />
                <Button_refresh
                  onClick={() => {
                    myInfoRefetch();
                    subjectRefetch();
                    // todolistRefetch();
                  }}
                />
                <PopupCustom2
                  trigger={<Button_control />}
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => {
                    return (
                      <PBody3>
                        <PTitle text={'컨트롤 패널'} />
                        <Wrapper_b>
                          <ScheStart>
                            <NewScheContent>
                              <SelectInL>
                                <Select
                                  {...mySubjectList2}
                                  id={'mySubject_id_study'}
                                />
                              </SelectInL>
                              <SelectInR>
                                <Select
                                  {...stateList}
                                  id={'mySubject_state_study'}
                                />
                              </SelectInR>
                            </NewScheContent>
                            <NewScheContent>
                              <Input
                                placeholder={'(필수) 제목'}
                                height={'25px'}
                                bgColor={'white'}
                                {...scheduleTitle}
                              />
                            </NewScheContent>
                            <NewScheContent>
                              <Input_100
                                placeholder={''}
                                {...startScheduleTerm}
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
                                  startScheduleTerm.setValue(maxTime_tmp);
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
                                if (!onLoading) {
                                  onStartSchedule({ close });
                                }
                              }}
                            />
                          </ScheStart>
                          <ControlWrap>
                            <ControlTop>
                              <ControlTop1>
                                현재 스케줄을&nbsp;&nbsp;
                                <Input_100
                                  placeholder={''}
                                  {...extensionTerm}
                                  type={'number'}
                                  step={5}
                                  width={'80px'}
                                  height={'25px'}
                                  bgColor={'white'}
                                />
                                분
                              </ControlTop1>
                              <ControlTop2>
                                <Button_custom
                                  text={'단축'}
                                  width={'120px'}
                                  height={'25px'}
                                  margin={'0 10px 0 0'}
                                  bgColor={'#0F4C82'}
                                  color={'white'}
                                  padding={'0'}
                                  onClick={() => {
                                    onCutSchedule({ close });
                                  }}
                                />
                                <Button_custom
                                  text={'연장'}
                                  width={'120px'}
                                  height={'25px'}
                                  margin={'0'}
                                  bgColor={'#0F4C82'}
                                  color={'white'}
                                  padding={'0'}
                                  onClick={() => {
                                    onExtensionSchedule({ close });
                                  }}
                                />
                              </ControlTop2>
                            </ControlTop>
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
                                  onStopSchedule({ close });
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
                                  onPullSchedule({ close });
                                }}
                              />
                            </ControlBottom>
                          </ControlWrap>
                        </Wrapper_b>
                        <ButtonDiv>
                          <PopupButton_solo
                            type="button"
                            width="130px"
                            onClick={() => {
                              close();
                            }}
                            text={'닫기'}
                          />
                        </ButtonDiv>
                      </PBody3>
                    );
                  }}
                </PopupCustom2>
                <PopupCustom
                  trigger={<Button_setting margin={'0'} />}
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => {
                    return (
                      <PBody>
                        <PTitle text={'기본값 세팅'} />
                        <SetContentWrap>
                          <SetContentBox>
                            D-day :　
                            <Switch
                              on={true}
                              off={false}
                              value={dDayOn}
                              onChange={dDaySwitch}
                            />
                            <p>　</p>
                            <Input_100
                              width={'120px'}
                              height={'32px'}
                              bgColor={'#FAFAFA'}
                              placeholder={'내용 (15자 이내)'}
                              {...dDateName}
                            />
                            <p>　</p>
                            <DatePicker
                              dateFormat={'yyyy/MM/dd'}
                              selected={dDate}
                              onChange={(date) => {
                                const newDate = new Date(
                                  date.getFullYear(),
                                  date.getMonth(),
                                  date.getDate(),
                                );
                                setDDate(newDate);
                              }}
                              customInput={<CustomInput />}
                            />
                          </SetContentBox>
                          <SetContentBox>
                            현재 스케줄 부재시 시간 기록 :　
                            <Switch
                              on={true}
                              off={false}
                              value={nonScheduleRecord}
                              onChange={recordSwitch}
                            />
                          </SetContentBox>
                          <SetContentBox>
                            타임랩스용 자동 화면캡처 :　
                            <Switch
                              on={true}
                              off={false}
                              value={timelapse}
                              onChange={timelapseSwitch}
                            />
                          </SetContentBox>
                          <SetContentBox>
                            자동 새로고침 :　
                            <Switch
                              on={true}
                              off={false}
                              value={autoRefresh}
                              onChange={autoSwitch}
                            />
                            <p>　</p>
                            <RefreshInputWrap>
                              <Input_100
                                placeholder={''}
                                {...autoRefreshTerm}
                                type={'number'}
                              />
                            </RefreshInputWrap>
                            초
                          </SetContentBox>
                          <SetContentBox>
                            스케줄 시작(생성) 기간 :　
                            <RefreshInputWrap>
                              <Input_100
                                placeholder={''}
                                {...startScheduleTerm_forSet}
                                type={'number'}
                                step={5}
                              />
                            </RefreshInputWrap>
                            분
                          </SetContentBox>
                          <SetContentBox>
                            스케줄 단축&amp;연장 기간 :　
                            <RefreshInputWrap>
                              <Input_100
                                placeholder={''}
                                {...extensionTerm_forSet}
                                type={'number'}
                                step={5}
                              />
                            </RefreshInputWrap>
                            분
                          </SetContentBox>
                        </SetContentWrap>
                        <ButtonDiv>
                          <PopupButton
                            type="button"
                            onClick={async () => {
                              const fucResult = await onSaveSet();
                              if (fucResult) {
                                close();
                              }
                            }}
                            text={'적용'}
                          />
                          <PopupButton
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
                title={'Today Deep Time Log'}
                labels={[
                  'Deep Time',
                  '부재 시간' + '　' + '　' + '　' + '　',
                  '나머지 시간',
                ]}
              />
              <ClockBox>
                <Clock24 />
              </ClockBox>
              <TodayTime>
                {total_hour.length === 1 ? '0' + total_hour : total_hour}:
                {total_min.length === 1 ? '0' + total_min : total_min}
              </TodayTime>
              <TodayTime_total>
                / {target_hour.length === 1 ? '0' + target_hour : target_hour}:
                {target_min.length === 1 ? '0' + target_min : target_min}
              </TodayTime_total>
              {/* <TodayPercent>{donutPercent}%</TodayPercent> */}
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
                <BreakTimeDiv>
                  <IconWrap>
                    <Coffee />
                    <div style={{ fontSize: 13, fontWeight: 'bold' }}>
                      Break
                    </div>
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
              </BreakNextWrap>
            </NowNextWrap>
          </GraphDiv>
        </Wrapper>
      </TopWrap>
      {popupView && (
        <>
          <BlackBack />
          <CustomPopup>
            <PBody2>
              <PTitle text={'동행자 관리'} />
              {myInfoData.following.length === 0 ? (
                <NonFollow>팔로잉하는 회원이 없습니다</NonFollow>
              ) : (
                <FixedList
                  height={300}
                  itemCount={myInfoData.following.length}
                  itemSize={54}
                  width={360}
                  style={{ marginBottom: '20px' }}
                >
                  {followingList}
                </FixedList>
              )}
              <ButtonDiv>
                <PopupButton_solo
                  type="button"
                  onClick={() => {
                    setPopupView(false);
                  }}
                  text={'닫기'}
                />
              </ButtonDiv>
            </PBody2>
          </CustomPopup>
        </>
      )}
    </AllWrap>
  );
};

// To Do List 코드 임시저장
{
  /* <TodoWrap>
                            {newTodoView ? (
                              <NewTodoDiv>
                                <NewTopDiv>
                                  <SelectWrapper>
                                    <Select
                                      {...mySubjectList}
                                      id={'mySubject_id_study'}
                                    />
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
                              <ListGrid
                                height={130}
                                width={470}
                                columnWidth={225}
                                rowHeight={44}
                                rowCount={
                                  Math.floor(todolistData_new.length / 2) + 1
                                }
                                columnCount={2}
                              >
                                {todolistRow}
                              </ListGrid>
                            )}
                          </TodoWrap> */
}
