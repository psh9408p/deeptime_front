import React, { useRef, useState } from 'react';
import ClassSchedulePresenter from './ClassSchedulePresenter';
import useSelect from '../../../../Hooks/useSelect';
import useInput from '../../../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import {
  SAVE_SCHEDULE,
  ADD_SUBJECT,
  DELETE_SUBJECT,
} from './ClassScheduleQueries';

export default ({ classRoom, classRefetch }) => {
  const cal = useRef(null);
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');
  const subjectName = useInput('');

  const myClassList = useSelect(
    classRoom.map((List) => `${List.name}(${List.academy.name})`),
    classRoom.map((_, index) => index),
  );

  const saveScheduleMutation = useMutation(SAVE_SCHEDULE);
  const addSubjectMutation = useMutation(ADD_SUBJECT);
  const deleteSubjectMutation = useMutation(DELETE_SUBJECT);

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
    />
  );
};
