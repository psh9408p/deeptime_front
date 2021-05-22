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
  MY_SCHEDULE,
  MY_SUBJECT,
  EDIT_SUBJECT,
  BOOKMARK_SUBJECT,
  MY_TODOLIST,
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FINISH_TODOLIST,
  EDIT_STUDYSET,
  CREATE_SCHEDULE,
  DELETE_SCHEDULE,
  DRAG_SCHEDULE,
  EDIT_TODOLIST,
  SEE_USERBOOK,
} from './MyScheduleQueries';
import { toast } from 'react-toastify';
import useSelect from '../../../../Hooks/useSelect';
import useKey_oneUp from '../../../../Hooks/useKey_oneUp';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
const fivemin = 1000 * 60 * 5;
const stateBox = ['자습', '강의'];

export default ({ defaultSet, isSelf = true }) => {
  const start_range = (value) => value >= 0 && value <= 23 && value % 1 === 0;
  const end_range = (value) => value >= 1 && value <= 24 && value % 1 === 0;

  const cal = useRef(null);
  const nowDate = new Date();

  const stateList = useSelect(stateBox, stateBox);

  const [todoModiId, setTodoModiId] = useState('');
  const [todoModi, setTodoModi] = useState(false);
  const [subjectColor, setSubjectColor] = useState(`#0F4C82`);
  const [timeError, setTimeError] = useState(false);
  const [scheLoading, setScheLoading] = useState(false);
  const [makeView, setMakeView] = useState(false);
  const [infoView, setInfoView] = useState(false);
  const [modiView, setModiView] = useState(false);
  const [infoSche, setInfoSche] = useState({});
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
  const [lastStart, setLastStart] = useState(defaultSet.scheduleStart);
  const [lastEnd, setLastEnd] = useState(defaultSet.scheduleEnd);
  const overhours = defaultSet.scheduleEnd - defaultSet.scheduleStart;
  const [scheHeight, setScheHeight] = useState(
    overhours < 11 ? '605px' : 605 + (overhours - 10) * 52 + 'px',
  );
  const [dayBool, setDayBool] = useState(
    dayList.map((_, index) => {
      return nowDate.getDay() === index ? true : false;
    }),
  );

  const scheTitle = useInput('');
  const scheLocation = useInput('');
  const subjectName = useInput('');
  const todolistName = useInput('');
  const todoModiName = useInput('');
  const scheduleStart = useInput(
    defaultSet.scheduleStart,
    start_range,
    undefined,
    true,
  );
  const scheduleEnd = useInput(
    defaultSet.scheduleEnd,
    end_range,
    undefined,
    true,
  );

  // ESC누르면 Popup 꺼지게
  useKey_oneUp(
    'Escape',
    [makeView, infoView, modiView],
    [setMakeView, setInfoView, setModiView],
  );
  // useKey_oneUp('Escape', [setInfoView]);

  const [saveScheduleMutation] = useMutation(SAVE_SCHEDULE);
  const [deleteScheduleMutation] = useMutation(DELETE_SCHEDULE);
  const [addSubjectMutation] = useMutation(ADD_SUBJECT);
  const [editSubjectMutation] = useMutation(EDIT_SUBJECT);
  const [deleteSubjectMutation] = useMutation(DELETE_SUBJECT);
  const [bookMarkSubjectMutation] = useMutation(BOOKMARK_SUBJECT);
  const [addTodolistMutation] = useMutation(ADD_TODOLIST);
  const [deleteTodolistMutation] = useMutation(DELETE_TODOLIST);
  const [editTodolistMutation] = useMutation(EDIT_TODOLIST);
  const [finishTodolistMutation] = useMutation(FINISH_TODOLIST);
  const [editStudySetMutation] = useMutation(EDIT_STUDYSET);
  const [createScheMutation] = useMutation(CREATE_SCHEDULE);
  const [dragScheMutation] = useMutation(DRAG_SCHEDULE);

  const {
    data: scheduleData,
    refetch: scheduleRefetch,
    loading: scheduleLoading,
    networkStatus: schedulenetwork,
  } = useQuery(MY_SCHEDULE, { notifyOnNetworkStatusChange: true });
  const {
    data: subjectData,
    refetch: subjectRefetch,
    loading: subjectLoading,
    networkStatus: subjectnetwork,
  } = useQuery(MY_SUBJECT, { notifyOnNetworkStatusChange: true });
  const {
    data: todolistData,
    loading: todolistLoading,
    refetch: todolistRefetch,
  } = useQuery(MY_TODOLIST);
  const {
    data: userbookData,
    loading: userbookLoading,
    refetch: userbookRefetch,
  } = useQuery(SEE_USERBOOK);

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

  const onDeleteSche = async (scheduleId) => {
    if (window.confirm('정말로 스케줄을 삭제하시겠습니까?') === false) {
      return;
    }

    try {
      setScheLoading(true);
      const {
        data: { deleteSchedule },
      } = await deleteScheduleMutation({
        variables: {
          scheduleId,
        },
      });
      if (!deleteSchedule) {
        alert('스케줄을 삭제할 수 없습니다.');
      } else {
        await scheduleRefetch();
        setInfoView(false);
        setScheLoading(false);
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  useEffect(() => {
    const { real_weekStart: copyS, real_weekEnd: copyE } = WeekRange(copyDate);
    setCopyStart(copyS);
    setCopyEnd(copyE);
    const { real_weekStart: pasteS, real_weekEnd: pasteE } =
      WeekRange(pasteDate);
    setPasteStart(pasteS);
    setPasteEnd(pasteE);
  }, [copyDate, pasteDate]);

  // 스케줄 시작 마침 시간 에러 체크
  useEffect(() => {
    // 24시간 넘는지
    const overError = eTime.getTime() - sTime.getTime() > 86400000;
    // 끝시간이 더 뒤인지
    const orderError = sTime >= eTime;
    setTimeError(overError || orderError);
  }, [sTime, eTime]);

  if (
    (schedulenetwork === 4 || schedulenetwork === 7) &&
    (subjectnetwork === 4 || subjectnetwork === 7) &&
    !todolistLoading &&
    !userbookLoading
  ) {
    return (
      <MySchedulePresenter
        cal={cal}
        startRange={startRange}
        setStartRange={setStartRange}
        endRange={endRange}
        setEndRange={setEndRange}
        saveScheduleMutation={saveScheduleMutation}
        subjectName={subjectName}
        todolistName={todolistName}
        subjectColor={subjectColor}
        setSubjectColor={setSubjectColor}
        handleChangeComplete={handleChangeComplete}
        addSubjectMutation={addSubjectMutation}
        editSubjectMutation={editSubjectMutation}
        deleteSubjectMutation={deleteSubjectMutation}
        bookMarkSubjectMutation={bookMarkSubjectMutation}
        scheduleList={scheduleData.mySchedule}
        scheduleRefetch={scheduleRefetch}
        schedulenetwork={schedulenetwork}
        subjectList={subjectData.mySubject}
        subjectRefetch={subjectRefetch}
        subjectnetwork={subjectnetwork}
        todolistData={todolistData.myTodolist}
        addTodolistMutation={addTodolistMutation}
        todolistRefetch={todolistRefetch}
        deleteTodolistMutation={deleteTodolistMutation}
        editTodolistMutation={editTodolistMutation}
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
        createScheMutation={createScheMutation}
        makeView={makeView}
        setMakeView={setMakeView}
        nowDate={nowDate}
        infoView={infoView}
        setInfoView={setInfoView}
        infoSche={infoSche}
        setInfoSche={setInfoSche}
        modiView={modiView}
        setModiView={setModiView}
        onDeleteSche={onDeleteSche}
        dragScheMutation={dragScheMutation}
        scheLoading={scheLoading}
        setScheLoading={setScheLoading}
        timeError={timeError}
        isSelf={isSelf}
        todoModi={todoModi}
        setTodoModi={setTodoModi}
        todoModiName={todoModiName}
        todoModiId={todoModiId}
        setTodoModiId={setTodoModiId}
        userbooks={userbookData.seeUserBook}
        userbookRefetch={userbookRefetch}
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
