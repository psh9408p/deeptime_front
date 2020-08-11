import React, { useState, useEffect, useRef } from 'react';
import ClassStaPresenter from './MyStaPresenter';
import useTabs from '../../../../Hooks/useTabs';

export default ({ myInfoData, networkStatus, refreshTerm }) => {
  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);
  const [selectDate, setSelectDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date());
  const oneDayHours_tmp = Array.from(Array(24).keys());
  const oneDayHours = oneDayHours_tmp.map(String);
  const todayCalLoading = useRef(true);
  const weekCalLoading = useRef(true);
  const monthCalLoading = useRef(true);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      nextDate.setDate(new Date().getDate() + 1);
      return;
    }
    nextDate.setTime(selectDate.getTime());
    nextDate.setDate(nextDate.getDate() + 1);
  }, [selectDate]);

  return (
    <ClassStaPresenter
      StaTabs={StaTabs}
      selectDate={selectDate}
      nextDate={nextDate}
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
