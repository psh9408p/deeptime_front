import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../Loader';
import { FEED_ONE_QUERY } from './SquarePostQueries';
import { GET_USER } from '../../Routes/Profile/ProfileQueries';
import Post from '../Post';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

export default ({ postId, setViewTab, location, caption, close }) => {
  const routeLocation = useLocation();
  const pageName = routeLocation.pathname.split('/')[1];

  const variables_deletePost = { username: pageName };
  const variables = { postId };
  const { data: feedData, loading, refetch } = useQuery(FEED_ONE_QUERY, {
    variables: variables,
  });

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
        setMyTabs={setViewTab}
        setEditPostId={() => {}}
        locationInput={location}
        captionInput={caption}
        refetchQuerie_deletePost={GET_USER}
        variables_deletePost={variables_deletePost}
        refetchQuerie={FEED_ONE_QUERY}
        variables={variables}
        close={close}
      />
    );
  }
};
