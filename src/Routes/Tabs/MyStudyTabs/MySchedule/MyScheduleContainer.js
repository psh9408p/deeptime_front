import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Loader from '../../../../Components/Loader';
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
} from './MyScheduleQueries';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ myInfoData, myInfoRefetch, networkStatus }) => {
  const cal = useRef(null);
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');
  const subjectName = useInput('');
  const [subjectColor, setSubjectColor] = useState(`#0F4C82`);

  const [saveScheduleMutation] = useMutation(SAVE_SCHEDULE);
  const [addSubjectMutation] = useMutation(ADD_SUBJECT);
  const [editSubjectMutation] = useMutation(EDIT_SUBJECT);
  const [deleteSubjectMutation] = useMutation(DELETE_SUBJECT);
  const [bookMarkSubjectMutation] = useMutation(BOOKMARK_SUBJECT);
  const {
    data: subjectData,
    loading: subjectLoading,
    refetch: subjectRefetch,
    networkStatus: subjectnetwork,
  } = useQuery(MY_SUBJECT, { notifyOnNetworkStatusChange: true });

  const handleChangeComplete = (color, event) => {
    setSubjectColor(color.hex);
  };

  if (subjectnetwork === 7 || subjectnetwork === 4) {
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
