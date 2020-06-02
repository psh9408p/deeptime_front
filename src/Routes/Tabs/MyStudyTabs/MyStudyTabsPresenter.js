import React, { useRef, useEffect } from 'react';
import MyStatistics from './MyStatistics';
import MySchedule from './MySchedule';

export default ({
  pageIndex,
  myInfoData,
  myInfoRefetch,
  networkStatus,
  refreshTerm,
  startPolling,
  stopPolling,
}) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    myInfoRefetch();
  }, []);

  if (pageIndex === 0) {
    startPolling(Number(refreshTerm.value) * 1000);
    return (
      <MyStatistics
        myInfoData={myInfoData}
        networkStatus={networkStatus}
        refreshTerm={refreshTerm}
      />
    );
  } else if (pageIndex === 1) {
    stopPolling();
    return (
      <MySchedule
        pageIndex={pageIndex}
        myInfoData={myInfoData}
        myInfoRefetch={myInfoRefetch}
      />
    );
  }
};
