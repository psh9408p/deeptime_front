import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DonutChart_today from '../../Components/Charts/DonutChart_today';
import SumArray from '../../Components/Array/SumArray';
import twoArraySum from '../../Components/twoArraySum';
import ObjectCopy from '../../Components/ObjectCopy';
import RowBarChart_now from '../../Components/Charts/RowBarChart_now';
import moment from 'moment';
import {
  NextSchedule,
  Flag,
  Delete,
  Add_12,
  Logo,
  Edit,
} from '../../Components/Icons';
import { Clock24 } from '../../Components/Image';
import Countdown from 'react-countdown';
import Switch from 'react-input-switch';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupClose from '../../Components/Buttons/PopupClose';
import PopButton_custom from '../../Components/Buttons/PopButton_custom';
import FatText from '../../Components/FatText';
import Input_100 from '../../Components/Input_100';
import Loader from '../../Components/Loader';
import Button_custom from '../../Components/Buttons/Button_custom';
import {
  Button_refresh,
  Button_capture,
  Button_setting,
} from '../../Components/Buttons/Button_click';
import { FixedSizeList as FixedList } from 'react-window';
import { hexToRgb, fontColor_dependBg } from '../../Components/ColorTool';
import { toast } from 'react-toastify';
import useSelect from '../../Hooks/useSelect';
import useInput from '../../Hooks/useInput';
import Select from '../../Components/Select';
import Input from '../../Components/Input';
import Avatar from '../../Components/Avatar';
import PopupButton_solo from '../../Components/Buttons/PopupButton_solo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useSound from 'use-sound';
import startSound from '../../Components/Sound/start.mp3';
import midSound from '../../Components/Sound/mid.mp3';

const ClockBox = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  z-index: 10;
  display: flex;
  margin-top: 118px;
  margin-left: 528px;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TimeButton = styled.button`
  cursor: pointer;
  width: 30px;
  height: 18px;
  position: absolute;
  z-index: 12;
  font-size: 12px;
  font-weight: 600;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin-top: 93px;
  margin-left: 603px;
  padding: 1px;
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

const TodayPercent = styled(TodayTime)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 33px;
  margin-top: 190px;
  margin-left: 580px;
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
  border-radius: ${(props) =>
    props.theme.borderRadius}; */
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

const TimeLogWrap = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 210px;
  margin-bottom: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const DonutWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 230px;
`;

const TotalTimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const TotalNumber = styled.div`
  text-align: center;

  &:first-child {
    line-height: 30px;
    span {
      font-size: 35px;
      color: ${(props) => props.theme.classicBlue};
    }
  }

  &:nth-child(2) {
    margin-bottom: 20px;
    line-height: 25px;
    span {
      font-size: 25px;
      color: ${(props) => props.theme.lightGreyColor};
    }
  }
`;

const DonutLabel = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
`;

const NowNextWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 190px;
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
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 150px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 10px;
`;

const NextAndTool = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5em;
  width: 100%;
  height: 100%;
  font-size: 13px;
  font-weight: bold;
  padding: 10px;
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const NextText = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin-left: 10px;
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
  margin: 5px 0 5px 0;
`;

const DNumber = styled.div`
  font-size: 24px;
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
    height: 480px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    width: 500px !important;
    height: 230px !important;
  }
`;

const PopupCustom6 = styled(PopupCustom)`
  &-content {
    width: 488px !important;
    height: 473px !important;
  }
`;

const PopupCustom7 = styled(PopupCustom)`
  &-content {
    width: 488px !important;
    height: 433px !important;
  }
`;

const PopupCustom11 = styled(PopupCustom)`
  &-content {
    width: 540px !important;
    height: 413px !important;
  }
`;

const PopupCustom12 = styled(PopupCustom)`
  &-content {
    width: 450px !important;
    height: 70px !important;
  }
`;

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
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
  margin: 10px 0 30px 0;
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

const NewTodoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 450px;
  height: 40px;
  margin-bottom: 20px;
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
  width: 90px;
  height: 25px;
  margin-right: 10px;
`;

const SelectInR = styled.div`
  width: 60px;
  height: 25px;
`;

const IndiWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px 0 5px;
  span {
    :first-child {
      text-align: center;
      font-size: 12px;
      color: ${(props) => props.theme.classicBlue};
      font-weight: bold;
      margin-bottom: 3px;
    }
    :nth-child(3) {
      text-align: center;
      margin-top: 5px;
      font-size: 12px;
      font-weight: normal;
    }
  }
