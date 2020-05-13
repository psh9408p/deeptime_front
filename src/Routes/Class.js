import React from 'react';
import styled from 'styled-components';
import useTabs from '../Hooks/useTabs';
import ClassTabs from './Tabs/ClassTabs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

const ClassButton = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`;

export default ({ Mydata, MyRefetch }) => {
  // MyRefetch();
  const classTabContents = ['클래스 통계', '나의 클래스', '클래스 스케줄'];
  const classTabs = useTabs(0, classTabContents);

  return (
    <Wrapper>
      <Tabs>
        {classTabs.content.map((section, index) => (
          <ClassButton key={index} onClick={() => classTabs.changeItem(index)}>
            {section}
          </ClassButton>
        ))}
      </Tabs>
      <ClassTabs
        pageIndex={classTabs.currentIndex}
        loginPosition={Mydata.me.loginPosition}
        academyList={Mydata.me.academies}
        pageIndexChange={classTabs.changeItem}
      />
    </Wrapper>
  );
};
