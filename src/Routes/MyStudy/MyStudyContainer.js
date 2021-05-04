import React from 'react';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import MyStudyPresenter from './MyStudyPresenter';
import { MY_STUDYDEFAULTSET } from './MyStudyQueries';
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
  const myTabContents = ['나의 스케줄', '나의 통계', '교재 분석'];
  const myTabs = useTabs(0, myTabContents);

  const { data: defaultSet, loading: defaultSetLoading } = useQuery(
    MY_STUDYDEFAULTSET,
  );

  return (
    <Wrapper>
      <Tab tabs={myTabs} />
      {defaultSetLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <MyStudyPresenter
          pageIndex={myTabs.currentIndex}
          defaultSet={defaultSet.myStudyDefaultSet}
        />
      )}
    </Wrapper>
  );
};
