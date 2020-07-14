import React from 'react';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ProfilePresenter from './ProfilePresenter';
import useTabs from '../../Hooks/useTabs';

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isSelf
      bio
      email
      academiesCount
      classesCount
      studentsCount
      loginPosition
      studyGroup
      studyGroup2
      studyGroup3
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const profileTabContents = ['구독 / 결제', '개인'];
    const profileTabs = useTabs(0, profileTabContents);

    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [logOut] = useMutation(LOG_OUT);
    return (
      <ProfilePresenter
        loading={loading}
        logOut={logOut}
        data={data}
        profileTabs={profileTabs}
      />
    );
  },
);
