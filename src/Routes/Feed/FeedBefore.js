import React from 'react';
import styled from 'styled-components';
import { ME_GROUP } from './FeedQueries';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../Components/Loader';
import FeedContainer from './FeedContainer';

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default () => {
  const { data: meData, loading: meLoading } = useQuery(ME_GROUP);

  return (
    <>
      {meLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {meData && meData.me && <FeedContainer meData={meData.me} />}
    </>
  );
};
