import React from 'react';
import ProfileTabsPresenter from './ProfileTabsPresenter';

// const LoaderWrapper = styled.div`
//   margin: 100px 0px;
// `;

export default ({ pageIndex }) => {
  //   if (academyLoading === true) {
  //   return (
  //     <LoaderWrapper>
  //       <Loader />
  //     </LoaderWrapper>
  //   );
  // } else if (!academyLoading && academyData && academyData.myAcademy) {
  return <ProfileTabsPresenter pageIndex={pageIndex} />;
  // }
};
