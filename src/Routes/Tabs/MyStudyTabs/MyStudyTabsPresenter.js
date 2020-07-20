import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../../../Components/Loader';
import MyStatistics from './MyStatistics';
import MySchedule from './MySchedule';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({
  pageIndex,
  myInfoData,
  myInfoRefetch,
  networkStatus,
  refreshTerm,
  startPolling,
  stopPolling,
  createDefaultSubjectMutation,
}) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    myInfoRefetch();
  }, []);

  if (pageIndex === 0) {
    startPolling(Number(refreshTerm.value) * 1000);
    return (
      <MyStatistics
        myInfoData={myInfoData}
        networkStatus={networkStatus}
        refreshTerm={refreshTerm}
      />
    );
  } else if (pageIndex === 1) {
    stopPolling();
    // if (!myInfoData.me.setDefaultSubject) {
    //   const createLoading = await createDefaultSubjectMutation();
    //   console.log('a', createLoading);
    //   return (
    //     <LoaderWrapper>
    //       <Loader />
    //     </LoaderWrapper>
    //   );
    // } else {
    return (
      <MySchedule
        pageIndex={pageIndex}
        myInfoData={myInfoData}
        myInfoRefetch={myInfoRefetch}
        networkStatus={networkStatus}
      />
    );
    // }
  }
};
