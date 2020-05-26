import React from 'react';
import MyStatistics from './MyStatistics';
import MySchedule from './MySchedule';

export default ({ pageIndex, myData, myRefetch }) => {
  myRefetch();
  if (pageIndex === 0) {
    return <MyStatistics myData={myData} />;
  } else if (pageIndex === 1) {
    return (
      <MySchedule myData={myData} myRefetch={myRefetch} pageIndex={pageIndex} />
    );
  }
};
