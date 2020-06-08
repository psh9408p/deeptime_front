import React, { useState } from 'react';
import StudyPresenter from './StudyPresenter';
import useSelect from '../../Hooks/useSelect';
import useTabs from '../../Hooks/useTabs';
import { useQuery } from '@apollo/react-hooks';
import { STUDENT_OF_CLASS } from './StudyQueries';

let classId_tmp = '';

const StudyContainer = ({ Mydata }) => {
  const classList = Mydata.me.classes;
  const loginPosition = Mydata.me.loginPosition;

  const myClassList = useSelect(
    classList.map((List) => `${List.name}(${List.academy.name})`),
    classList.map((_, index) => index),
  );

  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);

  const [selectDate, setSelectDate] = useState(new Date());

  if (classList[0] !== undefined) {
    classId_tmp = classList[myClassList.option].id;
  }

  const {
    data: studentData,
    loading: studentLoading,
    refetch: studentRefetch,
    networkStatus,
  } = useQuery(STUDENT_OF_CLASS, {
    pollInterval: 10000,
    variables: { classId: classId_tmp },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <StudyPresenter
      Mydata={Mydata}
      myClassList={myClassList}
      selectClass={classList[myClassList.option]}
      loginPosition={loginPosition}
      StaTabs={StaTabs}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      studentData={studentData}
      studentRefetch={studentRefetch}
      networkStatus={networkStatus}
    />
  );
};

export default StudyContainer;