`;

const AddDiv = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 61px;
  height: 65px;
  margin-bottom: 25px;
`;

const PofileLink = styled(Link)`
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-top: 12px;
  border-radius: 50%;
`;

const BlackBack = styled.div`
  position: absolute;
  z-index: 13;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 50%;
`;

const CustomPopup = styled.div`
  position: absolute;
  z-index: 14;
  width: 420px;
  height: 410px;
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
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  height: 100%;
  border-bottom: 1px solid #c7c7c7;
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

const ModiWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TodoTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 450px;
`;

const SelectWrapper3 = styled.div`
  width: 123px;
  height: 35px;
`;

const InputWrapper2 = styled.div`
  margin-left: 10px;
  width: 225px;
`;

const TodoNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  height: 100%;
  padding: 0 10px;
  /* border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')}; */
`;

const TodoNameDiv2 = styled(TodoNameDiv)`
  cursor: pointer;
  width: auto;
`;

const TodoIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const TodoFinishDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  padding-left: 10px;
`;

const ColorBox = styled.div`
  cursor: pointer;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  background-color: white;
  margin-right: 10px;
  border: 1px solid black;
  border-radius: ${(props) => props.radius};
  &:hover {
    background-color: ${(props) => props.bgColor};
  }
`;

const ColorBox3 = styled(ColorBox)`
  cursor: default;
  border: none;
  background-color: ${(props) => props.bgColor};
`;

const TaskName_todo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 90px;
  padding-right: 10px;
`;

const BookMarkTitle = styled.div`
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 372px;
  height: 30px;
  color: white;
  background-color: ${(props) => props.theme.classicBlue};
  border-top-right-radius: ${(props) => props.theme.borderRadius};
  border-top-left-radius: ${(props) => props.theme.borderRadius};
`;

const TodolistTitle = styled(BookMarkTitle)`
  padding-left: 15px;
  width: 452px;
`;

const TodolistTitle2 = styled(TodolistTitle)`
  width: 492px;
`;

const BookLeft = styled.div`
  display: flex;
  align-items: center;
  width: 118px;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  padding-left: 28px;
`;

const BookRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
`;

const FinishDateDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
`;

const BookRight3 = styled(BookRight)`
  width: 220px;
  height: 100%;
`;

const ListWrap2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
`;

