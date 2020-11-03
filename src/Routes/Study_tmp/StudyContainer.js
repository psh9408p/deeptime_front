import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import StudyPresenter from './StudyPresenter';
import { ME } from '../Tabs/MyStudyTabs/MyStudyTabsQueries';
import Loader from '../../Components/Loader';
import useInput from '../../Hooks/useInput';
import ChannelService from '../../Components/ChannelService';
import {
  MY_TODOLIST,
  FINISH_TODOLIST,
  DELETE_TODOLIST,
  MY_SUBJECT,
  ADD_TODOLIST,
} from '../Tabs/MyStudyTabs/MySchedule/MyScheduleQueries';
import {
  START_SCHEDULE,
  STOP_SCHEDULE,
  PULL_SCHEDULE,
  CUT_SCHEDULE,
  EXTENSION_SCHEDULE,
} from './StudyQueries';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default () => {
  ChannelService.shutdown();
  const minValue_10 = (value) => value >= 10;
  const refreshTerm = useInput(10, minValue_10);

  const todolistName = useInput('');
  const scheduleTitle = useInput('');
  const [refreshBool, setRefreshBool] = useState(true);
  const [studyBool, setStudyBool] = useState(false);
  const [newTodoView, setNewTodoView] = useState(false);

  const [deleteTodolistMutation] = useMutation(DELETE_TODOLIST);
  const [finishTodolistMutation] = useMutation(FINISH_TODOLIST);
  const [addTodolistMutation] = useMutation(ADD_TODOLIST);
  const [startScheduleMutation] = useMutation(START_SCHEDULE);
  const [stopScheduleMutation] = useMutation(STOP_SCHEDULE);
  const [pullScheduleMutation] = useMutation(PULL_SCHEDULE);
  const [cutScheduleMutation] = useMutation(CUT_SCHEDULE);
  const [extensionScheduleMutation] = useMutation(EXTENSION_SCHEDULE);
  const {
    data: myInfoData,
    loading: myInfoLoading,
    refetch: myInfoRefetch,
    startPolling,
    stopPolling,
    networkStatus,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: todolistData,
    loading: todolistLoading,
    refetch: todolistRefetch,
  } = useQuery(MY_TODOLIST);
  const {
    data: subjectData,
    loading: subjectLoading,
    refetch: subjectRefetch,
  } = useQuery(MY_SUBJECT);

  const autoSwitch = () => {
    if (refreshBool) {
      stopPolling();
      setRefreshBool(false);
    } else {
      startPolling(refreshTerm.value * 1000);
      setRefreshBool(true);
    }
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      startPolling(refreshTerm.value * 1000);
      isFirstRun.current = false;
      return;
    }
  }, []);

  const TermChange = () => {
    startPolling(refreshTerm.value * 1000);
    setRefreshBool(true);
    alert(`자동 새로고침이 ${refreshTerm.value}초 간격으로 활성화 됐습니다.`);
  };

  if (networkStatus === 1 || todolistLoading || subjectLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <StudyPresenter
        myInfoData={myInfoData.me}
        networkStatus={networkStatus}
        autoSwitch={autoSwitch}
        refreshBool={refreshBool}
        myInfoRefetch={myInfoRefetch}
        refreshTerm={refreshTerm}
        TermChange={TermChange}
        studyBool={studyBool}
        setStudyBool={setStudyBool}
        todolistData={todolistData.myTodolist}
        todolistRefetch={todolistRefetch}
        subjectData={subjectData.mySubject}
        deleteTodolistMutation={deleteTodolistMutation}
        finishTodolistMutation={finishTodolistMutation}
        addTodolistMutation={addTodolistMutation}
        startScheduleMutation={startScheduleMutation}
        stopScheduleMutation={stopScheduleMutation}
        pullScheduleMutation={pullScheduleMutation}
        cutScheduleMutation={cutScheduleMutation}
        extensionScheduleMutation={extensionScheduleMutation}
        todolistName={todolistName}
        newTodoView={newTodoView}
        setNewTodoView={setNewTodoView}
        scheduleTitle={scheduleTitle}
      />
    );
  }
};
