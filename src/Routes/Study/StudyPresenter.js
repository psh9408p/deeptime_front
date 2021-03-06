import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import DonutChart_today from '../../Components/Charts/DonutChart_today';
import SumArray from '../../Components/Array/SumArray';
import twoArraySum from '../../Components/twoArraySum';
import ObjectCopy from '../../Components/ObjectCopy';
import RowBarChart_now from '../../Components/Charts/RowBarChart_now';
import moment from 'moment';
import {
  Flag,
  Delete,
  Add_12,
  Logo,
  Edit,
  Studying,
  Absence,
  PhoneUser,
  Phone,
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

const StatusWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  padding-left: 1px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  span {
    margin-left: 5px;
  }
`;

const PhoneText = styled.span`
  color: ${(props) => (props.phoneBool ? props.theme.redColor : 'black')};
`;

const StateWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 100%;
`;

const Animation = keyframes`
    0%{
        color: black;
    }
    50%{
        color: white;
    }
    100%{
        color: black;
    }
`;

const StateText = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
`;

const StateTextAni = styled(StateText)`
  animation: ${Animation} 2s linear;
  animation-iteration-count: infinite;
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
    margin-bottom: 10px;
    line-height: 30px;
    span {
      font-size: 35px;
      color: ${(props) => props.theme.classicBlue};
    }
  }

  &:nth-child(2) {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 100%;
  margin-right: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const LastTime = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  span {
    margin-left: 5px;
    /* color: ${(props) => props.theme.lightGreyColor}; */
  }
`;

const RowWrap = styled.div`
  width: 100%;
  margin-bottom: 15px;
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
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => props.theme.classicBlue};
  z-index: 99;
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
  z-index: 999;
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
let lastNow_Hour = 0;
let lastNow_Min = 0;
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
let phone_hour = 0;
let phone_min = 0;
// ????????? ?????????
let beep_scheId = '';
let beep_beforeTen = true; // true??? 10?????? ????????? ?????? ??????

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
  settingView,
  setSettingView,
  phoneBool,
}) => {
  // ?????????
  const [startPlay] = useSound(startSound);
  const [midPlay] = useSound(midSound);

  // ???????????? ??? ?????? ???????????? ????????? createdAt ????????????(????????? ?????? ????????? ?????????)
  for (let i = 0; i < myInfoData.followDates.length; i++) {
    const findUser = (a) => a.id === myInfoData.followDates[i].followId;
    const tmpIndex = myInfoData.following.findIndex(findUser);
    const createdDate = new Date(myInfoData.followDates[i].createdAt);
    myInfoData.following[tmpIndex].followingTime = createdDate.getTime();
    // ??????????????? ?????? ????????????
    myInfoData.following[tmpIndex].goWith = myInfoData.followDates[i].goWith;
    myInfoData.following[tmpIndex].followDateId = myInfoData.followDates[i].id;
  }
  // ???????????? ?????? ????????? ?????? ????????? ??????
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
  // dDay ??????
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

  // todolistData ???????????? ??????
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
  // todolistData ?????? ????????? ????????????
  todolistData.sort(function (a, b) {
    const word = '?????? ??????';
    return a.subject.name === word && b.subject.name !== word
      ? -1
      : a.subject.name !== word && b.subject.name === word
      ? 1
      : 0;
  });

  //todolist ??????????????? ????????? ??????
  let todolistData_new = [];
  let todolistData_finish = [];
  todolistData.map((todolist) => {
    if (todolist.finish) {
      todolistData_finish.push(todolist);
    } else {
      todolistData_new.push(todolist);
    }
  });
  //todolist_finish ?????? ?????? ????????? ??????(????????? ??????)
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
  // todolistData_finish ?????? ????????? ????????????
  todolistData_finish.sort(function (a, b) {
    const word = '?????? ??????';
    return a.subject.name === word && b.subject.name !== word
      ? -1
      : a.subject.name !== word && b.subject.name === word
      ? 1
      : 0;
  });

  // ????????? ??? ??????(subject)
  let task_tmp = subjectData.map((subject) => {
    if (subject.bookMark) {
      return subject;
    }
  });
  task_tmp = task_tmp.filter(function (el) {
    return el != undefined;
  });
  // ??????(subject) ???????????? ??????
  task_tmp.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  // ?????? ????????? ???????????????
  task_tmp.sort(function (a, b) {
    const word = '??????';
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
  // todolist ?????????
  const mySubjectList3 = useSelect([...listName_tmp], [...listId_tmp]);
  const stateBox = ['??????', '??????'];
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

    // ????????? ????????? ????????? ????????? ????????? ??????
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

    // ?????? ?????? ???????????? ????????? ??????
    if (nextScheduleIndex !== -1) {
      const nextSchedule = scheduleList_selectDay[nextScheduleIndex];
      const nextDate = new Date(nextSchedule.start);
      // 5??? ?????? ??? ????????? ?????? ??????
      const totalMin_next = nextDate.getHours() * 60 + nextDate.getMinutes();
      maxTermMin = totalMin_next - totalMin_now;
    } else {
      //24????????? 1440???
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
        alert('?????? ????????? ????????? ??? ????????????.');
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
      alert('?????? ???????????? ?????? ????????? 60????????????.');
      autoRefreshTerm.setValue(60);
      return;
    }
    if (
      startScheduleTerm_forSet.value % 5 !== 0 ||
      startScheduleTerm_forSet.value < 5
    ) {
      alert(
        '????????? ??????(??????) ????????? ?????? 5???, 5??? ????????? ??????????????????.\n???) 5???, 10???, 15???...',
      );
      return;
    } else if (
      extensionTerm_forSet.value % 5 !== 0 ||
      extensionTerm_forSet.value < 5
    ) {
      alert(
        '????????? ??????&?????? ????????? ?????? 5???, 5??? ????????? ??????????????????.\n???) 5???, 10???, 15???...',
      );
      return;
    }

    try {
      toast.info('????????? ?????? ?????? ???...');
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
        alert('????????? ????????? ????????? ??? ????????????.');
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
        toast.success('????????? ????????? ????????? ?????????????????????.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onExtensionSchedule = async ({ close }) => {
    // 5??? ?????? ?????? 5??? ??????
    if (extensionTerm.value < 5) {
      alert('???????????? ???????????? ?????? ?????? ????????? 5????????????.');
      return;
    } else if (extensionTerm.value % 5 !== 0) {
      alert('?????? ????????? 5??? ????????? ??????????????????.\n???) 5???, 10???, 15???...');
      return;
    }
    // ???????????? ???????????? ??? ?????? toast ??????
    toast.info('?????? ????????? ?????? ???...');
    // ????????? ???????????? ???????????? ???????????? ??? ?????? ???????????? ????????? ??????
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex === -1) {
      alert('?????? ?????? ?????? ???????????? ????????????.');
      return;
    }
    // ?????? ???????????? ??????
    const end = new Date(scheduleList_selectDay[nowScheduleIndex].end);
    const posibleMin = 1440 - (end.getHours() * 60 + end.getMinutes());
    if (end.getHours() === 0 && end.getMinutes() === 0) {
      alert('?????? ???????????? ?????? ????????? ??????????????????.');
      return;
    } else if (posibleMin < extensionTerm.value) {
      alert(`?????? ?????? ????????? ?????? ????????? ${posibleMin}????????????.`);
      extensionTerm.setValue(posibleMin);
      return;
    }
    // ????????????
    const start = new Date(scheduleList_selectDay[nowScheduleIndex].start);
    let deleteArray = [];
    let cutId = '';
    let cutTotalTime = 0;
    end.setTime(end.getTime() + extensionTerm.value * 60000);
    // ????????? ????????? ????????? ??????
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
          '????????? ?????? ??? ????????? ????????? ??????(??????)?????? ???????????? ???????????????.\n????????? ????????? ????????? ?????????????????????????',
        ) === false
      ) {
        return;
      }
    }

    // ????????? ?????? ????????? 10??? ???????????? 10??? ?????? ?????????
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
        alert('?????? ???????????? ????????? ??? ????????????.');
      } else {
        await myInfoRefetch();
        resetTenAlarm();
        toast.success('?????? ???????????? ??????????????????.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const tenExtensionSchedule = async () => {
    toast.info('?????? ????????? ?????? ???...');

    // ????????????
    const start = new Date(scheduleList_selectDay[nowScheduleIndex].start);
    const end = new Date(scheduleList_selectDay[nowScheduleIndex].end);
    let deleteArray = [];
    let cutId = '';
    let cutTotalTime = 0;
    end.setTime(end.getTime() + 600000); // 10??? ??????
    // ????????? ????????? ????????? ??????
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
        alert('?????? ???????????? ????????? ??? ????????????.');
        beep_beforeTen = true;
      } else {
        await myInfoRefetch();
        toast.success('?????? ???????????? ??????????????????.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onCutSchedule = async ({ close }) => {
    // 5??? ?????? ?????? 5??? ??????
    if (extensionTerm.value < 5) {
      alert('???????????? ???????????? ?????? ?????? ????????? 5????????????.');
      return;
    } else if (extensionTerm.value % 5 !== 0) {
      alert('?????? ????????? 5??? ????????? ??????????????????.\n???) 5???, 10???, 15???...');
      return;
    }
    // ???????????? ???????????? ??? ?????? toast ??????
    toast.info('?????? ????????? ?????? ???...');
    // ????????? ???????????? ???????????? ???????????? ??? ?????? ???????????? ????????? ??????
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex === -1) {
      alert('?????? ?????? ?????? ???????????? ????????????.');
      return;
    }
    // ????????? ?????? ?????? ?????? 5??? ????????? ?????? ????????? true
    let deleteBool = false;
    if (
      scheduleList_selectDay[nowScheduleIndex].totalTime / 60 -
        extensionTerm.value <
      5
    ) {
      if (
        window.confirm(
          '?????? ???????????? 5??? ???????????? ????????? ???????????????.\n????????? ????????? ????????? ?????????????????????????',
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
        alert('?????? ???????????? ????????? ??? ????????????.');
      } else {
        await myInfoRefetch();
        if (deleteBool) {
          toast.success('?????? ???????????? ??????????????????.');
        } else {
          toast.success('?????? ???????????? ??????????????????.');
        }
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onPullSchedule = async ({ close }) => {
    if (window.confirm('?????? ???????????? ??????????????????????') === false) {
      return;
    }

    // ???????????? ???????????? ??? ?????? toast ??????
    toast.info('?????? ????????? ????????? ???...');
    // ????????? ???????????? ???????????? ???????????? ??? ?????? ???????????? ????????? ??????
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex !== -1) {
      alert('?????? ???????????? ?????? ??? ?????? ???????????????.');
      return;
    } else if (nextScheduleIndex === -1) {
      alert('?????? ???????????? ????????????.');
      return;
    }
    // ?????? ?????? ??????
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
        alert('?????? ???????????? ?????? ??? ????????????.');
      } else {
        await myInfoRefetch();
        toast.success('?????? ???????????? ???????????????.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onStopSchedule = async ({ close }) => {
    // ???????????? ???????????? ??? ?????? toast ??????
    toast.info('?????? ????????? ????????? ???...');
    // ????????? ???????????? ???????????? ???????????? ??? ?????? ???????????? ????????? ??????
    await myInfoRefetch();
    await todayGraph_calculate();
    if (nowScheduleIndex === -1) {
      alert('?????? ?????? ?????? ???????????? ????????????.');
      return;
    }
    // ????????? ?????? ??????
    const end_origin = new Date();
    const end = new Date();
    end.setTime(end_origin.getTime());
    end.setSeconds(0);
    end.setMilliseconds(0);
    end.setMinutes(Math.floor(end.getMinutes() / 5) * 5);
    // ????????? ????????? ?????? ????????? 0~5 ????????? ???????????? ?????? ??????
    let deleteBool = false;
    const start_schedule = new Date(
      scheduleList_selectDay[nowScheduleIndex].start,
    );
    if (end_origin.getTime() - start_schedule.getTime() < 300000) {
      if (
        window.confirm(
          '?????? ???????????? ????????? ??? 5??? ???????????? ???????????????.\n????????? ???????????? ??????????????????????',
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
        alert('?????? ???????????? ?????? ??? ????????????.');
      } else {
        await myInfoRefetch();
        toast.success('?????? ???????????? ???????????????.');
        close();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onStartSchedule = async ({ close }) => {
    if (mySubjectList2.option === '') {
      alert('?????? ????????? ?????? ???????????????.');
      return;
    }

    try {
      setOnLoading(true);

      // 5??? ?????? ?????? 5??? ??????
      if (startScheduleTerm.value < 5) {
        alert('???????????? ???????????? ?????? ?????? ????????? 5????????????.');
        return;
      } else if (startScheduleTerm.value % 5 !== 0) {
        alert('????????? ????????? 5??? ????????? ??????????????????.\n???) 5???, 10???, 15???...');
        return;
      }
      // ???????????? ???????????? ??? ?????? toast ??????
      toast.info('????????? ???????????? ?????? ???...');
      // ????????? ???????????? ???????????? ???????????? ??? ?????? ???????????? ????????? ??????
      await myInfoRefetch();
      await todayGraph_calculate();
      if (nowScheduleIndex !== -1) {
        alert(
          '?????? ?????? ?????? ???????????? ????????????.\n?????? ????????? ????????? ??? ??????????????????.',
        );
        return;
      }
      // ?????? ??????
      if (scheduleTitle.value.includes('/')) {
        alert(
          "To Do List??? 1?????? ?????? ???????????????.\n???, '/'??? ????????? ??????????????????.",
        );
        return;
      }
      // ?????? ????????? ?????? ???????????? ?????? ??????
      const nowDate = new Date();
      const maxTime = maxTimeCal(nowDate);
      if (maxTime < startScheduleTerm.value) {
        alert(`?????? ????????? ?????? ?????? ????????? ${maxTime}??? ?????????.`);
        startScheduleTerm.setValue(maxTime);
        return;
      }
      // ?????? ?????? ??????
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
        alert('???????????? ????????? ??? ????????????.');
      } else {
        await myInfoRefetch();
        mySubjectList2.setOption(mySubjectList2.valueList[0]);
        stateList.setOption('??????');
        scheduleTitle.setValue('');
        startScheduleTerm.setValue(30);
        toast.success('????????? ???????????? ?????????????????????.');
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
      alert('????????? ???????????????.');
      return;
    } else if (todolistName.value === '') {
      alert('????????? ???????????????.');
      return;
    }

    try {
      toast.info('????????? To Do??? ?????? ???...');
      const {
        data: { addTodolist },
      } = await addTodolistMutation({
        variables: {
          name: todolistName.value,
          subjectId: mySubjectList2.option,
        },
      });
      if (!addTodolist) {
        alert('To Do??? ????????? ??? ????????????.');
      } else {
        await todolistRefetch();
        await todolistClear();
        toast.success('????????? To Do??? ?????????????????????.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onTodolistDelete = async (todolistId) => {
    if (window.confirm('????????? To Do??? ?????????????????????????') === false) {
      return;
    }

    try {
      toast.info('To Do??? ?????? ???...');
      const {
        data: { deleteTodolist },
      } = await deleteTodolistMutation({
        variables: {
          todolistId: todolistId === '' ? todoModiId : todolistId,
        },
      });
      if (!deleteTodolist) {
        alert('To Do??? ????????? ??? ????????????.');
      } else {
        await todolistRefetch();
        toast.success('To Do??? ?????????????????????.');
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
      alert('?????? ????????? ?????? ???????????????.');
      return;
    }

    try {
      toast.info('To Do??? ?????? ???...');
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
        alert('To Do??? ????????? ??? ????????????.');
      } else {
        await todolistRefetch();
        toast.success('To Do??? ?????????????????????.');
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
      toast.info('To Do??? ?????? ???...');
      const {
        data: { finishTodolist },
      } = await finishTodolistMutation({
        variables: {
          todolistId,
        },
      });
      if (!finishTodolist) {
        alert('To Do??? ????????? ??? ????????????.');
      } else {
        await todolistRefetch();
        toast.success('To Do??? ?????????????????????.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  // To do list ????????? ????????????
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

  // // ?????? ?????? & 10?????? ?????? ??????
  const beepAlert = () => {
    if (nowScheduleIndex !== -1 && autoRefresh && scheAlarm) {
      const beep_nowSche = scheduleList_selectDay[nowScheduleIndex];
      const beep_endDate = new Date(beep_nowSche.end);
      // ????????? ????????? ???????????????
      if (beep_scheId === beep_nowSche.id) {
        // 10??? ?????? ?????? ????????????
        if (!beep_beforeTen) {
          // ?????? ????????? ??? ????????? 10??? ????????????
          if (beep_endDate.getTime() - nowDate_tmp.getTime() <= 600000) {
            midPlay();
            toast.error('?????? ???????????? 10??? ????????? ???????????????.');
            beep_beforeTen = true;
            // if (
            //   beep_endDate.getHours() === 23 &&
            //   beep_endDate.getMinutes() > 50
            // ) {
            //   alert('?????? ???????????? 10??? ???????????????.');
            // } else {
            //   if (
            //     window.confirm(
            //       '?????? ???????????? 10??? ???????????????.\n10?????? ?????????????????????????',
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
        toast.info('????????? ???????????? ??????????????????.');
        beep_scheId = beep_nowSche.id;
        // ????????? ???????????? ??? ????????? 10??? ?????? ????????? 10??? ?????? ????????? ????????? ??? ??????
        if (beep_nowSche.totalTime / 60 > 10) {
          beep_beforeTen = false;
        }
      }
    }
  };

  //????????? ??????
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

    // ?????? ?????? ??????
    const nowDate = new Date();
    const findShedule = (i) =>
      new Date(i.start) <= nowDate && new Date(i.end) > nowDate;
    nowScheduleIndex = scheduleList_selectDay.findIndex(findShedule);
    // ?????? ?????? ??????
    const findShedule_next = (i) => nowDate < new Date(i.start);
    nextScheduleIndex = scheduleList_selectDay.findIndex(findShedule_next);
  };

  const todayGraph_calculate = () => {
    // ?????????
    donutData = [];
    donutData_am = [];
    donutData_pm = [];
    donutPercent = 0;
    rgbBox = [];
    rgbBox_am = [];
    rgbBox_pm = [];
    // ?????? ????????? ????????? ?????? ????????? ?????????
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
    // today Time ?????? ?????? ?????? 0??? Time ???????????????
    const zeroTime = {
      existTime: 0,
      phoneTime: 0,
      sleepTime: 0,
      time_24: new Array(288).fill(0),
    };
    if (indexOfToday === -1) {
      myInfoData.times.push(zeroTime);
      indexOfToday = myInfoData.times.length - 1;
    }
    if (indexOfNextday === -1) {
      myInfoData.times.push(zeroTime);
      indexOfNextday = myInfoData.times.length - 1;
    }

    const todayTime = myInfoData.times[indexOfToday];
    const nextdayTime = myInfoData.times[indexOfNextday];

    // nowSchedule ??????
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
        (nowSchedule.subject ? nowSchedule.subject.name : '?????? ??????') +
        ' (' +
        nowSchedule.title +
        ')';
      nowTitle2 =
        moment(startPoint).format('hh:mma') +
        ' ~ ' +
        moment(endPoint).format('hh:mma');
      // ??????????????? ????????? ?????? ??????
      const nowDate = new Date();
      let lastMin = Math.ceil((endPoint.getTime() - nowDate.getTime()) / 60000);
      lastNow_Hour = String(Math.floor(lastMin / 60));
      lastMin = lastMin - lastNow_Hour * 60;
      lastNow_Min = String(lastMin);
    } else {
      nowScheduleTime = 0;
      nowScheduleTimeT = 0;
      nowScheduleColor = 'rgba(123, 169, 235, 1)';
      nowTitle1 = '?????? ????????? ??????';
      nowTitle2 = '';
    }
    // nextSchedule ??????
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
      // breakTime ??????
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
      nextTitle1 = '????????? ??????';
      nextTitle2 = '';
      next_TimeText = '';
      break_boolean = false;
    }
    // breakTime ??????
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

    // ????????? ??? ????????? ??????
    let resultArray_schedule = []; // exist ?????? ???
    let resultArray_scheduleT = []; // ???????????????
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
      //?????? 2?????? ?????? ??????????????????
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
          : '?????? ??????',
      );
      // ???????????? ?????? ????????? ??????
      if (duplIndex === -1) {
        schedule_label.push(
          scheduleList_selectDay[j].subject
            ? scheduleList_selectDay[j].subject.name
            : '?????? ??????',
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

    // ???????????? ??????
    // let slicedTimeBox = [];
    // let slicedTimes = ObjectCopy(todayTime.time_24);
    // while (true) {
    //   const index_tmp = slicedTimes.findIndex((i) => i > 0);
    //   if (index_tmp === -1) {
    //     slicedTimeBox.push(slicedTimes);
    //     const nowDateMin_count =
    //       Math.floor(
    //         (new Date().getHours() * 60 + new Date().getMinutes()) / 5,
    //       ) + 1;
    //     if (nowDateMin_count === 288) {
    //       // ????????? 23??? 55??? ??????????????? ???
    //       rgbBox.push('rgba(233, 236, 244, 1)'); // ??????
    //       break; // ??????????????? ??????
    //     } else {
    //       const lastIndex = 288 - nowDateMin_count; // ?????? ????????? ?????? ????????? ???????????? ???????????? ??????
    //       const lastZeroTime = slicedTimeBox[slicedTimeBox.length - 1];
    //       if (lastZeroTime.length - lastIndex === 0) {
    //         // ?????? ?????????????????? ?????? ?????? ????????? ??? ?????????????????? ??????
    //         rgbBox.push('#EAD6D4'); // ????????? ?????? ?????? ??????
    //         break; // ?????? ?????????????????? ??????
    //       } else {
    //         const grayTime = lastZeroTime.slice(
    //           0,
    //           lastZeroTime.length - lastIndex,
    //         );
    //         const blueTime = lastZeroTime.slice(
    //           lastZeroTime.length - lastIndex,
    //         );
    //         slicedTimeBox[slicedTimeBox.length - 1] = grayTime;
    //         slicedTimeBox.push(blueTime);
    //         rgbBox.push('rgba(233, 236, 244, 1)'); // ??????
    //         rgbBox.push('#EAD6D4'); // ????????? ?????? ?????? ??????
    //         break; // ?????? ?????????????????? ??????
    //       }
    //     }
    //   } else {
    //     if (index_tmp !== 0) {
    //       // 0??? ????????? ???????????? ????????? ???????????? ??????
    //       slicedTimeBox.push(slicedTimes.slice(0, index_tmp));
    //       rgbBox.push('rgba(233, 236, 244, 1)'); // ??????
    //       slicedTimes = slicedTimes.slice(index_tmp);
    //     }
    //     const index_tmp2 = slicedTimes.findIndex((i) => i === 0);
    //     if (index_tmp2 === -1) {
    //       slicedTimeBox.push(slicedTimes);
    //       rgbBox.push('#0F4C82'); // ????????? ?????? ????????????
    //       break; // ?????????????????? ??????
    //     } else {
    //       const studyTime = slicedTimes.slice(0, index_tmp2);
    //       slicedTimeBox.push(studyTime);
    //       rgbBox.push('#0F4C82'); // ????????? ?????? ????????????
    //       slicedTimes = slicedTimes.slice(index_tmp2);
    //     }
    //   }
    // }
    // donutData = slicedTimeBox.map((a) => a.length * 5);

    // ?????? ????????? am pm ??????????????????
    // let timeSum = 0;
    // let midCheck = false; // ?????? ?????? ?????? ?????????????????? ??????
    // for (let z = 0; z < donutData.length; z++) {
    //   const time = donutData[z];
    //   const rgb = rgbBox[z];
    //   const preSum = ObjectCopy(timeSum);
    //   timeSum = preSum + time;

    //   // 24????????? 1440??? ????????? 720???
    //   if (timeSum < 720) {
    //     donutData_am.push(time);
    //     rgbBox_am.push(rgb);
    //   } else if (timeSum === 720) {
    //     donutData_am.push(time);
    //     rgbBox_am.push(rgb);
    //     midCheck = true;
    //   } else {
    //     // timeSum > 720
    //     if (midCheck) {
    //       donutData_pm.push(time);
    //       rgbBox_pm.push(rgb);
    //     } else {
    //       const pmTime = preSum + time - 720;
    //       const amTime = time - pmTime;
    //       donutData_am.push(amTime);
    //       donutData_pm.push(pmTime);
    //       rgbBox_am.push(rgb);
    //       rgbBox_pm.push(rgb);
    //       midCheck = true;
    //     }
    //   }
    // }

    // ????????? ???????????? ???????????? ??????
    const targetTime = SumArray(taskArray_scheduleT) * 60;
    // if (targetTime === 0) {
    //   donutPercent = 0;
    // } else {
    //   donutPercent = ((todayTime.existTime / targetTime) * 100).toFixed(0);
    // }

    // ??? ??????, ?????? ?????? ?????? ??????
    let targetTime_min = targetTime / 60;
    target_hour = String(Math.floor(targetTime_min / 60));
    targetTime_min = targetTime_min - target_hour * 60;
    target_min = String(Math.floor(targetTime_min));
    let existTime_min = todayTime.existTime / 60;
    total_hour = String(Math.floor(existTime_min / 60));
    existTime_min = existTime_min - total_hour * 60;
    total_min = String(Math.floor(existTime_min));
    let phoneTime_min = todayTime.phoneTime / 60;
    phone_hour = String(Math.floor(phoneTime_min / 60));
    phoneTime_min = phoneTime_min - phone_hour * 60;
    phone_min = String(Math.floor(phoneTime_min));
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
    //         <RoundNameDiv2>To Do List ?????? ????</RoundNameDiv2>
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
          text={indiUser.goWith ? '?????????' : '??????'}
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
      <PTitle text={'????????? ??????'} />
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
                      <BookLeft>??????</BookLeft>
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
              placeholder={'(??????) ??????'}
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
            ???&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            text={'????????? ??????'}
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
              ?????? ????????????&nbsp;&nbsp;
              <Input_100
                placeholder={''}
                {...extensionTerm}
                type={'number'}
                step={5}
                width={'80px'}
                height={'25px'}
                bgColor={'white'}
              />
              ???
            </ControlTop1>
            <ControlTop2>
              <Button_custom
                text={'??????'}
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
                text={'??????'}
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
              text={'?????? ????????? ??????'}
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
              text={'?????? ????????? ??????'}
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
          <Input placeholder={'?????? (???: 1?????? ??????)'} {...todoModiName} />
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
    // view??? sche??? ??????????????? TODO ??????, todo??? TO DO ?????? ??????
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
      <PTitle text={'????????? To Do List'} />
      <TodolistTitle2>
        <BookLeft>??????</BookLeft>
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
                <VideoText>????????? ?????? ??????</VideoText>
                <span style={{ color: '#DB4437' }}>
                  (????????? ?????? ?????? ??? ????????????)
                </span>
              </div>
            ) : (
              <div style={{ paddingTop: '100px' }}>
                <Loader />
                <br />
                <VideoText>????????? ?????????...</VideoText>
                <span style={{ color: '#DB4437' }}>
                  (?????? ??? ??????, ?????? ??????!!!)
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
                {dDayOn ? (
                  <>
                    <DName>{dDateName.value}</DName>
                    <DNumber
                      onClick={() => {
                        setSettingView(true);
                      }}
                    >
                      {realDDay === 0
                        ? 'D-day'
                        : realDDay > 0
                        ? `D+${realDDay}`
                        : `D${realDDay}`}
                    </DNumber>
                  </>
                ) : (
                  <DNumber
                    onClick={() => {
                      setSettingView(true);
                    }}
                  >
                    D-day
                  </DNumber>
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
                      color={'#0F4C82'}
                      fontWeight={'bold'}
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
                                  <p>?????????</p>
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
                            placeholder={'?????? (???: 1?????? ??????)'}
                            {...todolistName}
                          />
                        </InputWrapper2>
                        <Button_custom
                          text={'??????'}
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
                        <BookLeft>??????</BookLeft>
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
                    todolistRefetch();
                  }}
                />
                <Button_setting
                  onClick={() => {
                    setSettingView(true);
                  }}
                  margin={'0'}
                />
                <PopupCustom
                  open={settingView}
                  onClose={() => {
                    setSettingView(false);
                  }}
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => {
                    return (
                      <PBody>
                        <PopupClose onClick={() => close()} />
                        <PTitle text={'????????? ??????'} />
                        <SetContentWrap>
                          <SetContentBox>
                            ????????? ?????? :<p>???</p>
                            <Select
                              {...camList}
                              id={'camselect_id'}
                              width={'250px'}
                              height={'32px'}
                            />
                          </SetContentBox>
                          <SetContentBox>
                            D-day :???
                            <Switch
                              on={true}
                              off={false}
                              value={dDayOn}
                              onChange={dDaySwitch}
                            />
                            <p>???</p>
                            <Input_100
                              width={'120px'}
                              height={'32px'}
                              bgColor={'#FAFAFA'}
                              placeholder={'?????? (15??? ??????)'}
                              {...dDateName}
                            />
                            <p>???</p>
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
                            ?????? ????????? ?????? ?????? ???????????? :???
                            <Switch
                              on={true}
                              off={false}
                              value={nonScheduleRecord}
                              onChange={recordSwitch}
                            />
                          </SetContentBox>
                          <SetContentBox>
                            ??????????????? ?????? ???????????? :???
                            <Switch
                              on={true}
                              off={false}
                              value={timelapse}
                              onChange={timelapseSwitch}
                            />
                          </SetContentBox>
                          <SetContentBox>
                            ?????? ???????????? :???
                            <Switch
                              on={true}
                              off={false}
                              value={autoRefresh}
                              onChange={autoSwitch}
                            />
                            <p>???</p>
                            {/* <RefreshInputWrap>
                              <Input_100
                                placeholder={''}
                                {...autoRefreshTerm}
                                type={'number'}
                              />
                            </RefreshInputWrap>
                            ??? */}
                            {autoRefresh && (
                              <>
                                /<p>???</p>????????? ?????? :???
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
                            ????????? ??????(??????) ?????? :???
                            <RefreshInputWrap>
                              <Input_100
                                placeholder={''}
                                {...startScheduleTerm_forSet}
                                type={'number'}
                                step={5}
                              />
                            </RefreshInputWrap>
                            ???
                          </SetContentBox>
                          <SetContentBox>
                            ????????? ??????&amp;?????? ?????? :???
                            <RefreshInputWrap>
                              <Input_100
                                placeholder={''}
                                {...extensionTerm_forSet}
                                type={'number'}
                                step={5}
                              />
                            </RefreshInputWrap>
                            ???
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
                            text={'??????'}
                          />
                        </ButtonDiv>
                      </PBody>
                    );
                  }}
                </PopupCustom>
              </SetDiv>
            </HeaderDiv>
            <TimeLogWrap>
              {aniBool ? (
                <StateWrap>
                  <Absence />
                  <StateTextAni>AI ?????????...</StateTextAni>
                </StateWrap>
              ) : // phoneBool ? (
              //   <StateWrap>
              //     <PhoneUser />
              //     <StateText>??????????????? ??????</StateText>
              //   </StateWrap>
              // ) :
              studyBool ? (
                <StateWrap>
                  <Studying />
                  <StateText>?????????</StateText>
                </StateWrap>
              ) : (
                <StateWrap>
                  <Absence />
                  <StateText>?????????...</StateText>
                </StateWrap>
              )}
              <TotalTimeWrap>
                <TotalNumber>
                  <p style={{ marginBottom: '5px' }}>?????? ??????</p>
                  <span>
                    {total_hour.length === 1 ? '0' + total_hour : total_hour} :{' '}
                    {total_min.length === 1 ? '0' + total_min : total_min}
                  </span>
                </TotalNumber>
                <TotalNumber>
                  <p style={{ marginBottom: '5px' }}>?????? ??????</p>
                  <span>
                    {target_hour.length === 1 ? '0' + target_hour : target_hour}{' '}
                    : {target_min.length === 1 ? '0' + target_min : target_min}
                  </span>
                </TotalNumber>
                <StatusWrap>
                  <Phone size={'20'} />
                  <PhoneText phoneBool={phoneBool}>
                    {phone_hour.length === 1 ? '0' + phone_hour : phone_hour} :{' '}
                    {phone_min.length === 1 ? '0' + phone_min : phone_min}
                  </PhoneText>
                </StatusWrap>
              </TotalTimeWrap>
            </TimeLogWrap>
            <NowNextWrap>
              <BarWrap>
                <RowWrap>
                  <RowBarChart_now
                    title1={nowTitle1}
                    title2={nowTitle2}
                    data_1={nowScheduleTime}
                    data_2={nowScheduleTimeT}
                    scheduleColor={nowScheduleColor}
                  />
                </RowWrap>
                {nowTitle2 !== '' && (
                  <LastTime>
                    ?????? ?????? :
                    <span>
                      {lastNow_Hour !== '0' && `${lastNow_Hour}??????`}{' '}
                      {lastNow_Min}???
                    </span>
                  </LastTime>
                )}
              </BarWrap>
              <NextAndTool>
                <NextTimeDiv>
                  <IconWrap>
                    <NextText>?????? ?????????</NextText>
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
                            ?????? {hours > 0 && <span>{hours}?????? </span>}
                            {minutes}??? ???
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
                      bgColor={'#0F4C82'}
                      color={'white'}
                      text={'????????? ??????'}
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
              <PTitle text={'????????? ??????'} />
              {myInfoData.following.length === 0 ? (
                <NonFollow>??????????????? ????????? ????????????</NonFollow>
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
