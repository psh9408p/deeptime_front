import React from 'react';
import styled from 'styled-components';
import useTabs from '../Hooks/useTabs';
import Tab from '../Components/Tab';
import MyStudyTabs from './Tabs/MyStudyTabs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  const myTabContents = ['나의 스케줄', '나의 통계'];
  const myTabs = useTabs(0, myTabContents);

  return (
    <Wrapper>
      <Tab tabs={myTabs} />
      <MyStudyTabs pageIndex={myTabs.currentIndex} />
    </Wrapper>
  );
};
