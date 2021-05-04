import React from 'react';
import MyStatistics from '../Tabs/MyStudyTabs/MyStatistics';
import MySchedule from '../Tabs/MyStudyTabs/MySchedule';
import BookAnalysis from '../Tabs/MyStudyTabs/BookAnalysis';

export default ({ pageIndex, defaultSet }) => {
  if (pageIndex === 0) {
    return <MySchedule defaultSet={defaultSet} />;
  } else if (pageIndex === 1) {
    return <MyStatistics />;
  } else if (pageIndex === 2) {
    return <BookAnalysis />;
  }
};
