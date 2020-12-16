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
  EDIT_STUDYSET,
  GO_WITH,
} from './StudyQueries';

const LoaderWrapper = styled.div`
  margin: 250px 0px;
`;

export default () => {
  ChannelService.shutdown();

  const todolistName = useInput('');
  const scheduleTitle = useInput('');
  const [studyBool, setStudyBool] = useState(false);
  const [newTodoView, setNewTodoView] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const [onLoading, setOnLoading] = useState(false);
  const [coverView, setCoverView] = useState(false);
  const [reCount, setReCount] = useState(0);

  const [deleteTodolistMutation] = useMutation(DELETE_TODOLIST);
  const [finishTodolistMutation] = useMutation(FINISH_TODOLIST);
  const [addTodolistMutation] = useMutation(ADD_TODOLIST);
  const [startScheduleMutation] = useMutation(START_SCHEDULE);
  const [stopScheduleMutation] = useMutation(STOP_SCHEDULE);
  const [pullScheduleMutation] = useMutation(PULL_SCHEDULE);
  const [cutScheduleMutation] = useMutation(CUT_SCHEDULE);
  const [extensionScheduleMutation] = useMutation(EXTENSION_SCHEDULE);
  const [editStudySetMutation] = useMutation(EDIT_STUDYSET);
  const [goWithMutation] = useMutation(GO_WITH);

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
        myInfoRefetch={myInfoRefetch}
        studyBool={studyBool}
        setStudyBool={setStudyBool}
        todolistData={todolistData.myTodolist}
        todolistRefetch={todolistRefetch}
        subjectData={subjectData.mySubject}
        subjectRefetch={subjectRefetch}
        deleteTodolistMutation={deleteTodolistMutation}
        finishTodolistMutation={finishTodolistMutation}
        addTodolistMutation={addTodolistMutation}
        startScheduleMutation={startScheduleMutation}
        stopScheduleMutation={stopScheduleMutation}
        pullScheduleMutation={pullScheduleMutation}
        cutScheduleMutation={cutScheduleMutation}
        extensionScheduleMutation={extensionScheduleMutation}
        editStudySetMutation={editStudySetMutation}
        todolistName={todolistName}
        newTodoView={newTodoView}
        setNewTodoView={setNewTodoView}
        scheduleTitle={scheduleTitle}
        startPolling={startPolling}
        stopPolling={stopPolling}
        popupView={popupView}
        setPopupView={setPopupView}
        goWithMutation={goWithMutation}
        onLoading={onLoading}
        setOnLoading={setOnLoading}
        coverView={coverView}
        setCoverView={setCoverView}
        reCount={reCount}
        setReCount={setReCount}
      />
    );
  }
};
