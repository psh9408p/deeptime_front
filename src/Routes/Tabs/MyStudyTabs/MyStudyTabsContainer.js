import React, { useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../../../Components/Loader';
import MyStudyTabsPresenter from './MyStudyTabsPresenter';
import { ME, MY_SUBJECT } from './MyStudyTabsQueries';
import { useQuery } from '@apollo/react-hooks';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ pageIndex }) => {
  const {
    data: myInfoData,
    loading: myInfoLoading,
    refetch: myInfoRefetch,
    // startPolling,
    // stopPolling,
    networkStatus,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: subjectData,
    loading: subjectLoading,
    refetch: subjectRefetch,
    networkStatus: subjectnetwork,
  } = useQuery(MY_SUBJECT, { notifyOnNetworkStatusChange: true });

  useEffect(() => {
    myInfoRefetch();
    subjectRefetch();
  }, []);

  if (networkStatus === 1 || subjectnetwork === 1) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <MyStudyTabsPresenter
        pageIndex={pageIndex}
        myInfoData={myInfoData}
        myInfoRefetch={myInfoRefetch}
        networkStatus={networkStatus}
        subjectData={subjectData}
        subjectRefetch={subjectRefetch}
        subjectnetwork={subjectnetwork}
      />
    );
  }
};
