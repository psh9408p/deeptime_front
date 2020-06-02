import React, { useState, useRef } from 'react';
import ClassStaPresenter from './MyStaPresenter';
import useTabs from '../../../../Hooks/useTabs';

export default ({ myInfoData, networkStatus, refreshTerm }) => {
  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);
  const [selectDate, setSelectDate] = useState(new Date());
  const oneDayHours_tmp = Array.from(Array(24).keys());
  const oneDayHours_num = oneDayHours_tmp.map((a) => a + 1);
  const oneDayHours = oneDayHours_num.map(String);
  const calLoading = useRef(false);

  console.log(networkStatus, calLoading);
  return (
    <ClassStaPresenter
      StaTabs={StaTabs}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      myInfoData={myInfoData.me}
      networkStatus={networkStatus}
      refreshTerm={refreshTerm}
      oneDayHours={oneDayHours}
      calLoading={calLoading}
    />
  );
};
