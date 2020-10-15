import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import StudyPresenter from './StudyPresenter';
import { ME } from '../Tabs/MyStudyTabs/MyStudyTabsQueries';
import Loader from '../../Components/Loader';
import useInput from '../../Hooks/useInput';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default () => {
  const minValue_10 = (value) => value >= 10;
  const refreshTerm = useInput(10, minValue_10);
  const [refreshBool, setRefreshBool] = useState(true);
  const [studyBool, setStudyBool] = useState(false);

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

  const autoSwitch = () => {
    if (refreshBool) {
      stopPolling();
      setRefreshBool(false);
    } else {
      startPolling(refreshTerm.value * 1000);
      setRefreshBool(true);
    }
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      startPolling(refreshTerm.value * 1000);
      isFirstRun.current = false;
      return;
    }
  }, []);

  const TermChange = () => {
    startPolling(refreshTerm.value * 1000);
    setRefreshBool(true);
    alert(`자동 새로고침이 ${refreshTerm.value}초 간격으로 활성화 됐습니다.`);
  };

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
        autoSwitch={autoSwitch}
        refreshBool={refreshBool}
        myInfoRefetch={myInfoRefetch}
        refreshTerm={refreshTerm}
        TermChange={TermChange}
        studyBool={studyBool}
        setStudyBool={setStudyBool}
      />
    );
  }
};
