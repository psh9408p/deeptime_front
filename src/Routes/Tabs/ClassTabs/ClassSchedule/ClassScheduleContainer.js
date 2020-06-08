import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Loader from '../../../../Components/Loader';
import ClassSchedulePresenter from './ClassSchedulePresenter';
import useSelect from '../../../../Hooks/useSelect';
import useInput from '../../../../Hooks/useInput';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  SAVE_SCHEDULE,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  MY_SUBJECT,
  EDIT_SUBJECT,
} from './ClassScheduleQueries';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ classRoom, classRefetch, pageIndex }) => {
  const cal = useRef(null);
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');
  const subjectName = useInput('');
  const [subjectColor, setSubjectColor] = useState(`#0F4C82`);
  const myClassList = useSelect(
    classRoom.map((List) => `${List.name}(${List.academy.name})`),
    classRoom.map((_, index) => index),
  );

  const saveScheduleMutation = useMutation(SAVE_SCHEDULE);
  const addSubjectMutation = useMutation(ADD_SUBJECT);
  const editSubjectMutation = useMutation(EDIT_SUBJECT);
  const deleteSubjectMutation = useMutation(DELETE_SUBJECT);
  const {
    data: subjectData,
    loading: subjectLoading,
    refetch: subjectRefetch,
  } = useQuery(MY_SUBJECT);

  const handleChangeComplete = (color, event) => {
    setSubjectColor(color.hex);
  };

  if (subjectLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!subjectLoading && subjectData && subjectData.mySubject) {
    subjectRefetch();
    return (
      <ClassSchedulePresenter
        cal={cal}
        startRange={startRange}
        setStartRange={setStartRange}
        endRange={endRange}
        setEndRange={setEndRange}
        myClassList={myClassList}
        classRoom={classRoom}
        saveScheduleMutation={saveScheduleMutation}
        classRefetch={classRefetch}
        subjectList={subjectData.mySubject}
        subjectName={subjectName}
        subjectColor={subjectColor}
        setSubjectColor={setSubjectColor}
        handleChangeComplete={handleChangeComplete}
        addSubjectMutation={addSubjectMutation}
        editSubjectMutation={editSubjectMutation}
        deleteSubjectMutation={deleteSubjectMutation}
        subjectRefetch={subjectRefetch}
        pageIndex={pageIndex}
      />
    );
  }
};
