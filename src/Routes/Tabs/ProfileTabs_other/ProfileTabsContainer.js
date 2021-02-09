import React from 'react';
import ProfileTabsPresenter from './ProfileTabsPresenter';

export default ({ pageIndex, User, networkStatus }) => {
  return (
    <ProfileTabsPresenter
      pageIndex={pageIndex}
      User={User}
      networkStatus={networkStatus}
    />
  );
};
