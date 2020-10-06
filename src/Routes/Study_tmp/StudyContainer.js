import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import StudyPresenter from './StudyPresenter';
import { ME } from '../Tabs/MyStudyTabs/MyStudyTabsQueries';
import Loader from '../../Components/Loader';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default () => {
  const {
    data: myInfoData,
    loading: myInfoLoading,
    refetch: myInfoRefetch,
    startPolling,
    stopPolling,
    networkStatus,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
  });

  console.log(networkStatus);
  if (networkStatus === 1) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <StudyPresenter
        myInfoData={myInfoData.me}
        networkStatus={networkStatus}
        startPolling={startPolling}
      />
    );
  }
};
