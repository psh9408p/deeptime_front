import React from 'react';
import styled from 'styled-components';

const TabsWrap = styled.div`
  border-top: ${(props) => (props.border ? '1px solid #e6e6e6' : 'none')};
  display: flex;
  justify-content: center;
`;

const ProfileButton = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  background-color: ${(props) =>
    props.select ? props.theme.classicBlue : props.theme.inputGray};
  color: ${(props) => (props.select ? 'white' : 'black')};
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

export default ({ tabs, border = false }) => (
  <TabsWrap border={border}>
    {tabs.content.map((section, index) => (
      <ProfileButton
        key={index}
        select={index === tabs.currentIndex}
        onClick={() => tabs.changeItem(index)}
      >
        {section}
      </ProfileButton>
    ))}
  </TabsWrap>
);
