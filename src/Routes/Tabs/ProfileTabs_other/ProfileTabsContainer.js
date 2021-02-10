import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProfileTabsPresenter from './ProfileTabsPresenter';
import { USER_SUBJECT } from './ProfileTabsQueries';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../../Components/Loader';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ pageIndex, User, userRefetch, networkStatus }) => {
  const {
    data: subjectData,
    loading: subjectLoading,
    refetch: subjectRefetch,
    networkStatus: subjectnetwork,
  } = useQuery(USER_SUBJECT, {
    variables: { userId: User.id },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    userRefetch();
    subjectRefetch();
  }, []);

  if (subjectnetwork === 1) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <ProfileTabsPresenter
        pageIndex={pageIndex}
        User={User}
        networkStatus={networkStatus}
        subjectData={subjectData}
        subjectnetwork={subjectnetwork}
      />
    );
  }
};
