import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import MyStudyTabsPresenter from './MyStudyTabsPresenter';
import { ME } from './MyStudyTabsQueries';
import Loader from '../../../Components/Loader';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ pageIndex }) => {
  const { data: myData, loading: myLoading, refetch: myRefetch } = useQuery(ME);

  if (myLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!myLoading && myData && myData.me) {
    return (
      <MyStudyTabsPresenter
        pageIndex={pageIndex}
        myData={myData.me}
        myRefetch={myRefetch}
      />
    );
  }
};
