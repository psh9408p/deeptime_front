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
import FatText from '../../../../Components/FatText';
import { toast } from 'react-toastify';
import { SwatchesPicker } from 'react-color';
import useSelect from '../../../../Hooks/useSelect';
import { FixedSizeList as BookmarkList } from 'react-window';
import CheckBox from '../../../../Components/CheckBox';
import ObjectCopy from '../../../../Components/ObjectCopy';
import { Delete, Flag, Next } from '../../../../Components/Icons';
import {
  Button_refresh,
  Button_setting,
  Button_copy,
  Button_copy2,
} from '../../../../Components/Buttons/Button_click';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  position: relative;
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
  width: 80px;
`;

const SubjectButtonDiv = styled.div`
  width: 100px;
  height: 35px;
  margin-right: 10px;
`;

const SubjectButtonDiv2 = styled.div`
  width: 80px;
  margin-right: 10px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 550px !important;
    height: 500px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    height: 550px !important;
  }
`;

const PopupCustom3 = styled(PopupCustom)`
  &-content {
    width: 500px !important;
    height: 250px !important;
  }
`;

const PopupCustom4 = styled(PopupCustom)`
  &-content {
    width: 500px !important;
    height: 200px !important;
  }
`;

const PopupCustom5 = styled(PopupCustom)`
  &-content {
    width: 500px !important;
    height: 500px !important;
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
    height: 200px !important;
  }
`;

const PopupCustom9 = styled(PopupCustom)`
  &-content {
    width: 360px !important;
    height: 200px !important;
  }
`;

const PopupCustom10 = styled(PopupCustom)`
  &-content {
    width: 450px !important;
    height: 200px !important;
  }
`;

const FrontDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const PBody = styled.div``;

const PBody2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 20px 20px;
`;

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
  width: 50%;
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
  margin-bottom: 30px;
`;

const RedButtonWrap = styled.div`
  width: 120px;
  margin: 0px 0px 10px 10px;
`;

const SpaceDiv = styled.div`
  width: 10px;
`;

const SubjectForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const SubjectForm2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
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

const ScheWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  width: 100%;
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
  width: 10%;
`;

const DatePickButton = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicGray};
  font-weight: 600;
  color: black;
  text-align: center;
  padding: 7px 10px;
  font-size: 14px;
  width: 162px;
  cursor: pointer;
