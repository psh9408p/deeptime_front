import React from 'react';
import styled from 'styled-components';
import Loader from '../../../Components/Loader';
import MyStudyTabsPresenter from './MyStudyTabsPresenter';
import { ME } from './MyStudyTabsQueries';
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

  if (networkStatus === 1) {
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
      />
    );
  }
};
