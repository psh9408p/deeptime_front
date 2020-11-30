import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../Loader';
import { FEED_ONE_QUERY } from './SquarePostQueries';
import Post from '../Post';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 598px;
  height: 600px;
`;

export default ({ postId }) => {
  const variables = {
    variables: { postId },
  };
  const { data: feedData, loading, refetch } = useQuery(
    FEED_ONE_QUERY,
    variables,
  );

  if (loading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    const post = feedData.seeOneFeed;
    return (
      <Post
        key={post.id}
        id={post.id}
        location={post.location}
        caption={post.caption}
        user={post.user}
        files={post.files}
        likeCount={post.likeCount}
        isLiked={post.isLiked}
        isSelf={post.isSelf}
        comments={post.comments}
        createdAt={post.createdAt}
        fileKey={post.files.map((file) => file.key)}
        // setMyTabs={setMyTabs}
        // setEditPostId={setEditPostId}
        // locationInput={location}
        // captionInput={caption}
        refetchQuerie={FEED_ONE_QUERY}
        variables={variables}
      />
    );
  }
};