`;

let newScheduleArray = [];
let schedules = [];
let calendars = [];

let isFirstRun = true;
let isRefectRun = false;
let isRefectRun2 = false;

export default ({
  cal,
  startRange,
  setStartRange,
  endRange,
  setEndRange,
  myData,
  saveScheduleMutation,
  myRefetch,
  subjectList,
  subjectName,
  todolistName,
  subjectColor,
  setSubjectColor,
  handleChangeComplete,
  addSubjectMutation,
  editSubjectMutation,
  deleteSubjectMutation,
  bookMarkSubjectMutation,
  subjectRefetch,
  networkStatus,
  subjectnetwork,
  todolistData,
  addTodolistMutation,
  todolistRefetch,
  deleteTodolistMutation,
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
}) => {
  // subjectlist 오름차순 정렬
  subjectList.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
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
    const word = 'TASK 없음';
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
    const word = 'TASK 없음';
    return a.subject.name === word && b.subject.name !== word
      ? -1
      : a.subject.name !== word && b.subject.name === word
      ? 1
      : 0;
  });

  // TASK 전용 리스트
  const mySubjectList = useSelect(
    subjectList.map((List) => `${List.name}`),
    subjectList.map((List) => `${List.id}`),
  );
  // TOdolist에 쓸 TASK 전용(북마크 필터)
  let todoTask_tmp = subjectList.map((subject) => {
    if (subject.bookMark) {
      return subject;
    }
  });
  todoTask_tmp = todoTask_tmp.filter(function (el) {
    return el != undefined;
  });
  const listName_tmp = todoTask_tmp.map((List) => `${List.name}`);
  const listId_tmp = todoTask_tmp.map((List) => `${List.id}`);
  const mySubjectList2 = useSelect(
    ['TASK 없음', ...listName_tmp],
    ['', ...listId_tmp],
  );

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

  const onSubmitAdd = async () => {
    if (subjectName.value === '') {
      alert('TASK 이름을 입력하세요.');
      return;
    }
    try {
      toast.info('새로운 TASK를 추가 중...');
      const {
        data: { addSubject },
      } = await addSubjectMutation({
        variables: {
          name: subjectName.value,
          bgColor: subjectColor,
        },
      });
      if (!addSubject) {
        alert('TASK를 추가할 수 없습니다.');
      } else {
        await subjectRefetch();
        await subjectClear();
        toast.success('새로운 TASK가 추가되었습니다.');
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
      alert('TASK 이름을 입력하세요.');
      return;
    }
    if (
      window.confirm(
        '수정 내용이 기존 데이터에도 반영됩니다.\n그래도 수정하시겠습니까?',
      ) === true
    ) {
      try {
        toast.info('TASK를 수정 중...');
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
          alert('TASK를 수정할 수 없습니다.');
        } else {
          await subjectRefetch();
          await subjectClear();
          toast.success('TASK가 수정되었습니다.');
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
        '해당 TASK가 기존 데이터에서 삭제됩니다.\n그래도 삭제하시겠습니까?',
      ) === true
    ) {
      try {
        toast.info('해당 TASK를 삭제 중...');
        const {
          data: { deleteSubject },
        } = await deleteSubjectMutation({
          variables: {
            subjectId: mySubjectList.option,
          },
        });
        if (!deleteSubject) {
          alert('해당 TASK를 삭제할 수 없습니다.');
        } else {
          await subjectRefetch();
          await myRefetch();
          await subjectClear();
          toast.success('해당 TASK가 삭제되었습니다.');
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
          subjectId: mySubjectList2.option,
        },
      });
      if (!addTodolist) {
        alert('To Do List를 추가할 수 없습니다.');
      } else {
        await todolistRefetch();
        await todolistClear();
        toast.success('새로운 To DO List가 추가되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
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
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
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
        'TASK가 할당되지 않은 스케줄이 존재합니다.\nTASK 할당 후 다시 시도하세요.',
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
        await myRefetch();
        await todolistRefetch();
        const nowDate = new Date();
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
        'TASK가 할당되지 않은 스케줄이 존재합니다.\nTASK 할당 후 다시 시도하세요.',
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
        await myRefetch();
        await todolistRefetch();
        const nowDate = new Date();
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

  //TASK 종류 넣기
  const inputCalendars = () => {
    const calendars_tmp = subjectList.map((subject) => {
      if (subject.bookMark) {
        return subject;
      }
    });
    calendars = calendars_tmp.filter(function (el) {
      return el != undefined;
    });
  };

  //스케줄 넣기
  const inputSchedules = () => {
    schedules = myData.schedules.map((List) => {
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
    // console.log(e)
  }, []);

  const onClickScheduleSave = async () => {
    try {
      toast.info('스케줄 변경사항 저장 중...');
      const {
        data: { saveSchedule_my },
      } = await saveScheduleMutation({
        variables: {
          scheduleArray: newScheduleArray,
        },
      });
      if (!saveSchedule_my) {
        alert('스케줄을 변경할 수 없습니다.');
      } else {
        await myRefetch();
        await todolistRefetch();
        newScheduleArray = [];
        toast.success('변경된 스케줄이 저장되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    if (scheduleData.calendarId === undefined) {
      alert('TASK 선택은 필수입니다.\nTASK 추가 및 북마크를 진행하세요.');
      return;
    }

    let overlap = false;
    schedules.map((sch) => {
      if (
        new Date(sch.end._date ? sch.end._date : sch.end) >
          scheduleData.start._date &&
        new Date(sch.start._date ? sch.start._date : sch.start) <
          scheduleData.end._date
      ) {
        overlap = true;
      }
    });
    if (overlap) {
      alert('스케줄 시간은 중복될 수 없습니다.');
      return;
    }

    const generateId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    // 0시0분에 끝나면 끝나는 시간 -1초
    const tmpEndDate = new Date(scheduleData.end._date);
    if (
      scheduleData.end._date.getMinutes() === 0 &&
      scheduleData.end._date.getHours() === 0
    ) {
      tmpEndDate.setTime(tmpEndDate.getTime() - 1000);
    }

    const schedule = {
      id: generateId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      isPrivate: scheduleData.raw.class === 'private' ? true : false,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw.class === 'private' ? 'private' : 'public',
      },
      state: scheduleData.state,
      calendarId: scheduleData.calendarId,
    };

    const schedule_tmp = {
      id: generateId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      isPrivate: scheduleData.raw.class === 'private' ? true : false,
      start: scheduleData.start._date,
      end: tmpEndDate,
      location: scheduleData.location,
      state: scheduleData.state,
      totalTime:
        (scheduleData.end._date.getTime() -
          scheduleData.start._date.getTime()) /
        1000,
      calendarId: scheduleData.calendarId ? scheduleData.calendarId : '',
      option: 'create',
    };

    newScheduleArray.push(schedule_tmp);
    // console.log(newScheduleArray);
    schedules.push(schedule);
    cal.current.calendarInst.createSchedules([schedule]);
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
      const checkSche = { ...res.schedule, ...res.changes };
      if (checkSche.calendarId === '') {
        alert('TASK를 할당해야 수정&복사가 가능합니다.');
        return;
      }

      if (res.changes !== null) {
        if (res.changes.start !== undefined && res.changes.end !== undefined) {
          const dateSumVar = {
            start: res.changes.start._date,
            end: res.changes.end._date,
          };
          const dateRmVar = { start: '', end: '' };
          ObjectUnassign(res.changes, dateRmVar);
          Object.assign(res.changes, dateSumVar);
        } else if (res.changes.start !== undefined) {
          const dateSumVar = { start: res.changes.start._date };
          const dateRmVar = { start: '' };
          ObjectUnassign(res.changes, dateRmVar);
          Object.assign(res.changes, dateSumVar);
        } else if (res.changes.end !== undefined) {
          const dateSumVar = { end: res.changes.end._date };
          const dateRmVar = { end: '' };
          ObjectUnassign(res.changes, dateRmVar);
          Object.assign(res.changes, dateSumVar);
        }

        let totalTime_tmp = 0;
        if (res.changes.start !== undefined && res.changes.end !== undefined) {
          totalTime_tmp =
            res.changes.end.getTime() - res.changes.start.getTime();
        } else if (res.changes.start !== undefined) {
          totalTime_tmp =
            res.schedule.end._date.getTime() - res.changes.start.getTime();
        } else if (res.changes.end !== undefined) {
          totalTime_tmp =
            res.changes.end.getTime() - res.schedule.start._date.getTime();
        } else {
          totalTime_tmp =
            res.schedule.end._date.getTime() -
            res.schedule.start._date.getTime();
        }
        totalTime_tmp = totalTime_tmp / 1000;

        const generateId =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        // 0시 0분으로 끝나면 1초 빼주기
        const tmpEndDate = new Date(res.changes.end);
        if (
          res.changes.end !== undefined &&
          res.changes.end.getMinutes() === 0 &&
          res.changes.end.getHours() === 0
        ) {
          tmpEndDate.setTime(tmpEndDate.getTime() - 1000);
        }

        const schedule_tmp = {
          id: copyBool ? generateId : res.schedule.id,
          isAllDay: res.schedule.isAllDay,
          isPrivate: res.schedule.isPrivate,
          title:
            res.changes.title !== undefined
              ? res.changes.title
              : res.schedule.title,
          location:
            res.changes.location !== undefined
              ? res.changes.location
              : res.schedule.location,
          state:
            res.changes.state !== undefined
              ? res.changes.state
              : res.schedule.state,
          start:
            res.changes.start !== undefined
              ? res.changes.start
              : res.schedule.start._date,
          end:
            res.changes.end !== undefined ? tmpEndDate : res.schedule.end._date,
          totalTime: totalTime_tmp,
          calendarId:
            res.changes.calendarId !== undefined
              ? res.changes.calendarId
              : res.schedule.calendarId,
          option: copyBool ? 'create' : 'update',
        };
        Object.assign(schedule_tmp, res.changes);

        let overlap = false;
        const schedules_test = ObjectCopy(schedules);
        const checkExist = (a) => a.id === res.schedule.id;
        const checkIndex2 = schedules.findIndex(checkExist);
        // 복사는 기존에 데이터가 없으니 뺄필요가 없지롱
        if (!copyBool) {
          schedules_test.splice(checkIndex2, 1);
        }
        schedules_test.map((sch) => {
          if (
            new Date(sch.end._date ? sch.end._date : sch.end) >
              schedule_tmp.start &&
            new Date(sch.start._date ? sch.start._date : sch.start) <
              schedule_tmp.end
          ) {
            overlap = true;
          }
        });
        if (overlap) {
          alert('스케줄 시간은 중복될 수 없습니다.');
          return;
        }

        const { schedule, changes } = res;
        if (copyBool) {
          // 복사
          newScheduleArray.push(schedule_tmp);

          schedules.push({ ...schedule, ...changes, id: generateId });

          cal.current.calendarInst.createSchedules([
            { ...schedule, ...changes, id: generateId },
          ]);
          setCopyBool(false);
        } else {
          // 업데이트
          const checkIndex = newScheduleArray.findIndex(checkExist);
          if (checkIndex === -1) {
            newScheduleArray.push(schedule_tmp);
          } else {
            newScheduleArray.splice(checkIndex, 1);
            newScheduleArray.push(schedule_tmp);
          }

          schedules.splice(checkIndex2, 1);
          schedules.push({ ...schedule, ...changes });

          cal.current.calendarInst.updateSchedule(
            schedule.id,
            schedule.calendarId,
            changes,
          );
        }
      }
    },
    [copyBool],
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
      return 'To Do List';
    },
    locationPlaceholder: function () {
      return '위치';
    },
  };

  // TASK 즐겨찾기 관련
  const [bookMarkCh, setBookMarkCh] = useState(
    subjectList.map((_, index) => {
      return subjectList[index].bookMark;
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
        bgColor={subjectList[index].bgColor}
      />
      <TaskNameDiv>{subjectList[index].name}</TaskNameDiv>
    </IndiviList>
  );
  const todolistRow_new = ({ index, style }) => (
    <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
      <ColorBox
        size={'18px'}
        radius={'9px'}
        bgColor={todolistData_new[index].subject.bgColor}
      />
      <TaskName_todo isOdd={Boolean(index % 2)}>
        {todolistData_new[index].subject.name}
      </TaskName_todo>
      <TodoNameDiv isOdd={Boolean(index % 2)}>
        {todolistData_new[index].name}
      </TodoNameDiv>
      <TodoIconDiv2>
        <Flag
          onClick={() => {
            onTodolistFinish(todolistData_new[index].id);
          }}
        />
      </TodoIconDiv2>
      <TodoIconDiv2>
        <Delete
          onClick={() => {
            onTodolistDelete(todolistData_new[index].id);
          }}
        />
      </TodoIconDiv2>
    </IndiviList>
  );
  const todolistRow_finish = ({ index, style }) => (
    <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
      <ColorBox
        size={'18px'}
        radius={'9px'}
        bgColor={todolistData_finish[index].subject.bgColor}
      />
      <TaskName_todo>{todolistData_finish[index].subject.name}</TaskName_todo>
      <TodoNameDiv isOdd={Boolean(index % 2)}>
        {todolistData_finish[index].name}
      </TodoNameDiv>
      <TodoFinishDiv isOdd={Boolean(index % 2)}>
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

  const CustomInput = forwardRef(
    ({ value, onClick, text, week = false }, ref) => {
      return (
        <DatePickButton ref={ref} onClick={onClick}>
          {week ? text : value}
        </DatePickButton>
      );
    },
  );

  const onClickBookMark = async () => {
    try {
      toast.info('북마크 변경사항 저장 중...');
      const {
        data: { bookMarkSubject },
      } = await bookMarkSubjectMutation({
        variables: {
          subjectId: subjectList.map((_, index) => {
            return subjectList[index].id;
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

  // 맨처음 스케줄, TASK 넣기
  if (isFirstRun) {
    isFirstRun = false;
    inputCalendars();
    inputSchedules();
  }
  // TASK의 리페치가 완료되야지만 새로운 TASK&스케줄 넣기
  if (subjectnetwork === 4) {
    isRefectRun2 = true;
  }
  if (isRefectRun2 && subjectnetwork === 7) {
    inputCalendars();
  }
  // 스케줄의 리페치가 완료되야지만 새로운 스케줄 넣기
  if (networkStatus === 4) {
    isRefectRun = true;
  }
  if (isRefectRun && networkStatus === 7) {
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
      <PanelWrap>
        <ControlButton onClick={handleClickTodayButton}>Today</ControlButton>
        <ControlButton onClick={handleClickPrevButton} />
        <ControlButton onClick={handleClickNextButton} />
        <DateRangeWrap>
          {startRange}~{endRange}
        </DateRangeWrap>
        <SelectDiv>
          <Button_refresh
            onClick={() => {
              myRefetch();
              subjectRefetch();
              todolistRefetch();
            }}
          />
          <Button_copy
            onClick={() => {
              setCopyBool(!copyBool);
            }}
            value={copyBool}
          />
          <PopupCustom9
            trigger={<Button_copy2 />}
            closeOnDocumentClick={false}
            modal
          >
            {(close) => {
              return (
                <PBody2>
                  <ScheWrap>
                    <Button_custom
                      text={'스케줄 만들기'}
                      width={'308px'}
                      margin={'0 0 10px 0'}
                    />
                  </ScheWrap>
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
                            <PopupButton
                              type="button"
                              onClick={async () => {
                                const fucResult = await onCopyOne();
                                if (fucResult) {
                                  close();
                                }
                              }}
                              text={'복사'}
                            />
                            <PopupButton
                              type="button"
                              onClick={() => {
                                close();
                                const nowDate = new Date();
                                setCopyDate(new Date());
                                setPasteDate(
                                  new Date(nowDate.getTime() + 86400000),
                                );
                              }}
                              text={'닫기'}
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
                        margin={'0 0 10px 0'}
                      />
                    }
                    closeOnDocumentClick={false}
                    modal
                  >
                    {(close) => {
                      const copyEnd_text = new Date(copyEnd.getTime() - 1000);
                      const pasteEnd_text = new Date(pasteEnd.getTime() - 1000);
                      return (
                        <PBody2>
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
                            <PopupButton
                              type="button"
                              onClick={async () => {
                                const fucResult = await onCopyWeek();
                                if (fucResult) {
                                  close();
                                }
                              }}
                              text={'복사'}
                            />
                            <PopupButton
                              type="button"
                              onClick={() => {
                                close();
                                const nowDate = new Date();
                                setCopyDate(nowDate);
                                setPasteDate(
                                  new Date(nowDate.getTime() + 604800000),
                                );
                              }}
                              text={'닫기'}
                            />
                          </ButtonDiv>
                        </PBody2>
                      );
                    }}
                  </PopupCustom10>
                  <ButtonDiv style={{ marginTop: '10px' }}>
                    <PopupButton_solo
                      type="button"
                      onClick={() => {
                        close();
                      }}
                      text={'닫기'}
                    />
                  </ButtonDiv>
                </PBody2>
              );
            }}
          </PopupCustom9>
          <PopupCustom8
            trigger={<Button_setting />}
            closeOnDocumentClick={false}
            modal
          >
            {(close) => {
              return (
                <PBody2>
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
                </PBody2>
              );
            }}
          </PopupCustom8>
          <PopupCustom7
            trigger={
              <PopButton_custom
                widht={'80px'}
                margin={'0 10px 0 0'}
                text={'To Do List'}
              />
            }
            closeOnDocumentClick={false}
            modal
          >
            {(close) => (
              <PBody>
                <FrontDiv>
                  <PTitle text={'To Do List 관리'} />
                  <ThreeButtonWrap>
                    <SpaceDiv />
                    <SubjectButtonDiv>
                      <PopupCustom6
                        trigger={<PopButton_100 text={'계획'} />}
                        closeOnDocumentClick={false}
                        modal
                      >
                        {(close) => (
                          <PBody>
                            <SubjectForm>
                              <PTitle text={'To Do List 계획'} />
                              {/* <NewTodoDiv>
                                <SelectWrapper3>
                                  <Select
                                    {...mySubjectList2}
                                    id={'mySubject2_id'}
                                  />
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
                              </NewTodoDiv> */}
                              <TodolistTitle>
                                <BookLeft>TASK</BookLeft>
                                <BookRight>To Do List</BookRight>
                                <div style={{ marginLeft: '10px' }}>🔧</div>
                              </TodolistTitle>
                              <ListWrap>
                                <BookmarkList
                                  height={300}
                                  itemCount={todolistData_new.length}
                                  itemSize={40}
                                  width={450}
                                >
                                  {todolistRow_new}
                                </BookmarkList>
                              </ListWrap>
                              <ButtonDiv>
                                <PopupButton_solo
                                  type="button"
                                  onClick={() => {
                                    close();
                                  }}
                                  text={'닫기'}
                                />
                              </ButtonDiv>
                            </SubjectForm>
                          </PBody>
                        )}
                      </PopupCustom6>
                    </SubjectButtonDiv>
                    <SubjectButtonDiv>
                      <PopupCustom6
                        trigger={<PopButton_100 text={'완료'} />}
                        closeOnDocumentClick={false}
                        modal
                      >
                        {(close) => (
                          <PBody>
                            <SubjectForm>
                              <PTitle text={'완료한 To Do List'} />
                              <TodolistTitle2>
                                <BookLeft>TASK</BookLeft>
                                <BookRight3>To Do List</BookRight3>
                                <FinishDateDiv>Done</FinishDateDiv>
                                <div style={{ marginLeft: '10px' }}>🔧</div>
                              </TodolistTitle2>
                              <ListWrap>
                                <BookmarkList
                                  height={300}
                                  itemCount={todolistData_finish.length}
                                  itemSize={40}
                                  width={490}
                                >
                                  {todolistRow_finish}
                                </BookmarkList>
                              </ListWrap>
                              <ButtonDiv>
                                <PopupButton_solo
                                  type="button"
                                  onClick={() => {
                                    close();
                                  }}
                                  text={'닫기'}
                                />
                              </ButtonDiv>
                            </SubjectForm>
                          </PBody>
                        )}
                      </PopupCustom6>
                    </SubjectButtonDiv>
                  </ThreeButtonWrap>
                  <ButtonDiv>
                    <PopupButton_solo
                      type="button"
                      onClick={() => {
                        close();
                      }}
                      text={'닫기'}
                    />
                  </ButtonDiv>
                </FrontDiv>
              </PBody>
            )}
          </PopupCustom7>
          <SubjectButtonDiv2>
            <PopupCustom4
              trigger={<PopButton_100 text={'TASK'} />}
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody>
                  <FrontDiv>
                    <PTitle text={'TASK 관리'} />
                    <ThreeButtonWrap>
                      <SpaceDiv />
                      <SubjectButtonDiv>
                        <PopupCustom5
                          trigger={<PopButton_100 text={'북마크'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <SubjectForm>
                                <PTitle text={'TASK 북마크'} />
                                <BookMarkTitle>
                                  <BookLeft2>&#9989;</BookLeft2>
                                  <BookRight2>TASK</BookRight2>
                                </BookMarkTitle>
                                <ListWrap>
                                  <BookmarkList
                                    height={300}
                                    itemCount={subjectList.length}
                                    itemSize={30}
                                    width={370}
                                  >
                                    {subjectRow}
                                  </BookmarkList>
                                </ListWrap>
                                <ButtonDiv>
                                  <PopupButton
                                    type="button"
                                    text={'저장'}
                                    onClick={async () => {
                                      const fucResult = await onClickBookMark();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      close();
                                      setBookMarkCh(
                                        subjectList.map((_, index) => {
                                          return subjectList[index].bookMark;
                                        }),
                                      );
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm>
                            </PBody>
                          )}
                        </PopupCustom5>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom
                          trigger={<PopButton_100 text={'추가'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <SubjectForm2>
                                <PTitle text={'TASK 추가'} />
                                <InputWrapper>
                                  <Input
                                    placeholder={
                                      'TASK 이름 (예: 국어 or 문서작업)'
                                    }
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
                                  <PopupButton
                                    type="button"
                                    text={'추가'}
                                    onClick={async () => {
                                      const fucResult = await onSubmitAdd();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      close();
                                      subjectClear();
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm2>
                            </PBody>
                          )}
                        </PopupCustom>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom2
                          trigger={<PopButton_100 text={'수정'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <SubjectForm2>
                                <PTitle text={'TASK 수정'} />
                                <SelectWrapDiv2>
                                  <SubTitle text={`수정할 TASK:　`} />
                                  <SelectWrapper2>
                                    <Select
                                      {...mySubjectList}
                                      id={'mySubjectList_id'}
                                    />
                                  </SelectWrapper2>
                                  <RedButtonWrap>
                                    <Button_red
                                      type={'button'}
                                      text={'기존정보 불러오기'}
                                      onClick={subjectLoad}
                                    />
                                  </RedButtonWrap>
                                </SelectWrapDiv2>
                                <InputWrapper>
                                  <Input
                                    placeholder={
                                      'TASK 이름 (예: 국어 or 문서작업)'
                                    }
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
                                  <PopupButton
                                    type="button"
                                    text={'수정'}
                                    onClick={async () => {
                                      const fucResult = await onSubmitEdit();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      subjectClear();
                                      close();
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm2>
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
                              <SubjectForm2>
                                <PTitle text={'TASK 삭제'} />
                                <SelectWrapDiv>
                                  <SelectWrapper>
                                    <Select
                                      {...mySubjectList}
                                      id={'mySubject_id'}
                                    />
                                  </SelectWrapper>
                                </SelectWrapDiv>
                                <ButtonDiv>
                                  <PopupButton
                                    type="button"
                                    text={'삭제'}
                                    onClick={async () => {
                                      const fucResult = await onSubmitDelete();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      close();
                                      subjectClear();
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm2>
                            </PBody>
                          )}
                        </PopupCustom3>
                      </SubjectButtonDiv>
                    </ThreeButtonWrap>
                    <ButtonDiv>
                      <PopupButton_solo
                        type="button"
                        onClick={() => {
                          close();
                        }}
                        text={'닫기'}
                      />
                    </ButtonDiv>
                  </FrontDiv>
                </PBody>
              )}
            </PopupCustom4>
          </SubjectButtonDiv2>
          <SaveButtonDiv>
            <Button_blue
              text={'저장'}
              onClick={() => {
                onClickScheduleSave();
              }}
            />
          </SaveButtonDiv>
        </SelectDiv>
      </PanelWrap>
      <TUICalendar
        ref={cal}
        height={scheHeight}
        useCreationPopup={true}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        taskView={false}
        scheduleView={['allday', 'time']}
        usageStatistics={true}
        week={{ hourStart: lastStart, hourEnd: lastEnd }}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </Wrapper>
  );
};
