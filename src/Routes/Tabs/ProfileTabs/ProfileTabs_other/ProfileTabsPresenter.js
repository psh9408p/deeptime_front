import React from 'react';
import styled from 'styled-components';
import SquarePost from '../../../../Components/SquarePost';
import OtherStatistics from './OtherStatistics';
import OtherSchedule from './OtherSchedule';

const Posts = styled.div`
  margin-top: 20px;
  display: grid;
  justify-content: center;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NonPublicDiv = styled.div`
  width: 100%;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin: 180px auto;
`;

export default ({ pageIndex, User }) => {
  if (pageIndex === 0) {
    if (!User.pubOfFeed && !User.isFollowed) {
      return <NonPublicDiv>비공개 계정입니다</NonPublicDiv>;
    } else if (User.posts.length === 0) {
      return <NonPublicDiv>게시물이 없습니다.</NonPublicDiv>;
    } else {
      return (
        <Posts>
          {User.posts.map((post) => (
            <SquarePost
              key={post.id}
              postId={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          ))}
        </Posts>
      );
    }
  } else if (pageIndex === 1) {
    if (!User.pubOfStatistic && !User.isFollowed) {
      return <NonPublicDiv>비공개 계정입니다</NonPublicDiv>;
    } else {
      return (
        <ContentWrap>
          <OtherStatistics userData={User} />
        </ContentWrap>
      );
    }
  } else if (pageIndex === 2) {
    if (!User.pubOfSchedule && !User.isFollowed) {
      return <NonPublicDiv>비공개 계정입니다</NonPublicDiv>;
    } else {
      return (
        <ContentWrap>
          <OtherSchedule userData={User} />
        </ContentWrap>
      );
    }
  }
};
