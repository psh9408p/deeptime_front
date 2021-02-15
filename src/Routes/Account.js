import React from 'react';
import styled from 'styled-components';
import useTabs from '../Hooks/useTabs';
import Loader from '../Components/Loader';
import Tab from '../Components/Tab';
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
      bio
      email
      phoneNumber
      studyPurpose
      studyGroup
      studyGroup2
      studyGroup3
      address1
      address2
      termsOfMarketing
      pubOfFeed
      pubOfStatistic
      pubOfSchedule
      loginPosition
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

export default () => {
  const myTabContents = ['프로필 편집', '비밀번호 변경'];
  const myTabs = useTabs(0, myTabContents);

  const { data: meData, loading: meLoading, refetch: meRefetch } = useQuery(
    ACCOUNT_ME,
  );

  if (!meLoading && meData && meData.me) {
    return (
      <Wrapper>
        <Tab tabs={myTabs} />
        {/* <Tabs>
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
        </Tabs> */}
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
