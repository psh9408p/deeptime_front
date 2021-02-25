import React from 'react';
import styled from 'styled-components';
import useTabs from '../../Hooks/useTabs';
import Tab from '../../Components/Tab';
import GroupPresenter from './GroupPresenter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  const myTabContents = ['나의 그룹', '그룹 검색'];
  const myTabs = useTabs(0, myTabContents);

  return (
    <Wrapper>
      <Tab tabs={myTabs} />
      <GroupPresenter myTabs={myTabs} />
    </Wrapper>
  );
};
