import React, { useState } from 'react';
import ClassStaPresenter from './ClassStaPresenter';
import useSelect from '../../../../Hooks/useSelect';
import useTabs from '../../../../Hooks/useTabs';
import { useQuery } from 'react-apollo-hooks';
import { SCHEDULE_OF_CLASS } from './ClassStaQueries';

const ClassStaContainer = ({ classList }) => {
  const myClassList = useSelect(
    classList.map((List) => `${List.name}(${List.organizationName})`),
    classList.map((_, index) => index),
  );

  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);

  const [selectDate, setSelectDate] = useState(new Date());

  const {
    data: scheduleData,
    loading: scheduleLoading,
    refetch: scheduleRefetch,
  } = useQuery(SCHEDULE_OF_CLASS, {
    variables: { classId: classList[myClassList.option].id },
  });

  return (
    <ClassStaPresenter
      myClassList={myClassList}
      classList={classList}
      selectClass={classList[myClassList.option]}
      StaTabs={StaTabs}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      scheduleList={scheduleData.scheduleOfClass}
      scheduleLoading={scheduleLoading}
    />
  );
};

export default ClassStaContainer;
