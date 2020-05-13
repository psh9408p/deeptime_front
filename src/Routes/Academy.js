import React from 'react';
import styled from 'styled-components';
import useTabs from '../Hooks/useTabs';
import AcademyTabs from './Tabs/AcademyTabs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

const AcademyButton = styled.button`
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

export default () => {
  const academyTabContents = ['학원 통계', '나의 학원'];
  const academyTabs = useTabs(0, academyTabContents);

  return (
    <Wrapper>
      <Tabs>
        {academyTabs.content.map((section, index) => (
          <AcademyButton
            key={index}
            onClick={() => academyTabs.changeItem(index)}
          >
            {section}
          </AcademyButton>
        ))}
      </Tabs>
      <AcademyTabs
        pageIndex={academyTabs.currentIndex}
        pageIndexChange={academyTabs.changeItem}
      />
    </Wrapper>
  );
};