let scheduleList_selectDay = [];
let scheduleList_selectDay_length = 0;
let taskArray_schedule = [];
let taskArray_scheduleT = [];
let donutData = [];
let donutData_am = [];
let donutData_pm = [];
let donutPercent = 0;
let rgbBox = [];
let rgbBox_am = [];
let rgbBox_pm = [];
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
let break_boolean = false;
let break_countdown = 0;
let target_min = 0;
let target_hour = 0;
let total_min = 0;
let total_hour = 0;
// 스케줄 알람용
let beep_scheId = '';
let beep_beforeTen = true; // true가 10분전 알림을 이미 준거

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
  editTodolistMutation,
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
  isAm,
  setIsAm,
  aniBool,
  setAniBool,
  canvasRef,
  webcamRef,
  Predict,
  timelapse,
  setTimelapse,
  onImgSave,
  camEmpty,
  setCamEmpty,
  videoDevices,
  todoModi,
  setTodoModi,
  todoModiName,
  todoModiId,
  setTodoModiId,
}) => {
  // 비프음
  const [startPlay] = useSound(startSound);
  const [midPlay] = useSound(midSound);

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
  const [scheAlarm, setScheAlarm] = useState(
    myInfoData.studyDefaultSet.scheAlarm,
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
  const alarmSwitch = () => {
    if (scheAlarm) {
      setScheAlarm(false);
    } else {
      setScheAlarm(true);
    }
  };
  const dDaySwitch = () => {
    if (dDayOn) {
      setDDayOn(false);
    } else {
      setDDayOn(true);
    }
  };

  // todolistData 오름차순 정렬
  todolistData.sort(function (a, b) {
    return a.subject.name < b.subject.name
      ? -1
      : a.subject.name > b.subject.name
      ? 1
      : // : a.name < b.name
        // ? -1
        // : a.name > b.name
        // ? 1
        0;
  });
  // todolistData 과목 없음이 위로오게
  todolistData.sort(function (a, b) {
    const word = '과목 없음';
    return a.subject.name === word && b.subject.name !== word
      ? -1
      : a.subject.name !== word && b.subject.name === word
      ? 1
      : 0;
  });

  //todolist 완료된거랑 아닌거 구분
  let todolistData_new = [];
  let todolistData_finish = [];
  todolistData.map((todolist) => {
    if (todolist.finish) {
      todolistData_finish.push(todolist);
    } else {
      todolistData_new.push(todolist);
    }
  });
  //todolist_finish 끝날 날짜 순으로 정렬(최근이 위로)
  todolistData_finish.sort(function (a, b) {
    const aDate = new Date(a.finishAt);
    const bDate = new Date(b.finishAt);
    return a.subject.name < b.subject.name
      ? -1
      : a.subject.name > b.subject.name
      ? 1
      : aDate > bDate
      ? -1
      : aDate < bDate
      ? 1
      : 0;
  });
  // todolistData_finish 과목 없음이 위로오게
  todolistData_finish.sort(function (a, b) {
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
  const camList = useSelect(
    videoDevices.map((a) => a.label),
    videoDevices.map((a) => a.deviceId),
  );
  const mySubjectList2 = useSelect([...listName_tmp], [...listId_tmp]);
  // todolist 수정용
  const mySubjectList3 = useSelect([...listName_tmp], [...listId_tmp]);
  const stateBox = ['자습', '강의'];
  const stateList = useSelect(stateBox, stateBox);

  const todolistClear = () => {
    todolistName.setValue('');
    mySubjectList2.setOption(mySubjectList2.valueList[0]);
  };

  const LoadCamera = async () => {
    console.log('Load camera');

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }

    // 비디오 소스가 없으면 없다고 화면에 표시
    if (videoDevices.length === 0) {
      setCamEmpty(true);
    } else {
      await navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: camList.option },
        })
        .then(function (stream) {
          webcamRef.current.srcObject = stream;
        })
        .catch(function (error) {
          console.log(error);
          console.log('Something went wrong!');
        });
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
      toast.info('기본값 세팅 저장 중...');
      const {
        data: { editStudySet },
      } = await editStudySetMutation({
        variables: {
          timelapseRecord: timelapse,
          nonScheduleRecord,
          autoRefresh,
          autoRefreshTerm: Number(autoRefreshTerm.value),
          scheAlarm: autoRefresh ? scheAlarm : false,
          startScheduleTerm: Number(startScheduleTerm_forSet.value),
          cutExtenTerm: Number(extensionTerm_forSet.value),
          dDayOn,
          dDateName: dDateName.value,
          dDate,
        },
      });
      if (!editStudySet) {
        alert('기본값 세팅을 저장할 수 없습니다.');
      } else {
        if (autoRefresh) {
          // startPolling(autoRefreshTerm.value * 1000);
          startPolling(3000);
        } else {
          stopPolling();
        }
        startScheduleTerm.setValue(startScheduleTerm_forSet.value);
        extensionTerm.setValue(extensionTerm_forSet.value);
        await myInfoRefetch();
        toast.success('새로운 기본값 세팅을 저장하였습니다.');
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

    // 연장시 남는 시간이 10분 이상이면 10분 알림 재설정
    const resetTenAlarm = () => {
      const nowTmpDate = new Date();
      if (end.getTime() - nowTmpDate.getTime() >= 600000) {
        beep_beforeTen = false;
      }
    };

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
        resetTenAlarm();
        toast.success('현재 스케줄을 연장했습니다.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const tenExtensionSchedule = async () => {
    toast.info('현재 스케줄 연장 중...');

    // 연장시간
    const start = new Date(scheduleList_selectDay[nowScheduleIndex].start);
    const end = new Date(scheduleList_selectDay[nowScheduleIndex].end);
    let deleteArray = [];
    let cutId = '';
    let cutTotalTime = 0;
    end.setTime(end.getTime() + 600000); // 10분 추가
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
        beep_beforeTen = true;
      } else {
        await myInfoRefetch();
        toast.success('현재 스케줄을 연장했습니다.');
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
    if (window.confirm('다음 스케줄을 당기시겠습니까?') === false) {
      return;
    }

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
    if (mySubjectList2.option === '') {
      alert('과목 선택은 필수 항목입니다.');
      return;
    }

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
        alert('스케줄의 제목을 입력하세요.');
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
        },
      });
      if (!startSchedule_study) {
        alert('스케줄을 시작할 수 없습니다.');
      } else {
        await myInfoRefetch();
        // await todolistRefetch();
        mySubjectList2.setOption(mySubjectList2.valueList[0]);
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
    if (mySubjectList2.option === '') {
      alert('과목을 선택하세요.');
      return;
    } else if (todolistName.value === '') {
      alert('내용을 입력하세요.');
      return;
    }

    try {
      toast.info('새로운 To Do를 추가 중...');
      const {
        data: { addTodolist },
      } = await addTodolistMutation({
        variables: {
          name: todolistName.value,
          subjectId: mySubjectList2.option,
        },
      });
      if (!addTodolist) {
        alert('To Do를 추가할 수 없습니다.');
      } else {
        await todolistRefetch();
        await todolistClear();
        toast.success('새로운 To Do가 추가되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onTodolistDelete = async (todolistId) => {
    if (window.confirm('정말로 To Do를 삭제하시겠습니까?') === false) {
      return;
    }

    try {
      toast.info('To Do를 삭제 중...');
      const {
        data: { deleteTodolist },
      } = await deleteTodolistMutation({
        variables: {
          todolistId: todolistId === '' ? todoModiId : todolistId,
        },
      });
      if (!deleteTodolist) {
        alert('To Do를 삭제할 수 없습니다.');
      } else {
        await todolistRefetch();
        toast.success('To Do가 삭제되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onTodolistEdit = async () => {
    if (mySubjectList3.option === '') {
      alert('과목 선택은 필수 항목입니다.');
      return;
    }

    try {
      toast.info('To Do를 수정 중...');
      const {
        data: { editTodolist },
      } = await editTodolistMutation({
        variables: {
          todolistId: todoModiId,
          subjectId: mySubjectList3.option,
          name: todoModiName.value,
        },
      });
      if (!editTodolist) {
        alert('To Do를 수정할 수 없습니다.');
      } else {
        await todolistRefetch();
        toast.success('To Do가 수정되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onTodolistFinish = async (todolistId) => {
    try {
      toast.info('To Do를 완료 중...');
      const {
        data: { finishTodolist },
      } = await finishTodolistMutation({
        variables: {
          todolistId,
        },
      });
      if (!finishTodolist) {
        alert('To Do를 완료할 수 없습니다.');
      } else {
        await todolistRefetch();
        toast.success('To Do가 완료되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  // To do list 수정값 넣어주기
  const inputTodolist = (todo) => {
    setTodoModiId(todo.id);
    mySubjectList3.setOption(todo.subject.id);
    todoModiName.setValue(todo.name);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      if (myInfoData.studyDefaultSet.autoRefresh) {
        startPolling(autoRefreshTerm.value * 1000);
      }
      LoadCamera();
      Predict();
      setTimelapse(myInfoData.studyDefaultSet.timelapseRecord);
      isFirstRun.current = false;
      return;
    }
    LoadCamera();
  }, [camList.option]);

  // // 시작 알림 & 10분전 알림 관련
  const beepAlert = () => {
    if (nowScheduleIndex !== -1 && autoRefresh && scheAlarm) {
      const beep_nowSche = scheduleList_selectDay[nowScheduleIndex];
      const beep_endDate = new Date(beep_nowSche.end);
      // 기존에 감지한 스케줄인지
      if (beep_scheId === beep_nowSche.id) {
        // 10분 알림 안한 상태인지
        if (!beep_beforeTen) {
          // 현재 스케줄 끝 시간이 10분 이내인지
          if (beep_endDate.getTime() - nowDate_tmp.getTime() <= 600000) {
            midPlay();
            toast.error('현재 스케줄이 10분 이내로 남았습니다.');
            beep_beforeTen = true;
            // if (
            //   beep_endDate.getHours() === 23 &&
            //   beep_endDate.getMinutes() > 50
            // ) {
            //   alert('현재 스케줄이 10분 남았습니다.');
            // } else {
            //   if (
            //     window.confirm(
            //       '현재 스케줄이 10분 남았습니다.\n10분을 연장하시겠습니까?',
            //     ) === false
            //   ) {
            //     beep_beforeTen = true;
            //     return;
            //   } else {
            //     await tenExtensionSchedule();
            //   }
            // }
          }
        }
      } else {
        startPlay();
        toast.info('새로운 스케줄이 시작됐습니다.');
        beep_scheId = beep_nowSche.id;
        // 시작한 스케줄의 총 길이가 10분 보다 적으면 10분 알람 할필요 없으니 값 수정
        if (beep_nowSche.totalTime / 60 > 10) {
          beep_beforeTen = false;
        }
      }
    }
  };

  //스케줄 계산
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
    donutData_am = [];
    donutData_pm = [];
    donutPercent = 0;
    rgbBox = [];
    rgbBox_am = [];
    rgbBox_pm = [];
    // 오늘 생선된 시간이 있는 인덱스 구하기
    let indexOfToday = myInfoData.times.findIndex(
      (i) =>
        new Date(i.createdAt).getFullYear() === selectDate.getFullYear() &&
        new Date(i.createdAt).getMonth() === selectDate.getMonth() &&
        new Date(i.createdAt).getDate() === selectDate.getDate(),
    );
    let indexOfNextday = myInfoData.times.findIndex(
      (i) =>
        new Date(i.createdAt).getFullYear() === nextDate.getFullYear() &&
        new Date(i.createdAt).getMonth() === nextDate.getMonth() &&
        new Date(i.createdAt).getDate() === nextDate.getDate(),
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
      nowTitle2 = '';
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
      // breakTime 계산
      if (nowScheduleIndex === -1) {
        const nowTime_break = new Date();
        const endPoint_break = new Date(
          scheduleList_selectDay[nextScheduleIndex].start,
        );
        break_boolean = true;
        break_countdown =
          endPoint_break.getTime() - nowTime_break.getTime() + 60000;
      } else {
        break_boolean = false;
      }
    } else {
      nextTitle1 = '다음 스케줄';
      nextTitle2 = '없음';
      next_TimeText = '';
      break_boolean = false;
    }
    // breakTime 계산
    // if (nextScheduleIndex > 0) {
    //   const startPoint_break = new Date(
    //     scheduleList_selectDay[nextScheduleIndex - 1].end,
    //   );
    //   const endPoint_break = new Date(
    //     scheduleList_selectDay[nextScheduleIndex].start,
    //   );
    //   const nowTime_break = new Date();
    //   if (nowTime_break >= startPoint_break && nowTime_break < endPoint_break) {
    //     break_boolean = true;
    //     break_countdown =
    //       endPoint_break.getTime() - nowTime_break.getTime() + 60000;
    //   } else {
    //     break_boolean = false;
    //   }
    // } else {
    //   break_boolean = false;
    // }
    // if (nowScheduleIndex )

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
        const index_tmp2 = slicedTimes.findIndex((i) => i === 0);
        if (index_tmp2 === -1) {
          slicedTimeBox.push(slicedTimes);
          rgbBox.push('#0F4C82'); // 클래식 블루 학습시간
          break; // 학습시간으로 끝남
        } else {
          const studyTime = slicedTimes.slice(0, index_tmp2);
          slicedTimeBox.push(studyTime);
          rgbBox.push('#0F4C82'); // 클래식 블루 학습시간
          slicedTimes = slicedTimes.slice(index_tmp2);
        }
      }
    }
    donutData = slicedTimeBox.map((a) => a.length * 5);

    // 도넛 데이터 am pm 구분하여넣기
    let timeSum = 0;
    let midCheck = false; // 중간 넘는 값이 처음나온건지 체크
    for (let z = 0; z < donutData.length; z++) {
      const time = donutData[z];
      const rgb = rgbBox[z];
      const preSum = ObjectCopy(timeSum);
      timeSum = preSum + time;

      // 24시간이 1440분 절반이 720분
      if (timeSum < 720) {
        donutData_am.push(time);
        rgbBox_am.push(rgb);
      } else if (timeSum === 720) {
        donutData_am.push(time);
        rgbBox_am.push(rgb);
        midCheck = true;
      } else {
        // timeSum > 720
        if (midCheck) {
          donutData_pm.push(time);
          rgbBox_pm.push(rgb);
        } else {
          const pmTime = preSum + time - 720;
          const amTime = time - pmTime;
          donutData_am.push(amTime);
          donutData_pm.push(pmTime);
          rgbBox_am.push(rgb);
          rgbBox_pm.push(rgb);
          midCheck = true;
        }
      }
    }

    // 도넛
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
    beepAlert();
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
          <span>
            {total_hour.length === 1 ? '0' + total_hour : total_hour} :{' '}
            {total_min.length === 1 ? '0' + total_min : total_min}
          </span>
          <Avatar
            size="md"
            url={myInfoData.avatar}
            aniBool={aniBool}
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
      let exist_min = myInfoData.withFollowing[index2].todayTime.existTime / 60;
      let last_hour = String(Math.floor(exist_min / 60));
      exist_min = exist_min - last_hour * 60;
      let last_min = String(Math.floor(exist_min));

      return (
        <IndiWrap style={style}>
          <span>
            {last_hour.length === 1 ? '0' + last_hour : last_hour} :{' '}
            {last_min.length === 1 ? '0' + last_min : last_min}
          </span>
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

  const ScheToolView = ({ close }) => (
    <PBody3>
      <PopupClose onClick={() => close()} />
      <PTitle text={'스케줄 조정'} />
      <Wrapper_b>
        <ScheStart>
          <NewScheContent>
            <SelectInL>
              <Select {...mySubjectList2} id={'mySubject_id_study'} />
            </SelectInL>
            <SelectInR>
              {/* <Select {...stateList} id={'mySubject_state_study'} /> */}

              <PopupCustom7
                trigger={
                  <PopButton_custom
                    text={'TO DO'}
                    width={'100%'}
                    fontSize={'12px'}
                  />
                }
                closeOnDocumentClick={false}
                modal
              >
                {(close) => (
                  <PBody>
                    <PopupClose onClick={() => close()} />
                    <PTitle text={'To Do List'} />
                    <TodolistTitle>
                      <BookLeft>과목</BookLeft>
                      <BookRight>To Do</BookRight>
                    </TodolistTitle>
                    <ListWrap2>
                      <FixedList
                        height={300}
                        itemCount={todolistData_new.length}
                        itemSize={40}
                        width={450}
                        itemData={{ close, view: 'sche' }}
                      >
                        {todolistRow_new}
                      </FixedList>
                    </ListWrap2>
                  </PBody>
                )}
              </PopupCustom7>
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
    </PBody3>
  );

  const TodoModiView = ({ close }) => (
    <PBody>
      <PopupClose onClick={() => close()} />
      <ModiWrap>
        <SelectWrapper3>
          <Select {...mySubjectList3} id={'mySubject3_id'} />
        </SelectWrapper3>
        <InputWrapper2>
          <Input placeholder={'내용 (예: 1단원 암기)'} {...todoModiName} />
        </InputWrapper2>
        <TodoIconDiv>
          <Edit
            size={'20'}
            onClick={async () => {
              const result = await onTodolistEdit();
              if (result) {
                setTodoModi(false);
              }
            }}
          />
        </TodoIconDiv>
        <TodoIconDiv>
          <Delete
            onClick={async () => {
              const result = await onTodolistDelete('');
              if (result) {
                setTodoModi(false);
              }
            }}
          />
        </TodoIconDiv>
      </ModiWrap>
    </PBody>
  );

  const todolistRow_new = ({ data, index, style }) => {
    const { close, view } = data;
    // view가 sche면 스케줄에서 TODO 킨거, todo면 TO DO 에서 킨거
    return (
      <IndiviList key={index} style={style}>
        {view === 'todo' ? (
          <ColorBox
            size={'18px'}
            radius={'9px'}
            bgColor={todolistData_new[index].subject.bgColor}
            onClick={() => {
              onTodolistFinish(todolistData_new[index].id);
            }}
          />
        ) : (
          <ColorBox3
            size={'18px'}
            radius={'9px'}
            bgColor={todolistData_new[index].subject.bgColor}
          />
        )}
        <TaskName_todo>{todolistData_new[index].subject.name}</TaskName_todo>
        <TodoNameDiv2
          onClick={() => {
            if (view === 'todo') {
              inputTodolist(todolistData_new[index]);
              setTodoModi(true);
            } else {
              mySubjectList2.setOption(todolistData_new[index].subject.id);
              scheduleTitle.setValue(todolistData_new[index].name);
              close();
            }
          }}
        >
          {todolistData_new[index].name}
        </TodoNameDiv2>
      </IndiviList>
    );
  };

  const todolistRow_finish = ({ index, style }) => (
    <IndiviList key={index} style={style}>
      <ColorBox3
        size={'18px'}
        radius={'9px'}
        bgColor={todolistData_finish[index].subject.bgColor}
      />
      <TaskName_todo>{todolistData_finish[index].subject.name}</TaskName_todo>
      <TodoNameDiv>{todolistData_finish[index].name}</TodoNameDiv>
      <TodoFinishDiv>
        {moment(todolistData_finish[index].finishAt).format('YY.MM.DD')}
      </TodoFinishDiv>
      <TodoIconDiv>
        <Delete
          onClick={() => {
            onTodolistDelete(todolistData_finish[index].id);
          }}
        />
      </TodoIconDiv>
    </IndiviList>
  );

  const TodoDoneView = ({ close }) => (
    <PBody>
      <PopupClose onClick={() => close()} />
      <PTitle text={'완료한 To Do List'} />
      <TodolistTitle2>
        <BookLeft>과목</BookLeft>
        <BookRight3>To Do</BookRight3>
        <FinishDateDiv>Done</FinishDateDiv>
      </TodolistTitle2>
      <ListWrap2>
        <FixedList
          height={300}
          itemCount={todolistData_finish.length}
          itemSize={40}
          width={490}
        >
          {todolistRow_finish}
        </FixedList>
      </ListWrap2>
    </PBody>
  );

  return (
    <AllWrap>
      <TopWrap>
        <Wrapper id="capture">
          <VideoWrap>
            {camEmpty ? (
              <div style={{ paddingTop: '100px' }}>
                <VideoText>카메라 장치 없음</VideoText>
                <span style={{ color: '#DB4437' }}>
                  (카메라 기기 연결 후 새로고침)
                </span>
              </div>
            ) : (
              <div style={{ paddingTop: '100px' }}>
                <Loader />
                <br />
                <VideoText>카메라 로딩중...</VideoText>
                <span style={{ color: '#DB4437' }}>
                  (로딩 중 조작, 닫기 금지!!!)
                </span>
              </div>
            )}

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
            <CanvasBox ref={canvasRef} />
            <VideoBox ref={webcamRef} playsInline autoPlay muted />
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
                <PopupCustom6
                  trigger={
                    <PopButton_custom
                      width={'70px'}
                      height={'30px'}
                      margin={'0 10px 0 0'}
                      text={'TO DO'}
                    />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PopupClose onClick={() => close()} />
                      <TodoTitleWrap>
                        <PTitle text={'To Do List'} />
                        <PopupCustom11
                          trigger={
                            <PopButton_custom
                              text={
                                <div>
                                  <p>완료한</p>
                                  <p>TO DO</p>
                                </div>
                              }
                              fontSize={'12px'}
                              width={'70px'}
                              height={'35px'}
                              margin={'0 2px 0 110px'}
                              onClick={() => {
                                onTodolistAdd();
                              }}
                            />
                          }
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => <TodoDoneView close={close} />}
                        </PopupCustom11>
                      </TodoTitleWrap>
                      <NewTodoDiv>
                        <SelectWrapper3>
                          <Select {...mySubjectList2} id={'mySubject2_id'} />
                        </SelectWrapper3>
                        <InputWrapper2>
                          <Input
                            placeholder={'내용 (예: 1단원 암기)'}
                            {...todolistName}
                          />
                        </InputWrapper2>
                        <Button_custom
                          text={'추가'}
                          width={'70px'}
                          height={'35px'}
                          bgColor={'#0F4C82'}
                          color={'white'}
                          onClick={() => {
                            onTodolistAdd();
                          }}
                        />
                      </NewTodoDiv>
                      <TodolistTitle>
                        <BookLeft>과목</BookLeft>
                        <BookRight>To Do</BookRight>
                      </TodolistTitle>
                      <ListWrap2>
                        <FixedList
                          height={300}
                          itemCount={todolistData_new.length}
                          itemSize={40}
                          width={450}
                          itemData={{ close: () => {}, view: 'todo' }}
                        >
                          {todolistRow_new}
                        </FixedList>
                      </ListWrap2>
                      <PopupCustom12
                        open={todoModi}
                        closeOnDocumentClick={false}
                        onClose={() => {
                          setTodoModi(false);
                        }}
                        modal
                      >
                        {(close) => TodoModiView({ close })}
                      </PopupCustom12>
                    </PBody>
                  )}
                </PopupCustom6>
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
                <PopupCustom
                  trigger={<Button_setting margin={'0'} />}
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => {
                    return (
                      <PBody>
                        <PopupClose onClick={() => close()} />
                        <PTitle text={'기본값 세팅'} />
                        <SetContentWrap>
                          <SetContentBox>
                            카메라 선택 :<p>　</p>
                            <Select
                              {...camList}
                              id={'camselect_id'}
                              width={'250px'}
                              height={'32px'}
                            />
                          </SetContentBox>
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
                            현재 스케줄 있을 때만 시간기록 :　
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
                            {/* <RefreshInputWrap>
                              <Input_100
                                placeholder={''}
                                {...autoRefreshTerm}
                                type={'number'}
                              />
                            </RefreshInputWrap>
                            초 */}
                            {autoRefresh && (
                              <>
                                /<p>　</p>스케줄 알림 :　
                                <Switch
                                  on={true}
                                  off={false}
                                  value={scheAlarm}
                                  onChange={alarmSwitch}
                                />
                              </>
                            )}
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
                          <PopupButton_solo
                            type="button"
                            onClick={async () => {
                              const fucResult = await onSaveSet();
                              if (fucResult) {
                                close();
                              }
                            }}
                            text={'저장'}
                          />
                        </ButtonDiv>
                      </PBody>
                    );
                  }}
                </PopupCustom>
              </SetDiv>
            </HeaderDiv>
            <TimeLogWrap>
              <DonutWrap>
                {/* <DonutChart_today
                  data={isAm ? donutData_am : donutData_pm}
                  color={isAm ? rgbBox_am : rgbBox_pm}
                  title={'Today           Time Log'}
                  // labels={[
                  //   'Deep Time',
                  //   '부재 시간' + '　' + '　' + '　' + '　',
                  //   '나머지 시간',
                  // ]}
                /> */}
                서비스 업데이트 중...
              </DonutWrap>
              <TotalTimeWrap>
                <TotalNumber>
                  <p style={{ marginBottom: '5px' }}>학습 시간</p>
                  <span>
                    {total_hour.length === 1 ? '0' + total_hour : total_hour} :{' '}
                    {total_min.length === 1 ? '0' + total_min : total_min}
                  </span>
                </TotalNumber>
                <TotalNumber>
                  {/* 목표 시간 */}/ {/* <br />
                  <span> */}
                  {target_hour.length === 1
                    ? '0' + target_hour
                    : target_hour} :{' '}
                  {target_min.length === 1 ? '0' + target_min : target_min}
                  {/* </span> */}
                </TotalNumber>
                {/* <DonutLabel>
                  <span style={{ color: '#0F4C82' }}>■</span> 학습 시간
                </DonutLabel>
                <DonutLabel>
                  <span style={{ color: 'rgba(233, 236, 244, 1)' }}>■</span>부재
                  시간
                </DonutLabel>
                <DonutLabel>
                  <span style={{ color: '#EAD6D4' }}>■</span> 나머지 시간
                </DonutLabel> */}
              </TotalTimeWrap>
              {/* <ClockBox>
                <Clock24 />
              </ClockBox>
              <TimeButton
                onClick={() => {
                  setIsAm(!isAm);
                }}
              >
                {isAm ? 'AM' : 'PM'}
              </TimeButton>
              <TodayPercent>{donutPercent}%</TodayPercent> */}
            </TimeLogWrap>
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
              <NextAndTool>
                <NextTimeDiv>
                  <IconWrap>
                    <NextSchedule />
                    <NextText>다음 스케줄</NextText>
                  </IconWrap>
                  <TimeIn>
                    <p>{nextTitle1}</p>
                    <p>{nextTitle2}</p>
                    <p>{next_TimeText}</p>
                    {break_boolean && (
                      <Countdown
                        date={Date.now() + break_countdown}
                        renderer={({ hours, minutes }) => (
                          <span style={{ color: 'red' }}>
                            시작 {hours > 0 && <span>{hours}시간 </span>}
                            {minutes}분 전
                          </span>
                        )}
                      />
                    )}
                  </TimeIn>
                </NextTimeDiv>
                <PopupCustom2
                  trigger={
                    <PopButton_custom
                      height={'30px'}
                      width={'100%'}
                      text={'스케줄 조정'}
                    />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => ScheToolView({ close })}
                </PopupCustom2>
              </NextAndTool>
            </NowNextWrap>
          </GraphDiv>
        </Wrapper>
      </TopWrap>
      {popupView && (
        <>
          <BlackBack />
          <CustomPopup>
            <PBody2>
              <PopupClose onClick={() => setPopupView(false)} custom={true} />
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
            </PBody2>
          </CustomPopup>
        </>
      )}
    </AllWrap>
  );
};
