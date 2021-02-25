import React from 'react';
import MyGroup from '../Tabs/GroupTabs/MyGroup';
import SearchGroup from '../Tabs/GroupTabs/SearchGroup';

export default ({ myTabs }) => {
  if (myTabs.currentIndex === 0) {
    return <MyGroup myTabs={myTabs} />;
  } else {
    return <SearchGroup myTabs={myTabs} />;
  }
};
