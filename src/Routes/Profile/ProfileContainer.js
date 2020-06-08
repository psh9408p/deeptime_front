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
    const profileTabContents = ['나의 학교', '나의 학원', '나의 독서실'];
    const profileTabs = useTabs(0, profileTabContents);

    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const logOut = useMutation(LOG_OUT);
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
