import React, { useState } from 'react';
import ClassStaPresenter from './ClassStaPresenter';
import useSelect from '../../../../Hooks/useSelect';
import useTabs from '../../../../Hooks/useTabs';
import useInput from './../../../../Hooks/useInput';

const ClassStaContainer = ({ classList, classRefetch }) => {
  classRefetch();
  const myClassList = useSelect(
    classList.map((List) => `${List.name}(${List.academy.name})`),
    classList.map((_, index) => index),
  );

  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);
  const minValue_10 = (value) => value >= 10;
  const refreshTerm = useInput(10, minValue_10);

  const [selectDate, setSelectDate] = useState(new Date());

  return (
    <ClassStaPresenter
      myClassList={myClassList}
      classList={classList}
      selectClass={classList[myClassList.option]}
      StaTabs={StaTabs}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      scheduleList={classList[myClassList.option].schedules}
      refreshTerm={refreshTerm}
    />
  );
};

export default ClassStaContainer;
