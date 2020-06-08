import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import useTabs from '../Hooks/useTabs';
import StudentTabs from './Tabs/StudentTabs';
import Loader from '../Components/Loader';
import { gql } from 'apollo-boost';

const MY_CLASS = gql`
  query myClass {
    myClass {
      id
      name
      academy {
        id
        name
      }
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

const ProfileButton = styled.button`
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
  const profileTabContents = ['학생 관리', '좌석 배정'];
  const profileTabs = useTabs(0, profileTabContents);

  const {
    data: classData,
    loading: classLoading,
    refetch: classRefetch,
  } = useQuery(MY_CLASS);

  if (classLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!classLoading && classData && classData.myClass) {
    classRefetch();
    return (
      <Wrapper>
        <Tabs>
          {profileTabs.content.map((section, index) => (
            <ProfileButton
              key={index}
              onClick={() => profileTabs.changeItem(index)}
            >
              {section}
            </ProfileButton>
          ))}
        </Tabs>
        <StudentTabs
          pageIndex={profileTabs.currentIndex}
          pageIndexChange={profileTabs.changeItem}
          classList={classData.myClass}
        />
      </Wrapper>
    );
  }
};
