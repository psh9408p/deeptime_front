import React, { useEffect } from 'react';
import MyStatistics from './MyStatistics';
import MySchedule from './MySchedule';

export default ({ pageIndex, myInfoData, myInfoRefetch, networkStatus }) => {
  useEffect(() => {
    myInfoRefetch();
  }, []);

  if (pageIndex === 0) {
    // stopPolling();
    return (
      <MySchedule
        myInfoData={myInfoData}
        myInfoRefetch={myInfoRefetch}
        networkStatus={networkStatus}
      />
    );
  } else if (pageIndex === 1) {
    // startPolling(Number(refreshTerm.value) * 1000);
    return (
      <MyStatistics
        myInfoData={myInfoData}
        myInfoRefetch={myInfoRefetch}
        networkStatus={networkStatus}
      />
    );
  }
};
