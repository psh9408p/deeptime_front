import React, { useCallback, useEffect, useState, forwardRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ObjectUnassign from '../../../../Components/ObjectUnassign';
import Popup from 'reactjs-popup';
import TUICalendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Select from '../../../../Components/Select';
import todayDateRange from '../../../../Components/Date/todayDateRange';
import Button_blue from '../../../../Components/Buttons/Button_blue';
import Button_red from '../../../../Components/Buttons/Button_red';
import Button_custom from '../../../../Components/Buttons/Button_custom';
import Input from '../../../../Components/Input';
import Input_100 from '../../../../Components/Input_100';
import PopupButton from '../../../../Components/Buttons/PopupButton';
import PopupButton_solo from '../../../../Components/Buttons/PopupButton_solo';
import PopButton_100 from '../../../../Components/Buttons/PopButton_100';
import PopButton_custom from '../../../../Components/Buttons/PopButton_custom';
import PopupClose from '../../../../Components/Buttons/PopupClose';
import FatText from '../../../../Components/FatText';
import { toast } from 'react-toastify';
import { SwatchesPicker } from 'react-color';
import useSelect from '../../../../Hooks/useSelect';
import { FixedSizeList as BookmarkList, DaymarkList } from 'react-window';
import CheckBox from '../../../../Components/CheckBox';
import ObjectCopy from '../../../../Components/ObjectCopy';
import { Delete, Flag, Next, Study_false } from '../../../../Components/Icons';
import {
  Button_refresh,
  Button_setting,
  Button_copy,
  Button_copy2,
} from '../../../../Components/Buttons/Button_click';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import useInput from '../../../../Hooks/useInput';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import WeekRange from '../../../../Components/Date/WeekRange';
import Loader from '../../../../Components/Loader';
import { sum } from '@tensorflow/tfjs';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  position: relative;
`;

const LoaderWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlButton = styled.button`
  border: ${(props) => props.theme.boxBorder};
  height: 30px;
  width: 80px;
  border-radius: 15px;
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 15px;

  background-color: white;
  cursor: pointer;
  :focus {
    outline: none;
    box-shadow: 0 0 0 1px black;
  }
  &:not(:first-child) {
    margin-left: 5px;
  }
  &:nth-child(2) {
    width: 30px;
    background: url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/Previous_icon.png')
      no-repeat;
    background-color: white;
    background-position: center center;
    background-size: 15px;
  }
  &:nth-child(3) {
    width: 30px;
    background: url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/Next_icon.png')
      no-repeat;
    background-color: white;
    background-position: center center;
    background-size: 15px;
    margin-right: 10px;
  }
`;

const PanelWrap = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0px 5px 0px;
`;

const DateRangeWrap = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 100%;
  min-width: 200px;
  margin-left: auto;
`;

const SaveButtonDiv = styled.div`
  width: 40px;
`;

const SubjectButtonDiv = styled.div`
  width: 100px;
  height: 35px;
  margin-right: 10px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 440px !important;
    height: 480px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom5 = styled(PopupCustom)`
  &-content {
    width: 400px !important;
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    width: 400px !important;
    height: 530px !important;
  }
`;

const PopupCustom3 = styled(PopupCustom)`
  &-content {
    width: 260px !important;
    height: 180px !important;
  }
`;

const PopupCustom4 = styled(PopupCustom)`
  &-content {
    width: 480px !important;
    height: 130px !important;
  }
`;

const PopupCustom6 = styled(PopupCustom)``;

const PopupCustom7 = styled(PopupCustom)`
  &-content {
    width: 300px !important;
    height: 200px !important;
  }
`;

const PopupCustom8 = styled(PopupCustom)`
  &-content {
    width: 460px !important;
    height: 180px !important;
  }
`;

const PopupCustom9 = styled(PopupCustom)`
  &-content {
    width: 360px !important;
    height: 110px !important;
  }
`;

const PopupCustom10 = styled(PopupCustom)`
  &-content {
    width: 410px !important;
    height: 170px !important;
  }
`;

const PBody2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const PBody = styled(PBody2)``;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: 320px;
  margin-bottom: 20px;
`;

const InputWrapper2 = styled.div`
  margin-left: 10px;
  width: 225px;
`;

const ColorWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled(FatText)`
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

const SelectWrapDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectWrapDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  width: 200px;
  height: 35px;
  margin-bottom: 30px;
`;

const SelectWrapper2 = styled(SelectWrapper)`
  margin-bottom: 10px;
`;

const SelectWrapper3 = styled.div`
  width: 123px;
  height: 35px;
`;

const ThreeButtonWrap = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RedButtonWrap = styled.div`
  width: 68px;
  margin: 0px 0px 10px 10px;
`;

const SpaceDiv = styled.div`
  width: 10px;
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const IndiviList = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  height: 100%;
  background-color: ${(props) => (props.isOdd ? '#FAFAFA' : '#c7c7c7')};
`;

const BookMarkTitle = styled.div`
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 372px;
  height: 25px;
  color: white;
  background-color: ${(props) => props.theme.classicBlue};
  border-top-right-radius: ${(props) => props.theme.borderRadius};
  border-top-left-radius: ${(props) => props.theme.borderRadius};
`;

const TodolistTitle = styled(BookMarkTitle)`
  width: 452px;
`;

const TodolistTitle2 = styled(BookMarkTitle)`
  width: 492px;
`;

const BookLeft = styled.div`
  display: flex;
  align-items: center;
  width: 133px;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  padding-left: 15px;
  border-right: 2px solid white;
`;

const BookRight = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  height: 100%;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  border-right: 2px solid white;
`;

const FinishDateDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  border-right: 2px solid white;
`;

const BookLeft2 = styled(BookLeft)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57px;
  padding: 0;
`;

const BookRight2 = styled(BookRight)`
  width: 315px;
`;

const BookRight3 = styled(BookRight)`
  width: 220px;
  height: 100%;
  border-right: 2px solid white;
`;

const ColorBox = styled.div`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  background-color: ${(props) => props.bgColor};
  margin-right: 10px;
  border-radius: ${(props) => props.radius};
`;

const ColorBox2 = styled(ColorBox)`
  margin-left: 10px;
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
`;

const TaskNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 255px;
  height: 100%;
`;

const NewTodoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 450px;
  height: 40px;
  margin-bottom: 20px;
`;

const TaskName_todo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 90px;
  padding-right: 10px;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
`;

const TodoNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  height: 100%;
  padding: 0 10px;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
`;

const TodoIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
`;

const TodoIconDiv2 = styled(TodoIconDiv)`
  &:last-child {
    justify-content: flex-start;
  }
`;

const TodoFinishDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  padding-left: 10px;
  font-size: 16px;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
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

const WeekWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const DateIndi = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const NextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32.5px;
  width: 20%;
`;

const DatePickButton = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicGray};
  margin: ${(props) => props.margin};
  font-weight: 600;
  color: black;
  text-align: center;
  padding: 7px 10px;
  font-size: 12px;
  width: ${(props) => props.width};
  cursor: pointer;
