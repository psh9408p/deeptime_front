import React from 'react';
import styled from 'styled-components';
import useTabs from '../Hooks/useTabs';
import Loader from '../Components/Loader';
import AccountTabs from './Tabs/AccountTabs';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const ACCOUNT_ME = gql`
  query me {
    me {
      id
      lastName
      firstName
      username
      email
      phoneNumber
      studyGroup
      studyGroup2
      studyGroup3
      address1
      address2
      termsOfMarketing
    }
  }
`;

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

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
  const myTabContents = ['프로필 편집', '비밀번호 변경'];
  const myTabs = useTabs(0, myTabContents);

  const { data: meData, loading: meLoading, refetch: meRefetch } = useQuery(
    ACCOUNT_ME,
  );

  if (!meLoading && meData && meData.me) {
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
        <AccountTabs
          pageIndex={myTabs.currentIndex}
          meData={meData.me}
          meRefetch={meRefetch}
        />
      </Wrapper>
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
};
