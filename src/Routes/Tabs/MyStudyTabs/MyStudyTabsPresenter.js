import React from 'react';
import MyStatistics from './MyStatistics';
import MySchedule from './MySchedule';

export default ({
  pageIndex,
  myInfoData,
  myInfoRefetch,
  networkStatus,
  subjectData,
  subjectRefetch,
  subjectnetwork,
}) => {
  if (pageIndex === 0) {
    // stopPolling();
    return (
      <MySchedule
        myInfoData={myInfoData.me}
        myInfoRefetch={myInfoRefetch}
        networkStatus={networkStatus}
        subjectList={subjectData.mySubject}
        subjectRefetch={subjectRefetch}
        subjectnetwork={subjectnetwork}
      />
    );
  } else if (pageIndex === 1) {
    // startPolling(Number(refreshTerm.value) * 1000);
    return (
      <MyStatistics
        myInfoData={myInfoData.me}
        myInfoRefetch={myInfoRefetch}
        networkStatus={networkStatus}
      />
    );
  }
};