`;

const DayWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const DayIndiWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SelectInL = styled.div`
  width: 143px;
  height: 28px;
  margin-right: 17px;
`;

const SelectInR = styled.div`
  width: 50px;
  height: 28px;
`;

const NewScheContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 210px;
  height: 25px;
  margin-bottom: 5px;
  font-weight: 600;
  margin-top: 10px;
`;

const DateTotalDiv = styled(NewScheContent)`
  height: auto;
`;

const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`;

const DateContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateContent2 = styled(DateContent)`
  justify-content: flex-end;
`;

const SelectWrap = styled(NewScheContent)`
  margin-top: 20px;
`;

const BlackBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomPopup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 310px;
  height: 410px;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
`;

const CustomPopup2 = styled(CustomPopup)`
  border-top: 4px solid ${(props) => props.color};
  height: auto;
  width: 390px;
  padding: 20px;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  p {
    &:first-child {
      font-size: 18px;
      font-weight: bold;
      color: ${(props) => props.color};
      margin-bottom: 5px;
    }
    &:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &:nth-child(3) {
      font-size: 15px;
      margin-bottom: 5px;
    }
    &:last-child {
      color: ${(props) => props.theme.darkGreyColor};
    }
  }
`;

const TimeText = styled.span`
  color: ${(props) => (props.timeError ? 'red' : 'black')};
`;

let newScheduleArray = [];
let schedules = [];
let calendars = [];

let isFirstRun = true;
let isRefectRun = false;
let isRefectRun2 = false;
const dayList = ['일', '월', '화', '수', '목', '금', '토'];
const fivemin = 1000 * 60 * 5;

