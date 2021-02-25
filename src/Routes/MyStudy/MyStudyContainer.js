import React from 'react';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import MyStudyPresenter from './MyStudyPresenter';
import { ME, MY_SUBJECT } from './MyStudyQueries';
import { useQuery } from '@apollo/react-hooks';
import useTabs from '../../Hooks/useTabs';
import Tab from '../../Components/Tab';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default () => {
  const myTabContents = ['나의 스케줄', '나의 통계'];
  const myTabs = useTabs(0, myTabContents);

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

  return (
    <Wrapper>
      <Tab tabs={myTabs} />
      {networkStatus === 1 || subjectnetwork === 1 ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <MyStudyPresenter
          pageIndex={myTabs.currentIndex}
          myInfoData={myInfoData}
          myInfoRefetch={myInfoRefetch}
          networkStatus={networkStatus}
          subjectData={subjectData}
          subjectRefetch={subjectRefetch}
          subjectnetwork={subjectnetwork}
        />
      )}
    </Wrapper>
  );
};
