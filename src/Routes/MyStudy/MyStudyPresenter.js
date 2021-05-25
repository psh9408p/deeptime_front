import React from 'react';
import MyStatistics from '../Tabs/MyStudyTabs/MyStatistics';
import MySchedule from '../Tabs/MyStudyTabs/MySchedule';
import ProgressAnalysis from '../Tabs/MyStudyTabs/ProgressAnalysis';
import ProgressAnalysis_tmp from '../Tabs/MyStudyTabs/ProgressAnalysis_tmp';

export default ({ pageIndex, defaultSet }) => {
  if (pageIndex === 0) {
    return <MySchedule defaultSet={defaultSet} />;
  } else if (pageIndex === 1) {
    return <MyStatistics />;
  } else if (pageIndex === 2) {
    return <ProgressAnalysis />;
  } else if (pageIndex === 3) {
    return <ProgressAnalysis_tmp />;
  }
};
