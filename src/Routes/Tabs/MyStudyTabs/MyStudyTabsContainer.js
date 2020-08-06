import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from '../../../Components/Loader';
import MyStudyTabsPresenter from './MyStudyTabsPresenter';
import { ME, CREATE_DEFAULTSUBJECT } from './MyStudyTabsQueries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import useInput from '../../../Hooks/useInput';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ pageIndex, setPageIndex }) => {
  const minValue_10 = (value) => value >= 10;
  const refreshTerm = useInput(10, minValue_10);
  const [loadingToggle, setLoadingToggle] = useState(true);

  const [createDefaultSubjectMutation] = useMutation(CREATE_DEFAULTSUBJECT);
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

  console.log(networkStatus, myInfoData);
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
        refreshTerm={refreshTerm}
        startPolling={startPolling}
        stopPolling={stopPolling}
        createDefaultSubjectMutation={createDefaultSubjectMutation}
        loadingToggle={loadingToggle}
        setLoadingToggle={setLoadingToggle}
        setPageIndex={setPageIndex}
      />
    );
  }
};
