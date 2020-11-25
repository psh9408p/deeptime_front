import React, { useState } from 'react';
import { Helmet } from 'rl-react-helmet';
import styled from 'styled-components';
import { FEED_QUERY } from './FeedQueries';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../Components/Loader';
import FeedPresenter from './FeedPresenter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default () => {
  // 새로고침을 통해 로그인 시 seeFeed 에러 고치는 법
  // const count = localStorage.getItem("refresh_count") + 1
  // localStorage.setItem("refresh_count", count)
  // if (count === "01") {
  //   window.location.reload()
  // }
  const [myTabs, setMyTabs] = useState(0);

  const { data: feedData, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {!loading && feedData && feedData.seeFeed && (
        <FeedPresenter
          feedData={feedData.seeFeed}
          myTabs={myTabs}
          setMyTabs={setMyTabs}
        />
      )}
    </Wrapper>
  );
};
