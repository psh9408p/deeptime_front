import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../../../../Components/Loader';
import WeekRange from '../../../../Components/Date/WeekRange';
import MySchedulePresenter from './MySchedulePresenter';
import useInput from '../../../../Hooks/useInput';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  SAVE_SCHEDULE,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  MY_SUBJECT,
  EDIT_SUBJECT,
  BOOKMARK_SUBJECT,
  MY_TODOLIST,
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FINISH_TODOLIST,
  EDIT_STUDYSET,
} from './MyScheduleQueries';
import { toast } from 'react-toastify';
import useSelect from '../../../../Hooks/useSelect';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const fivemin = 1000 * 60 * 5;
const stateBox = ['자습', '강의'];

export default ({ myInfoData, myInfoRefetch, networkStatus }) => {
  const start_range = (value) => value >= 0 && value <= 23 && value % 1 === 0;
  const end_range = (value) => value >= 1 && value <= 24 && value % 1 === 0;

  const cal = useRef(null);
  const nowDate = new Date();

  const stateList = useSelect(stateBox, stateBox);
  const [copyOne, setCopyOne] = useState(nowDate);
  const [pasteOne, setPasteOne] = useState(
    new Date(nowDate.getTime() + 86400000),
  );
  const [copyDate, setCopyDate] = useState(nowDate);
  const [pasteDate, setPasteDate] = useState(
    new Date(nowDate.getTime() + 604800000),
  );
  const [copyStart, setCopyStart] = useState(nowDate);
  const [copyEnd, setCopyEnd] = useState(nowDate);
  const [pasteStart, setPasteStart] = useState(nowDate);
  const [pasteEnd, setPasteEnd] = useState(nowDate);
  const [copyBool, setCopyBool] = useState(false);
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');
  const [sTime, setSTime] = useState(
    new Date(Math.ceil(nowDate.getTime() / fivemin) * fivemin),
  );
  const [eTime, setETime] = useState(
    new Date(Math.ceil(nowDate.getTime() / fivemin) * fivemin + fivemin),
  );
  const [lastStart, setLastStart] = useState(
    myInfoData.me.studyDefaultSet.scheduleStart,
  );
  const [lastEnd, setLastEnd] = useState(
    myInfoData.me.studyDefaultSet.scheduleEnd,
  );
  const overhours =
    myInfoData.me.studyDefaultSet.scheduleEnd -
    myInfoData.me.studyDefaultSet.scheduleStart;
  const [scheHeight, setScheHeight] = useState(
    overhours < 11 ? '605px' : 605 + (overhours - 10) * 52 + 'px',
  );
  const [dayBool, setDayBool] = useState(new Array(7).fill(false));

  const scheTitle = useInput('');
  const scheLocation = useInput('');
  const subjectName = useInput('');
  const todolistName = useInput('');
  const scheduleStart = useInput(
    myInfoData.me.studyDefaultSet.scheduleStart,
    start_range,
    undefined,
    true,
  );
  const scheduleEnd = useInput(
    myInfoData.me.studyDefaultSet.scheduleEnd,
    end_range,
    undefined,
    true,
  );
  const [subjectColor, setSubjectColor] = useState(`#0F4C82`);

  const [saveScheduleMutation] = useMutation(SAVE_SCHEDULE);
  const [addSubjectMutation] = useMutation(ADD_SUBJECT);
  const [editSubjectMutation] = useMutation(EDIT_SUBJECT);
  const [deleteSubjectMutation] = useMutation(DELETE_SUBJECT);
  const [bookMarkSubjectMutation] = useMutation(BOOKMARK_SUBJECT);
  const [addTodolistMutation] = useMutation(ADD_TODOLIST);
  const [deleteTodolistMutation] = useMutation(DELETE_TODOLIST);
  const [finishTodolistMutation] = useMutation(FINISH_TODOLIST);
  const [editStudySetMutation] = useMutation(EDIT_STUDYSET);
  const {
    data: subjectData,
    loading: subjectLoading,
    refetch: subjectRefetch,
    networkStatus: subjectnetwork,
  } = useQuery(MY_SUBJECT, { notifyOnNetworkStatusChange: true });
  const {
    data: todolistData,
    loading: todolistLoading,
    refetch: todolistRefetch,
  } = useQuery(MY_TODOLIST);

  const handleChangeComplete = (color, event) => {
    setSubjectColor(color.hex);
  };

  const onSaveSet = async () => {
    if (scheduleStart.value >= scheduleEnd.value) {
      alert('스케줄러 끝 시간이 시작 시간과 같거나 빠를 수 없습니다.');
      scheduleEnd.setValue(scheduleStart.value + 1);
      return;
    }

    try {
      toast.info('기본값 세팅 적용 중...');
      const {
        data: { editStudySet },
      } = await editStudySetMutation({
        variables: {
          scheduleStart: scheduleStart.value,
          scheduleEnd: scheduleEnd.value,
        },
      });
      if (!editStudySet) {
        alert('기본값 세팅을 적용할 수 없습니다.');
      } else {
        setLastStart(scheduleStart.value);
        setLastEnd(scheduleEnd.value);
        const diffHours = scheduleEnd.value - scheduleStart.value;
        setScheHeight(
          diffHours < 11 ? '605px' : 605 + (diffHours - 10) * 52 + 'px',
        );
        toast.success('새로운 기본값 세팅을 적용하였습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  useEffect(() => {
    const { real_weekStart: copyS, real_weekEnd: copyE } = WeekRange(copyDate);
    setCopyStart(copyS);
    setCopyEnd(copyE);
    const { real_weekStart: pasteS, real_weekEnd: pasteE } = WeekRange(
      pasteDate,
    );
    setPasteStart(pasteS);
    setPasteEnd(pasteE);
  }, [copyDate, pasteDate]);

  if ((subjectnetwork === 7 || subjectnetwork === 4) && !todolistLoading) {
    return (
      <MySchedulePresenter
        cal={cal}
        startRange={startRange}
        setStartRange={setStartRange}
        endRange={endRange}
        setEndRange={setEndRange}
        myData={myInfoData.me}
        myRefetch={myInfoRefetch}
        saveScheduleMutation={saveScheduleMutation}
        subjectList={subjectData.mySubject}
        subjectName={subjectName}
        todolistName={todolistName}
        subjectColor={subjectColor}
        setSubjectColor={setSubjectColor}
        handleChangeComplete={handleChangeComplete}
        addSubjectMutation={addSubjectMutation}
        editSubjectMutation={editSubjectMutation}
        deleteSubjectMutation={deleteSubjectMutation}
        bookMarkSubjectMutation={bookMarkSubjectMutation}
        subjectRefetch={subjectRefetch}
        networkStatus={networkStatus}
        subjectnetwork={subjectnetwork}
        todolistData={todolistData.myTodolist}
        addTodolistMutation={addTodolistMutation}
        todolistRefetch={todolistRefetch}
        deleteTodolistMutation={deleteTodolistMutation}
        finishTodolistMutation={finishTodolistMutation}
        scheduleStart={scheduleStart}
        scheduleEnd={scheduleEnd}
        onSaveSet={onSaveSet}
        scheHeight={scheHeight}
        lastStart={lastStart}
        lastEnd={lastEnd}
        copyBool={copyBool}
        setCopyBool={setCopyBool}
        copyDate={copyDate}
        setCopyDate={setCopyDate}
        pasteDate={pasteDate}
        setPasteDate={setPasteDate}
        copyStart={copyStart}
        copyEnd={copyEnd}
        pasteStart={pasteStart}
        pasteEnd={pasteEnd}
        copyOne={copyOne}
        setCopyOne={setCopyOne}
        pasteOne={pasteOne}
        setPasteOne={setPasteOne}
        dayBool={dayBool}
        setDayBool={setDayBool}
        sTime={sTime}
        setSTime={setSTime}
        eTime={eTime}
        setETime={setETime}
        stateList={stateList}
        scheTitle={scheTitle}
        scheLocation={scheLocation}
      />
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
};
