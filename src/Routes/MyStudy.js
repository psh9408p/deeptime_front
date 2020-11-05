import React from 'react';
import styled from 'styled-components';
import useTabs from '../Hooks/useTabs';
import MyStudyTabs from './Tabs/MyStudyTabs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

const MyButton = styled.button`
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

const MyButton_Blue = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  color: white;
  background-color: ${(props) => props.theme.classicBlue};
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
  const myTabContents = ['스케줄', '통계'];
  const myTabs = useTabs(0, myTabContents);

  return (
    <Wrapper>
      <Tabs>
        {myTabs.content.map((section, index) => {
          if (index === myTabs.currentIndex) {
            return (
              <MyButton_Blue
                key={index}
                onClick={() => myTabs.changeItem(index)}
              >
                {section}
              </MyButton_Blue>
            );
          } else {
            return (
              <MyButton key={index} onClick={() => myTabs.changeItem(index)}>
                {section}
              </MyButton>
            );
          }
        })}
      </Tabs>
      <MyStudyTabs pageIndex={myTabs.currentIndex} />
    </Wrapper>
  );
};
