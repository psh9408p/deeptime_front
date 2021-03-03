import React from 'react';
import MyStatistics from '../Tabs/MyStudyTabs/MyStatistics';
import MySchedule from '../Tabs/MyStudyTabs/MySchedule';

export default ({ pageIndex, defaultSet }) => {
  if (pageIndex === 0) {
    return <MySchedule defaultSet={defaultSet} />;
  } else if (pageIndex === 1) {
    // return (
    //   <MyStatistics
    //     myInfoData={myInfoData.me}
    //     myInfoRefetch={myInfoRefetch}
    //     networkStatus={networkStatus}
    //   />
    // );
    return <div>dd</div>;
  }
};
