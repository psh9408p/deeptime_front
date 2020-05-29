import React from 'react';
import MyStatistics from './MyStatistics';
import MySchedule from './MySchedule';

export default ({ pageIndex, myData, myRefetch }) => {
  if (pageIndex === 0) {
    myRefetch();
    return <MyStatistics myData={myData} />;
  } else if (pageIndex === 1) {
    myRefetch();
    return (
      <MySchedule myData={myData} myRefetch={myRefetch} pageIndex={pageIndex} />
    );
  }
};
