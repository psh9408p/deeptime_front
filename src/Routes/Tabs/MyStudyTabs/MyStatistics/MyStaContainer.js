import React, { useState, useRef } from 'react';
import ClassStaPresenter from './MyStaPresenter';
import useTabs from '../../../../Hooks/useTabs';

export default ({ myInfoData, networkStatus, refreshTerm }) => {
  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);
  const [selectDate, setSelectDate] = useState(new Date());
  const oneDayHours_tmp = Array.from(Array(24).keys());
  const oneDayHours = oneDayHours_tmp.map(String);
  const todayCalLoading = useRef(true);
  const weekCalLoading = useRef(true);
  const monthCalLoading = useRef(true);

  return (
    <ClassStaPresenter
      StaTabs={StaTabs}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      myInfoData={myInfoData.me}
      networkStatus={networkStatus}
      refreshTerm={refreshTerm}
      oneDayHours={oneDayHours}
      todayCalLoading={todayCalLoading}
      weekCalLoading={weekCalLoading}
      monthCalLoading={monthCalLoading}
    />
  );
};
