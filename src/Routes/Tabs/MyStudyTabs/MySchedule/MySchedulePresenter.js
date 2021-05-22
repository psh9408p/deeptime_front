import React, { useCallback, useEffect, useState, forwardRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
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
import Button_hold from '../../../../Components/Buttons/Button_hold';
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
import { FixedSizeList as BookmarkList } from 'react-window';
import CheckBox from '../../../../Components/CheckBox';
import ObjectCopy from '../../../../Components/ObjectCopy';
import { Delete, Edit, Next } from '../../../../Components/Icons';
import {
  Button_refresh,
  Button_setting,
} from '../../../../Components/Buttons/Button_click';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import Loader from '../../../../Components/Loader';
import useSelect_dynamic from '../../../../Hooks/useSelect_dynamic';
import selectChange from '../../../../Components/SelectChange';

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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 0 0 5px 0;
`;

const DateRangeWrap = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 200px;
  margin-left: auto;
`;

const SelectInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  :first-child {
    margin-bottom: 5px;
  }
`;

const SaveButtonDiv = styled.div`
  width: 34px;
  height: 30px;
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

const ListWrap2 = styled(ListWrap)`
  margin-bottom: 0;
`;

const IndiviList = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  height: 100%;
  border-bottom: 1px solid #c7c7c7;
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

const ColorBox2 = styled(ColorBox)`
  cursor: default;
  margin-left: 10px;
  border: none;
  background-color: ${(props) => props.bgColor};
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
`;

const TodoNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  height: 100%;
  padding: 0 10px;
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
  width: 123px;
  height: 28px;
  margin-right: 17px;
`;

const SelectInR = styled.div`
  width: 70px;
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

const SelectWrap2 = styled(NewScheContent)`
  margin-top: 10px;
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
  height: 430px;
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
  saveScheduleMutation,
  subjectName,
  todolistName,
  subjectColor,
  setSubjectColor,
  handleChangeComplete,
  addSubjectMutation,
  editSubjectMutation,
  deleteSubjectMutation,
  bookMarkSubjectMutation,
  scheduleList,
  scheduleRefetch,
  schedulenetwork,
  subjectList,
  subjectRefetch,
  subjectnetwork,
  todolistData,
  addTodolistMutation,
  todolistRefetch,
  deleteTodolistMutation,
  editTodolistMutation,
  finishTodolistMutation,
  scheduleStart,
  scheduleEnd,
  onSaveSet,
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
  createScheMutation,
  makeView,
  setMakeView,
  nowDate,
  infoView,
  setInfoView,
  infoSche,
  setInfoSche,
  modiView,
  setModiView,
  onDeleteSche,
  dragScheMutation,
  scheLoading,
  setScheLoading,
  timeError,
  isSelf,
  todoModi,
  setTodoModi,
  todoModiName,
  todoModiId,
  setTodoModiId,
  userbooks,
  userbookRefetch,
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
  // todoList 수정용
  const mySubjectList3 = useSelect([...listName_tmp], [...listId_tmp]);

  // 사용자 사용 책데이터 추출
  const bookTitles = listId_tmp.map((subjectId) => {
    // 해당 과목과 같은 책 배열로 추출
    const userbooks_tmp = userbooks.filter(
      (userbook) => userbook.subject.id === subjectId,
    );
    // 제목만 추출
    const titleArray = userbooks_tmp.map((book) => book.title);
    return ['(선택 사항)교재 선택', ...titleArray];
  });
  const bookIds = listId_tmp.map((subjectId) => {
    // 해당 과목과 같은 책 배열로 추출
    const userbooks_tmp = userbooks.filter(
      (userbook) => userbook.subject.id === subjectId,
    );
    // id만 추출
    const idArray = userbooks_tmp.map((book) => book.id);
    return ['', ...idArray];
  });
  // 과목 선택에 따른 교재 가변Select
  const userBookList = useSelect_dynamic(
    bookTitles,
    bookIds,
    mySubjectList2.optionList,
    mySubjectList2.optionList[mySubjectList2.optionIndex],
  );

  const todolistClear = () => {
    todolistName.setValue('');
    mySubjectList2.setOption(mySubjectList2.valueList[0]);
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

  const onSubmitAdd = async () => {
    if (subjectName.value === '') {
      alert('과목 이름을 입력하세요.');
      return;
    }
    try {
      toast.info('새로운 과목을 추가 중...');
      const {
        data: { addSubject },
      } = await addSubjectMutation({
        variables: {
          name: subjectName.value,
          bgColor: subjectColor,
        },
      });
      if (!addSubject) {
        alert('과목을 추가할 수 없습니다.');
      } else {
        await subjectRefetch();
        await subjectClear();
        toast.success('새로운 과목이 추가되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onSubmitEdit = async () => {
    if (subjectName.value === '') {
      alert('과목 이름을 입력하세요.');
      return;
    }

    if (
      window.confirm(
        '수정 내용이 기존 데이터에도 반영됩니다.\n그래도 수정하시겠습니까?',
      ) === true
    ) {
      try {
        toast.info('과목을 수정 중...');
        const {
          data: { editSubject },
        } = await editSubjectMutation({
          variables: {
            subjectId: mySubjectList.option,
            name: subjectName.value,
            bgColor: subjectColor,
          },
        });
        if (!editSubject) {
          alert('과목을 수정할 수 없습니다.');
        } else {
          await subjectRefetch();
          await subjectClear();
          toast.success('과목이 수정되었습니다.');
          return true;
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
        return false;
      }
    }
  };

  const onSubmitDelete = async () => {
    if (
      window.confirm(
        '해당 과목이 기존 데이터에서 삭제됩니다.\n그래도 삭제하시겠습니까?',
      ) === true
    ) {
      try {
        toast.info('해당 과목을 삭제 중...');
        const {
          data: { deleteSubject },
        } = await deleteSubjectMutation({
          variables: {
            subjectId: mySubjectList.option,
          },
        });
        if (!deleteSubject) {
          alert('해당 과목을 삭제할 수 없습니다.');
        } else {
          await subjectRefetch();
          await scheduleRefetch();
          await subjectClear();
          toast.success('해당 과목이 삭제되었습니다.');
          return true;
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
        return false;
      }
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

  // 스케줄 초기화
  const clearSchedule = () => {
    setDayBool(
      dayList.map((_, index) => {
        return nowDate.getDay() === index ? true : false;
      }),
    );
    mySubjectList2.setOption(mySubjectList2.valueList[0]);
    userBookList.setOption(userBookList.valueList[0]);
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
    //랜더링 이슈 때문에 값을 지연해서 바꿔줘야 정상적으로 Select값이 바뀌어서 setTimeout사용
    setTimeout(() => {
      //교재 넣기 위해 해당 스케줄 찾기
      const scheIndex = scheduleList.findIndex((a) => a.id === Sche.id);
      const thisSche = scheduleList[scheIndex];
      userBookList.setOption(thisSche.bookOfUser ? thisSche.bookOfUser.id : '');
    }, 100);

    // 값들 넣어주기
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

  const onCopyWeek = async () => {
    // 해당주 스케줄 필터링
    const weekFilter = (sche) =>
      sche.start >= copyStart && sche.start <= copyEnd;
    const weekSche = schedules.filter(weekFilter);

    const diffTime = pasteStart.getTime() - copyStart.getTime();
    const scheTmpArray = schePreTreat({
      sches: weekSche,
      diffTime,
    });

    if (scheTmpArray.length === 0) {
      alert('해당 기간에 복사할 스케줄이 없습니다.');
      return;
    } else if (scheTmpArray === false) {
      alert(
        '과목이 할당되지 않은 스케줄이 존재합니다.\n과목 할당 후 다시 시도하세요.',
      );
      return;
    }

    try {
      toast.info('주간 스케줄 복사 중...');
      const {
        data: { saveSchedule_my },
      } = await saveScheduleMutation({
        variables: {
          scheduleArray: scheTmpArray,
        },
      });
      if (!saveSchedule_my) {
        alert('스케줄을 복사할 수 없습니다.');
      } else {
        await scheduleRefetch();
        // await todolistRefetch();
        setCopyDate(nowDate);
        setPasteDate(new Date(nowDate.getTime() + 604800000));
        toast.success('주간 스케줄이 복사되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onCopyOne = async () => {
    // 해당일 스케줄 필터링
    const weekFilter = (sche) => {
      const { startDate, endDate } = todayDateRange(copyOne);
      return sche.start >= startDate && sche.start <= endDate;
    };
    const weekSche = schedules.filter(weekFilter);

    const { startDate: copySD } = todayDateRange(copyOne);
    const { startDate: pasteSD } = todayDateRange(pasteOne);
    const diffTime = pasteSD.getTime() - copySD.getTime();
    const scheTmpArray = schePreTreat({
      sches: weekSche,
      diffTime,
    });

    if (scheTmpArray.length === 0) {
      alert('해당 기간에 복사할 스케줄이 없습니다.');
      return;
    } else if (scheTmpArray === false) {
      alert(
        '과목이 할당되지 않은 스케줄이 존재합니다.\n과목 할당 후 다시 시도하세요.',
      );
      return;
    }

    try {
      toast.info('하루 스케줄 복사 중...');
      const {
        data: { saveSchedule_my },
      } = await saveScheduleMutation({
        variables: {
          scheduleArray: scheTmpArray,
        },
      });
      if (!saveSchedule_my) {
        alert('스케줄을 복사할 수 없습니다.');
      } else {
        await scheduleRefetch();
        // await todolistRefetch();
        setCopyOne(new Date());
        setPasteOne(new Date(nowDate.getTime() + 86400000));
        toast.success('하루 스케줄이 복사되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
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

  const onBeforeUpdateSchedule = useCallback(
    async (res) => {
      // 하루의 마지막으로 드레그하면 모듈이 12시에 1초를 빼버리기 때문에 1초를 다시 더해줌
      if (res.end._date.getMinutes() === 59) {
        res.end._date.setSeconds(60);
      }
      // 드래그 시 스케줄 24시간 넘지 않게 검증
      const timeDiff = res.end._date.getTime() - res.start._date.getTime();
      if (timeDiff > 86400000) {
        alert('스케줄 기간은 24시간 이내로 가능합니다.');
        return;
      }
      // 스케줄과 연동된 교재 데이터 가져오기
      const thisSche = scheduleList.filter(
        (sche) => sche.id === res.schedule.id,
      );
      setScheLoading(true);
      try {
        const {
          data: { dragSchedule },
        } = await dragScheMutation({
          variables: {
            option: copyBool ? 'copy' : 'update',
            scheduleId: res.schedule.id,
            calendarId: res.schedule.calendarId,
            state: res.schedule.state,
            title: res.schedule.title,
            location: res.schedule.location,
            start: res.start._date,
            end: res.end._date,
            userBookId: thisSche[0].bookOfUser ? thisSche[0].bookOfUser.id : '',
          },
        });
        if (!dragSchedule) {
          alert(
            copyBool
              ? '스케줄을 복사할 수 없습니다.'
              : '스케줄을 수정할 수 없습니다.',
          );
        } else {
          await scheduleRefetch();
          setCopyBool(false);
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      } finally {
        setScheLoading(false);
      }
    },
    [copyBool, scheduleList],
  );

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

  const onCreateSche = async (option, scheduleId) => {
    if (dayBool.findIndex((e) => e === true) === -1) {
      alert('요일을 최소 하루 이상 선택하세요.');
      return;
    } else if (mySubjectList2.option === '') {
      alert('과목 선택은 필수 항목입니다.');
      return;
    } else if (scheTitle.value === '') {
      alert('제목을 입력하세요.');
      return;
    } else if (sTime >= eTime) {
      alert('끝 시간이 시작 시간과 같거나 빠를 수 없습니다.');
      return;
    } else if (eTime.getTime() - sTime.getTime() > 86400000) {
      alert('스케줄 기간은 24시간 이내로만 가능합니다.');
      return;
    }
    try {
      setScheLoading(true);
      const {
        data: { createSchedule },
      } = await createScheMutation({
        variables: {
          option,
          scheduleId,
          days: dayBool,
          calendarId: mySubjectList2.option,
          state: stateList.option,
          title: scheTitle.value,
          location: scheLocation.value,
          start: sTime,
          end: eTime,
          userBookId: userBookList.option,
        },
      });
      if (!createSchedule) {
        alert(
          `스케줄을 ${option === 'create' ? '만들' : '수정할'} 수 없습니다.`,
        );
      } else {
        await scheduleRefetch();
        clearSchedule();
        setMakeView(false);
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      setScheLoading(false);
      setModiView(false);
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

  const onClickBookMark = async () => {
    try {
      toast.info('북마크 변경사항 저장 중...');
      const {
        data: { bookMarkSubject },
      } = await bookMarkSubjectMutation({
        variables: {
          subjectId: subjectList_book.map((_, index) => {
            return subjectList_book[index].id;
          }),
          bookMark: bookMarkCh,
        },
      });
      if (!bookMarkSubject) {
        alert('북마크를 변경할 수 없습니다.');
      } else {
        await subjectRefetch();
        toast.success('변경된 북마크가 저장되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

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

  const subjectRow = ({ index, style }) => (
    <IndiviList key={index} style={style}>
      <CheckBoxWrap>
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
              scheTitle.setValue(todolistData_new[index].name);
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
        <BookmarkList
          height={300}
          itemCount={todolistData_finish.length}
          itemSize={40}
          width={490}
        >
          {todolistRow_finish}
        </BookmarkList>
      </ListWrap2>
    </PBody>
  );

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
          {startRange} ~ {endRange}
        </DateRangeWrap>
        {isSelf && (
          <SelectDiv>
            <SelectInner>
              <Button_refresh
                onClick={() => {
                  scheduleRefetch();
                  subjectRefetch();
                  // todolistRefetch();
                  userbookRefetch();
                }}
              />
              <PopupCustom4
                trigger={
                  <PopButton_custom
                    width={'78px'}
                    margin={'0 10px 0 0'}
                    text={'과 목'}
                  />
                }
                closeOnDocumentClick={false}
                modal
              >
                {(close) => (
                  <PBody>
                    <PopupClose onClick={() => close()} />
                    <PTitle text={'과목 관리'} />
                    <ThreeButtonWrap>
                      <SpaceDiv />
                      <SubjectButtonDiv>
                        <PopupCustom
                          trigger={<PopButton_100 text={'북마크'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <PopupClose
                                onClick={() => {
                                  close();
                                  setBookMarkCh(
                                    subjectList_book.map((_, index) => {
                                      return subjectList_book[index].bookMark;
                                    }),
                                  );
                                }}
                              />
                              <PTitle text={'과목 북마크'} />
                              <BookMarkTitle>
                                <BookLeft2>&#9989;</BookLeft2>
                                <BookRight2>과목</BookRight2>
                              </BookMarkTitle>
                              <ListWrap>
                                <BookmarkList
                                  height={300}
                                  itemCount={subjectList_book.length}
                                  itemSize={30}
                                  width={370}
                                >
                                  {subjectRow}
                                </BookmarkList>
                              </ListWrap>
                              <ButtonDiv>
                                <PopupButton_solo
                                  type="button"
                                  text={'저장'}
                                  onClick={async () => {
                                    const fucResult = await onClickBookMark();
                                    if (fucResult) {
                                      close();
                                    }
                                  }}
                                />
                              </ButtonDiv>
                            </PBody>
                          )}
                        </PopupCustom>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom5
                          trigger={<PopButton_100 text={'만들기'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <PopupClose
                                onClick={() => {
                                  close();
                                  subjectClear();
                                }}
                              />
                              <PTitle text={'과목 만들기'} />
                              <InputWrapper>
                                <Input
                                  placeholder={'과목 이름 (예: 국어 or 독서)'}
                                  {...subjectName}
                                />
                              </InputWrapper>
                              <ColorWrapper>
                                <SubTitle text={'색상 선택'} />
                                <SwatchesPicker
                                  color={subjectColor}
                                  onChangeComplete={handleChangeComplete}
                                />
                              </ColorWrapper>
                              <ButtonDiv>
                                <PopupButton_solo
                                  type="button"
                                  text={'추가'}
                                  onClick={async () => {
                                    const fucResult = await onSubmitAdd();
                                    if (fucResult) {
                                      close();
                                    }
                                  }}
                                />
                              </ButtonDiv>
                            </PBody>
                          )}
                        </PopupCustom5>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom2
                          trigger={<PopButton_100 text={'수정'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <PopupClose
                                onClick={() => {
                                  subjectClear();
                                  close();
                                }}
                              />
                              <PTitle text={'과목 수정'} />
                              <SelectWrapDiv2>
                                <SubTitle text={`과목:　`} />
                                <SelectWrapper2>
                                  <Select
                                    {...mySubjectList}
                                    id={'mySubjectList_id'}
                                  />
                                </SelectWrapper2>
                                <RedButtonWrap>
                                  <Button_red
                                    type={'button'}
                                    text={'불러오기'}
                                    onClick={subjectLoad}
                                  />
                                </RedButtonWrap>
                              </SelectWrapDiv2>
                              <InputWrapper>
                                <Input
                                  placeholder={'과목 이름 (예: 국어 or 독서)'}
                                  {...subjectName}
                                />
                              </InputWrapper>
                              <ColorWrapper>
                                <SubTitle text={'색상 선택'} />
                                <SwatchesPicker
                                  color={subjectColor}
                                  onChangeComplete={handleChangeComplete}
                                />
                              </ColorWrapper>
                              <ButtonDiv>
                                <PopupButton_solo
                                  type="button"
                                  text={'수정'}
                                  onClick={async () => {
                                    const fucResult = await onSubmitEdit();
                                    if (fucResult) {
                                      close();
                                    }
                                  }}
                                />
                              </ButtonDiv>
                            </PBody>
                          )}
                        </PopupCustom2>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom3
                          trigger={<PopButton_100 text={'삭제'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <PopupClose
                                onClick={() => {
                                  close();
                                  subjectClear();
                                }}
                              />
                              <PTitle text={'과목 삭제'} />
                              <SelectWrapDiv>
                                <SelectWrapper>
                                  <Select
                                    {...mySubjectList}
                                    id={'mySubject_id'}
                                  />
                                </SelectWrapper>
                              </SelectWrapDiv>
                              <ButtonDiv>
                                <PopupButton_solo
                                  type="button"
                                  text={'삭제'}
                                  onClick={async () => {
                                    const fucResult = await onSubmitDelete();
                                    if (fucResult) {
                                      close();
                                    }
                                  }}
                                />
                              </ButtonDiv>
                            </PBody>
                          )}
                        </PopupCustom3>
                      </SubjectButtonDiv>
                    </ThreeButtonWrap>
                  </PBody>
                )}
              </PopupCustom4>
              <PopupCustom8
                trigger={<Button_setting margin={'0'} />}
                closeOnDocumentClick={false}
                modal
              >
                {(close) => {
                  return (
                    <PBody2>
                      <PopupClose onClick={() => close()} />
                      <PTitle text={'기본값 세팅'} />
                      <SetContentWrap>
                        <SetContentBox>
                          스케줄러 시작 :　
                          <RefreshInputWrap>
                            <Input_100
                              placeholder={''}
                              {...scheduleStart}
                              type={'number'}
                              step={1}
                            />
                          </RefreshInputWrap>
                          시　/　끝 :　
                          <RefreshInputWrap>
                            <Input_100
                              placeholder={''}
                              {...scheduleEnd}
                              type={'number'}
                              step={1}
                            />
                          </RefreshInputWrap>
                          시
                        </SetContentBox>
                      </SetContentWrap>
                      <ButtonDiv style={{ marginTop: '20px' }}>
                        <PopupButton_solo
                          type="button"
                          onClick={async () => {
                            const fucResult = await onSaveSet();
                            if (fucResult) {
                              close();
                            }
                          }}
                          text={'적용'}
                        />
                      </ButtonDiv>
                    </PBody2>
                  );
                }}
              </PopupCustom8>
            </SelectInner>
            <SelectInner>
              <SaveButtonDiv>
                <Button_blue
                  text={'+'}
                  fontSize={'25px'}
                  onClick={() => {
                    setMakeView(true);
                  }}
                />
              </SaveButtonDiv>
              <PopupCustom6
                trigger={
                  <PopButton_custom
                    width={'78px'}
                    margin={'0 10px 0 10px'}
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
                      <BookmarkList
                        height={300}
                        itemCount={todolistData_new.length}
                        itemSize={40}
                        width={450}
                        itemData={{ close: () => {}, view: 'todo' }}
                      >
                        {todolistRow_new}
                      </BookmarkList>
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
              <Button_hold
                width={'78px'}
                margin={'0 10px 0 0'}
                text={'개별 복사'}
                onClick={() => {
                  setCopyBool(!copyBool);
                }}
                value={copyBool}
              />
              <PopupCustom9
                trigger={
                  <PopButton_custom
                    width={'78px'}
                    margin={'0'}
                    text={'일정 복사'}
                  />
                }
                closeOnDocumentClick={false}
                modal
              >
                {(close) => {
                  return (
                    <PBody2>
                      <PopupClose onClick={() => close()} />
                      <PopupCustom10
                        trigger={
                          <PopButton_custom
                            text={'하루 스케줄 복사'}
                            width={'308px'}
                            height={'30px'}
                            margin={'0 0 10px 0'}
                          />
                        }
                        closeOnDocumentClick={false}
                        modal
                      >
                        {(close) => {
                          return (
                            <PBody2>
                              <PopupClose
                                onClick={() => {
                                  close();
                                  setCopyDate(new Date());
                                  setPasteDate(
                                    new Date(nowDate.getTime() + 86400000),
                                  );
                                }}
                              />
                              <PTitle text={'하루 스케줄 복사'} />
                              <WeekWrap>
                                <DateIndi>
                                  <DatePicker
                                    dateFormat={'yyyy/MM/dd'}
                                    selected={copyOne}
                                    onChange={(date) => {
                                      setCopyOne(date);
                                    }}
                                    customInput={<CustomInput />}
                                  />
                                </DateIndi>
                                <NextWrap>
                                  <Next />
                                </NextWrap>
                                <DateIndi>
                                  <DatePicker
                                    dateFormat={'yyyy/MM/dd'}
                                    selected={pasteOne}
                                    onChange={(date) => {
                                      setPasteOne(date);
                                    }}
                                    customInput={<CustomInput />}
                                  />
                                </DateIndi>
                              </WeekWrap>
                              <ButtonDiv style={{ marginTop: '20px' }}>
                                <PopupButton_solo
                                  type="button"
                                  onClick={async () => {
                                    const fucResult = await onCopyOne();
                                    if (fucResult) {
                                      close();
                                    }
                                  }}
                                  text={'복사'}
                                />
                              </ButtonDiv>
                            </PBody2>
                          );
                        }}
                      </PopupCustom10>
                      <PopupCustom10
                        trigger={
                          <PopButton_custom
                            text={'주간 스케줄 복사'}
                            width={'308px'}
                            height={'30px'}
                            margin={'0'}
                          />
                        }
                        closeOnDocumentClick={false}
                        modal
                      >
                        {(close) => {
                          const copyEnd_text = new Date(
                            copyEnd.getTime() - 1000,
                          );
                          const pasteEnd_text = new Date(
                            pasteEnd.getTime() - 1000,
                          );
                          return (
                            <PBody2>
                              <PopupClose
                                onClick={() => {
                                  close();
                                  setCopyDate(nowDate);
                                  setPasteDate(
                                    new Date(nowDate.getTime() + 604800000),
                                  );
                                }}
                              />
                              <PTitle text={'주간 스케줄 복사'} />
                              <WeekWrap>
                                <DateIndi>
                                  <DatePicker
                                    dateFormat={'yyyy/MM/dd'}
                                    selected={copyDate}
                                    onChange={(date) => {
                                      setCopyDate(date);
                                    }}
                                    customInput={
                                      <CustomInput
                                        week={true}
                                        text={`${moment(copyStart).format(
                                          'MM.DD',
                                        )}(일)~
                                ${moment(copyEnd_text).format('MM.DD')}(토)`}
                                      />
                                    }
                                  />
                                </DateIndi>
                                <NextWrap>
                                  <Next />
                                </NextWrap>
                                <DateIndi>
                                  <DatePicker
                                    dateFormat={'yyyy/MM/dd'}
                                    selected={pasteDate}
                                    onChange={(date) => {
                                      setPasteDate(date);
                                    }}
                                    customInput={
                                      <CustomInput
                                        week={true}
                                        text={`${moment(pasteStart).format(
                                          'MM.DD',
                                        )}(일)~
                                  ${moment(pasteEnd_text).format('MM.DD')}(토)`}
                                      />
                                    }
                                  />
                                </DateIndi>
                              </WeekWrap>
                              <ButtonDiv style={{ marginTop: '20px' }}>
                                <PopupButton_solo
                                  type="button"
                                  onClick={async () => {
                                    const fucResult = await onCopyWeek();
                                    if (fucResult) {
                                      close();
                                    }
                                  }}
                                  text={'복사'}
                                />
                              </ButtonDiv>
                            </PBody2>
                          );
                        }}
                      </PopupCustom10>
                    </PBody2>
                  );
                }}
              </PopupCustom9>
            </SelectInner>
          </SelectDiv>
        )}
      </PanelWrap>
      <TUICalendar
        ref={cal}
        isReadOnly={!isSelf}
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
                {/* <Select {...stateList} id={'mySubject_state_sche'} /> */}
                <PopupCustom7
                  trigger={<PopButton_custom text={'TO DO'} width={'100%'} />}
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
                        <BookmarkList
                          height={300}
                          itemCount={todolistData_new.length}
                          itemSize={40}
                          width={450}
                          itemData={{ close, view: 'sche' }}
                        >
                          {todolistRow_new}
                        </BookmarkList>
                      </ListWrap2>
                    </PBody>
                  )}
                </PopupCustom7>
              </SelectInR>
            </SelectWrap>
            <SelectWrap2>
              <Select {...userBookList} id={'userBookList_id_sche'} />
            </SelectWrap2>
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
              {/* <p>{infoSche.state}</p> */}
            </InfoWrap>
            {isSelf && (
              <ButtonDiv style={{ marginTop: '20px' }}>
                <PopupButton
                  type="button"
                  onClick={async () => {
                    setModiView(true);
                    setInfoView(false);
                    inputSchedule(infoSche);

                    //교재 넣기 위해 해당 스케줄 찾기
                    // const scheIndex = scheduleList.findIndex(
                    //   (a) => a.id === infoSche.id,
                    // );
                    // const thisSche = scheduleList[scheIndex];
                    // userBookList.setOption(
                    //   thisSche.bookOfUser ? thisSche.bookOfUser.id : '',
                    // );
                  }}
                  text={'수정'}
                />
                <PopupButton
                  type="button"
                  onClick={() => onDeleteSche(infoSche.id)}
                  bgColor={'#DB4437'}
                  color={'black'}
                  text={'삭제'}
                />
              </ButtonDiv>
            )}
          </CustomPopup2>
        </BlackBack>
      )}
    </Wrapper>
  );
};
