import React from 'react';
import ProfileTabsPresenter from './ProfileTabsMPresenter';

// const LoaderWrapper = styled.div`
//   margin: 100px 0px;
// `;

export default ({ pageIndex, data }) => {
  //   if (academyLoading === true) {
  //   return (
  //     <LoaderWrapper>
  //       <Loader />
  //     </LoaderWrapper>
  //   );
  // } else if (!academyLoading && academyData && academyData.myAcademy) {
  return <ProfileTabsPresenter pageIndex={pageIndex} data={data} />;
  // }
};
