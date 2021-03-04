import React from 'react';
import ProfileTabsPresenter from './ProfileTabsPresenter';

export default ({ pageIndex, User }) => {
  return <ProfileTabsPresenter pageIndex={pageIndex} User={User} />;
};