export default ({
  cal,
  startRange,
  setStartRange,
  endRange,
  setEndRange,
  subjectName,
  todolistName,
  subjectColor,
  setSubjectColor,
  handleChangeComplete,
  scheduleList,
  scheduleRefetch,
  schedulenetwork,
  subjectList,
  subjectRefetch,
  subjectnetwork,
  todolistData,
  todolistRefetch,
  scheduleStart,
  scheduleEnd,
  scheHeight,
  lastStart,
  lastEnd,
  copyBool,
  setCopyBool,
  copyDate,
  setCopyDate,
  pasteDate,
  setPasteDate,
  copyStart,
  copyEnd,
  pasteStart,
  pasteEnd,
  copyOne,
  setCopyOne,
  pasteOne,
  setPasteOne,
  dayBool,
  setDayBool,
  sTime,
  setSTime,
  eTime,
  setETime,
  stateList,
  scheTitle,
  scheLocation,
  makeView,
  setMakeView,
  nowDate,
  infoView,
  setInfoView,
  infoSche,
  setInfoSche,
  modiView,
  setModiView,
  scheLoading,
  setScheLoading,
  timeError,
}) => {
  // subjectlist 오름차순 정렬
  subjectList.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  // subjectlist 기타가 아래로오게
  subjectList.sort(function (a, b) {
    const word = '기타';
    return a.name !== word && b.name === word
      ? -1
      : a.name === word && b.name !== word
      ? 1
      : 0;
  });

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
  // todolistData Task 없음이 위로오게
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
  // todolistData_finish Task 없음이 위로오게
  todolistData_finish.sort(function (a, b) {
    const word = '과목 없음';
    return a.subject.name === word && b.subject.name !== word
      ? -1
      : a.subject.name !== word && b.subject.name === word
      ? 1
      : 0;
  });

  // 과목 전용 리스트
  const mySubjectList = useSelect(
    subjectList.map((List) => `${List.name}`),
    subjectList.map((List) => `${List.id}`),
  );
  // TOdolist에 쓸 과목 전용(북마크 필터)
  let todoTask_tmp = subjectList.map((subject) => {
    if (subject.bookMark) {
      return subject;
    }
  });
  todoTask_tmp = todoTask_tmp.filter(function (el) {
    return el !== undefined;
  });
  const listName_tmp = todoTask_tmp.map((List) => `${List.name}`);
  const listId_tmp = todoTask_tmp.map((List) => `${List.id}`);
  const mySubjectList2 = useSelect([...listName_tmp], [...listId_tmp]);

  const todolistClear = () => {
    todolistName.setValue('');
    mySubjectList2.setOption('');
  };

  const subjectClear = () => {
    subjectName.setValue('');
    setSubjectColor(`#0F4C82`);
    mySubjectList.setOption(mySubjectList.valueList[0]);
  };

  const subjectLoad = () => {
    subjectName.setValue(subjectList[mySubjectList.optionIndex].name);
    setSubjectColor(subjectList[mySubjectList.optionIndex].bgColor);
  };

  // 스케줄 초기화
  const clearSchedule = () => {
    setDayBool(
      dayList.map((_, index) => {
        return nowDate.getDay() === index ? true : false;
      }),
    );
    mySubjectList2.setOption(mySubjectList2.valueList[0]);
    stateList.setOption('자습');
    scheTitle.setValue('');
    scheLocation.setValue('');
    setSTime(new Date(Math.ceil(nowDate.getTime() / fivemin) * fivemin));
    setETime(
      new Date(Math.ceil(nowDate.getTime() / fivemin) * fivemin + fivemin),
    );
  };

  // 스케줄 수정 시 값 넣어주기
  const inputSchedule = (Sche) => {
    setDayBool(
      dayList.map((_, index) => {
        return Sche.start._date.getDay() === index ? true : false;
      }),
    );
    mySubjectList2.setOption(Sche.calendarId);
    stateList.setOption(Sche.state);
    scheTitle.setValue(Sche.title);
    scheLocation.setValue(Sche.location);
    setSTime(Sche.start._date);
    setETime(Sche.end._date);
  };

  //스케줄 가공 전처리
  const schePreTreat = ({ sches, diffTime = 0 }) => {
    let checkEmpty = true;
    const tmpSchedules = sches.map((sche) => {
      if (sche.calendarId === '') {
        checkEmpty = false;
      }
      delete sche.category;
      delete sche.raw;
      delete sche.dueDateClass;
      delete sche.isVisible;
      delete sche.bgColor;
      delete sche.borderColor;
      delete sche.dragBgColor;
      delete sche.color;
      sche.totalTime = (sche.end.getTime() - sche.start.getTime()) / 1000;
      sche.option = 'create';
      if (diffTime !== 0) {
        sche.start.setTime(sche.start.getTime() + diffTime);
        sche.end.setTime(sche.end.getTime() + diffTime);
      }
      const generateId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      sche.id = generateId;
      return sche;
    });

    if (!checkEmpty) {
      return false;
    }
    return tmpSchedules;
  };

  //과목 종류 넣기
  const inputCalendars = () => {
    const calendars_tmp = subjectList.map((subject) => {
      if (subject.bookMark) {
        return subject;
      }
    });
    calendars = calendars_tmp.filter(function (el) {
      return el !== undefined;
    });
  };

  //스케줄 넣기
  const inputSchedules = () => {
    schedules = scheduleList.map((List) => {
      let category = 'time';
      const endDate = new Date(List.end);
      if (List.isAllDay === true) {
        category = 'allday';
        endDate.setTime(endDate.getTime() - 1000);
      }
      const schedule_tmp = {
        calendarId: List.subject ? List.subject.id : '',
        isAllDay: List.isAllDay,
        isPrivate: List.isPrivate,
        category,
        location: List.location,
        isVisible: true,
        title: List.title,
        state: List.state,
        id: List.id,
        start: new Date(List.start),
        end: endDate,
        totalTime: new Date(List.totalTime),
      };
      return schedule_tmp;
    });
  };

  const handleClickNextButton = () => {
    // 캘린더 데이터 변경
    const calendarInstance = cal.current.getInstance();
    calendarInstance.next();
    setStartRange(
      moment(calendarInstance.getDateRangeStart()._date).format('YYYY.MM.DD'),
    );
    setEndRange(
      moment(calendarInstance.getDateRangeEnd()._date).format('YYYY.MM.DD'),
    );
  };
  const handleClickPrevButton = () => {
    // 캘린더 데이터 변경
    const calendarInstance = cal.current.getInstance();
    calendarInstance.prev();
    setStartRange(
      moment(calendarInstance.getDateRangeStart()._date).format('YYYY.MM.DD'),
    );
    setEndRange(
      moment(calendarInstance.getDateRangeEnd()._date).format('YYYY.MM.DD'),
    );
  };
  const handleClickTodayButton = () => {
    const calendarInstance = cal.current.getInstance();

    calendarInstance.today();
  };

  const onClickSchedule = useCallback((e) => {
    const subjectInfo = calendars.find(
      (cal) => cal.id === e.schedule.calendarId,
    );
    if (subjectInfo) {
      e.schedule.calendarName = subjectInfo.name;
    }
    setInfoView(true);
    setInfoSche(e.schedule);
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    // console.log(scheduleData);
    const inputDate_s = new Date(scheduleData.start._date);
    const inputDate_e = new Date(scheduleData.end._date);

    setMakeView(true);
    setDayBool(
      dayList.map((_, index) => {
        return inputDate_s.getDay() === index ? true : false;
      }),
    );
    setSTime(inputDate_s);
    setETime(inputDate_e);
  }, []);

  const onBeforeDeleteSchedule = useCallback(async (res) => {
    // console.log('c', res.schedule);

    // 0시0분에 끝나면 끝나는 시간 -1초
    const tmpEndDate = new Date(res.schedule.end._date);
    if (
      res.schedule.end._date.getMinutes() === 0 &&
      res.schedule.end._date.getHours() === 0
    ) {
      tmpEndDate.setTime(tmpEndDate.getTime() - 1000);
    }

    const schedule_tmp = {
      id: res.schedule.id,
      isAllDay: res.schedule.isAllDay,
      isPrivate: res.schedule.isPrivate,
      title: res.schedule.title,
      location: res.schedule.location,
      state: res.schedule.state,
      start: res.schedule.start._date,
      end: tmpEndDate,
      totalTime:
        (res.schedule.end._date.getTime() -
          res.schedule.start._date.getTime()) /
        1000,
      calendarId: res.schedule.calendarId,
      option: 'delete',
    };

    const checkExist = (a) => a.id === res.schedule.id;
    const checkIndex = newScheduleArray.findIndex(checkExist);
    const checkIndex2 = schedules.findIndex(checkExist);
    if (checkIndex === -1) {
      newScheduleArray.push(schedule_tmp);
    } else {
      newScheduleArray.splice(checkIndex, 1);
    }
    // 랜더링되는 스케줄 변수는 딜리트 시 무조건 지움
    schedules.splice(checkIndex2, 1);

    cal.current.calendarInst.deleteSchedule(
      res.schedule.id,
      res.schedule.calendarId,
    );
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];
    // console.log(schedule);
    if (!isAllDay) {
      html.push('<strong>' + _getFormattedTime(schedule.start) + '</strong> ');
    }
    // if (schedule.isPrivate) {
    //   html.push('<span class="calendar-font-icon ic-lock-b"></span>');
    //   html.push('🔒 Private');
    // } else {
    if (schedule.isPrivate) {
      html.push('🔒 ');
    }

    if (schedule.isReadOnly) {
      html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
    } else if (schedule.recurrenceRule) {
      html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
    } else if (schedule.attendees.length) {
      html.push('<span class="calendar-font-icon ic-user-b"></span>');
    } else if (schedule.location) {
      html.push('<span class="calendar-font-icon ic-location-b"></span>');
    }
    const subjectIdList = subjectList.map((subject) => {
      return subject.id;
    });
    const subjectIndex = subjectIdList.indexOf(schedule.calendarId);
    if (subjectIndex > -1) {
      html.push(
        ' ' + '[' + subjectList[subjectIndex].name + ']' + ' ' + schedule.title,
      );
    } else {
      html.push(' ' + schedule.title);
    }
    return html.join('');
  }

  const templates = {
    time: function (schedule) {
      // console.log(schedule)
      return _getTimeTemplate(schedule, false);
    },
    popupStateFree: function () {
      return '강의';
    },
    popupStateBusy: function () {
      return '자습';
    },
    popupSave: function () {
      return '입력';
    },
    popupUpdate: function () {
      return '수정';
    },
    popupEdit: function () {
      return '수정';
    },
    popupDelete: function () {
      return '삭제';
    },
    titlePlaceholder: function () {
      return '(필수) 제목';
    },
    locationPlaceholder: function () {
      return '(선택) 위치';
    },
  };

  // 다중 스케줄 만들기
  const onCheckDay = (index) => (e) => {
    let newArr = [...dayBool];
    newArr[index] = e.target.checked;
    setDayBool(newArr);
    // 요일 1개만 선택시 스케줄 시작 마침 시간도 변경해주기
    if (newArr.filter(Boolean).length === 1) {
      const sTmp = new Date(sTime);
      const eTmp = new Date(eTime);
      const diffDay = index - sTmp.getDay();
      sTmp.setDate(sTmp.getDate() + diffDay);
      eTmp.setDate(eTmp.getDate() + diffDay);
      setSTime(sTmp);
      setETime(eTmp);
    }
  };

  // 과목 북마크 관련
  // '기타' 북마크 못건드리게 제거
  const subjectList_book = ObjectCopy(subjectList);
  const etcIndex = subjectList.findIndex((a) => a.name === '기타');
  subjectList_book.splice(etcIndex, 1);

  const [bookMarkCh, setBookMarkCh] = useState(
    subjectList_book.map((_, index) => {
      return subjectList_book[index].bookMark;
    }),
  );
  const onChangeCheck = (index) => (e) => {
    let newArr = [...bookMarkCh];
    newArr[index] = e.target.checked;
    setBookMarkCh(newArr);
  };
  const subjectRow = ({ index, style }) => (
    <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
      <CheckBoxWrap isOdd={Boolean(index % 2)}>
        <CheckBox
          checked={bookMarkCh[index] !== undefined ? bookMarkCh[index] : true}
          onChange={onChangeCheck(index)}
          boxSize={'25px'}
          margin={'0 15px 0 0'}
        />
      </CheckBoxWrap>
      <ColorBox2
        size={'18px'}
        radius={'9px'}
        bgColor={subjectList_book[index].bgColor}
      />
      <TaskNameDiv>{subjectList_book[index].name}</TaskNameDiv>
    </IndiviList>
  );
  // const todolistRow_new = ({ index, style }) => (
  //   <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
  //     <ColorBox
  //       size={'18px'}
  //       radius={'9px'}
  //       bgColor={todolistData_new[index].subject.bgColor}
  //     />
  //     <TaskName_todo isOdd={Boolean(index % 2)}>
  //       {todolistData_new[index].subject.name}
  //     </TaskName_todo>
  //     <TodoNameDiv isOdd={Boolean(index % 2)}>
  //       {todolistData_new[index].name}
  //     </TodoNameDiv>
  //     <TodoIconDiv2>
  //       <Flag
  //         onClick={() => {
  //           onTodolistFinish(todolistData_new[index].id);
  //         }}
  //       />
  //     </TodoIconDiv2>
  //     <TodoIconDiv2>
  //       <Delete
  //         onClick={() => {
  //           onTodolistDelete(todolistData_new[index].id);
  //         }}
  //       />
  //     </TodoIconDiv2>
  //   </IndiviList>
  // );
  // const todolistRow_finish = ({ index, style }) => (
  //   <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
  //     <ColorBox
  //       size={'18px'}
  //       radius={'9px'}
  //       bgColor={todolistData_finish[index].subject.bgColor}
  //     />
  //     <TaskName_todo>{todolistData_finish[index].subject.name}</TaskName_todo>
  //     <TodoNameDiv isOdd={Boolean(index % 2)}>
  //       {todolistData_finish[index].name}
  //     </TodoNameDiv>
  //     <TodoFinishDiv isOdd={Boolean(index % 2)}>
  //       {moment(todolistData_finish[index].finishAt).format('YY.MM.DD')}
  //     </TodoFinishDiv>
  //     <TodoIconDiv>
  //       <Delete
  //         onClick={() => {
  //           onTodolistDelete(todolistData_finish[index].id);
  //         }}
  //       />
  //     </TodoIconDiv>
  //   </IndiviList>
  // );

  const CustomInput = forwardRef(
    ({ value, onClick, text, week = false, margin, width = '150px' }, ref) => {
      return (
        <DatePickButton
          ref={ref}
          onClick={onClick}
          margin={margin}
          width={width}
        >
          {week ? text : value}
        </DatePickButton>
      );
    },
  );

  // 맨처음 스케줄, 과목 넣기
  if (isFirstRun) {
    isFirstRun = false;
    inputCalendars();
    inputSchedules();
  }
  // 과목의 리페치가 완료되야지만 새로운 과목&스케줄 넣기
  if (subjectnetwork === 4) {
    isRefectRun2 = true;
  }
  if (isRefectRun2 && subjectnetwork === 7) {
    inputCalendars();
  }
  // 스케줄의 리페치가 완료되야지만 새로운 스케줄 넣기
  if (schedulenetwork === 4) {
    isRefectRun = true;
  }
  if (isRefectRun && schedulenetwork === 7) {
    isRefectRun = false;
    inputSchedules();
  }

  // useEffect 관련
  useEffect(() => {
    //날짜 범위 세팅
    setStartRange(
      moment(cal.current.calendarInst._renderRange.start._date).format(
        'YYYY.MM.DD',
      ),
    );
    setEndRange(
      moment(cal.current.calendarInst._renderRange.end._date).format(
        'YYYY.MM.DD',
      ),
    );
  }, []);

  return (
    <Wrapper>
      {scheLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <PanelWrap>
        <ControlButton onClick={handleClickTodayButton}>Today</ControlButton>
        <ControlButton onClick={handleClickPrevButton} />
        <ControlButton onClick={handleClickNextButton} />
        <DateRangeWrap>
          {startRange}~{endRange}
        </DateRangeWrap>
      </PanelWrap>
      <TUICalendar
        ref={cal}
        isReadOnly={true}
        height={scheHeight}
        useCreationPopup={false}
        useDetailPopup={false}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        taskView={false}
        scheduleView={['time']}
        usageStatistics={true}
        week={{ hourStart: lastStart, hourEnd: lastEnd }}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
      {(makeView || modiView) && (
        <BlackBack>
          <CustomPopup>
            <PopupClose
              onClick={() => {
                setMakeView(false);
                setModiView(false);
              }}
              custom={true}
            />
            <PTitle text={makeView ? '스케줄 만들기' : '스케줄 수정'} />
            <DayWrap>
              {dayList.map((day, index) => {
                return (
                  <DayIndiWrap key={index}>
                    {day}
                    <br />
                    <CheckBox
                      checked={
                        dayBool[index] !== undefined ? dayBool[index] : true
                      }
                      onChange={onCheckDay(index)}
                      boxSize={'25px'}
                      margin={'0'}
                    />
                  </DayIndiWrap>
                );
              })}
            </DayWrap>
            <SelectWrap>
              <SelectInL>
                <Select {...mySubjectList2} id={'mySubject_id_sche'} />
              </SelectInL>
              <SelectInR>
                <Select {...stateList} id={'mySubject_state_sche'} />
              </SelectInR>
            </SelectWrap>
            <NewScheContent>
              <Input
                placeholder={'(필수) 제목'}
                height={'28px'}
                {...scheTitle}
              />
            </NewScheContent>
            <NewScheContent>
              <Input
                placeholder={'(선택) 위치'}
                height={'28px'}
                {...scheLocation}
              />
            </NewScheContent>
            <DateTotalDiv>
              <DateWrap>
                <DateContent>
                  <DatePicker
                    dateFormat={'yyyy/MM/dd'}
                    selected={sTime}
                    onChange={(date) => {
                      setSTime(date);
                      setDayBool(
                        dayList.map((_, index) => {
                          return date.getDay() === index ? true : false;
                        }),
                      );
                    }}
                    customInput={
                      <CustomInput width={'92px'} margin={'0 0 5px 0'} />
                    }
                  />
                </DateContent>
                <DateContent>
                  <TimeText timeError={timeError}>시작 :</TimeText>
                  <TimePicker
                    value={moment(sTime)}
                    onChange={(value) => {
                      setSTime(value._d);
                    }}
                    style={{
                      width: 50,
                      marginLeft: 10,
                    }}
                    showSecond={false}
                    allowEmpty={false}
                    minuteStep={5}
                  />
                </DateContent>
              </DateWrap>
              <DateWrap>
                <DateContent2>
                  <DatePicker
                    dateFormat={'yyyy/MM/dd'}
                    selected={eTime}
                    onChange={(date) => {
                      setETime(date);
                    }}
                    customInput={
                      <CustomInput width={'92px'} margin={'0 0 5px 0'} />
                    }
                  />
                </DateContent2>
                <DateContent2>
                  <TimeText timeError={timeError}>마침 :</TimeText>
                  <TimePicker
                    value={moment(eTime)}
                    onChange={(value) => {
                      setETime(value._d);
                    }}
                    style={{ width: 50, marginLeft: 10 }}
                    showSecond={false}
                    allowEmpty={false}
                    minuteStep={5}
                  />
                </DateContent2>
              </DateWrap>
            </DateTotalDiv>
            <ButtonDiv style={{ marginTop: '20px' }}>
              {makeView && (
                <Button_custom
                  width={'100px'}
                  margin={'0'}
                  height={'32px'}
                  bgColor={'#0F4C82'}
                  text={'만들기'}
                  color={'white'}
                  onClick={async () => onCreateSche('create', '')}
                />
              )}
              {modiView && (
                <Button_custom
                  width={'100px'}
                  margin={'0'}
                  height={'32px'}
                  bgColor={'#0F4C82'}
                  text={'수정'}
                  color={'white'}
                  onClick={async () => onCreateSche('update', infoSche.id)}
                />
              )}
            </ButtonDiv>
          </CustomPopup>
        </BlackBack>
      )}
      {infoView && infoSche.title && (
        <BlackBack>
          <CustomPopup2 color={infoSche.bgColor}>
            <PopupClose onClick={() => setInfoView(false)} custom={true} />
            <InfoWrap color={infoSche.bgColor}>
              <p>{infoSche.calendarName ? `[${infoSche.calendarName}]` : ''}</p>
              <p>{infoSche.title}</p>
              <p>
                {moment(infoSche.start._date).format('YYYY.MM.DD h:mm a -')}
                {moment(infoSche.end._date).format(' h:mm a')}
              </p>
              <p>{infoSche.state}</p>
            </InfoWrap>
          </CustomPopup2>
        </BlackBack>
      )}
    </Wrapper>
  );
};
