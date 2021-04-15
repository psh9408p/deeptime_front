import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
import FatText from '../FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Delete, Edit, Delete_12 } from '../Icons';
import moment from 'moment';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import ObjectCopy from '../ObjectCopy';
import Loader_lotate from '../Loader_lotate';

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div``;

const File = styled.img`
  max-width: 100%;
  width: 100%;
  max-height: 657.5px;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${Button} {
    &:first-child {
      margin-right: 5px;
    }
  }
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  font-size: 12px;
`;

const TextareaWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  line-height: 17px;
  height: 27px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.inputGray};
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  display: flex;
  flex-direction: row;
  margin-bottom: 7px;
  line-height: 17px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  display: inline-block;
  margin-top: 10px;
  line-height: 17px;
  white-space: pre-wrap;
`;

const HeaderL = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
`;

const HeaderR = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
`;

const DeleteDiv = styled.div`
  width: 12px;
  float: right;
`;

const CommetIn = styled.div`
  width: 100%;
`;

const LikeWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ({
  id,
  user: { username, avatar },
  location,
  category,
  files,
  isLiked,
  isSelf,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption,
  shortCatption,
  moreBool,
  setMoreBool,
  onDelete,
  setMyTabs,
  setEditPostId,
  locationInput,
  captionInput,
  moreComment,
  setMoreComment,
  onDeleteComment,
  commentLoad,
  feedCategory,
}) => {
  const nowDate = new Date();
  const createTime = new Date(createdAt);
  const createTime_cut = new Date(
    createTime.getFullYear(),
    createTime.getMonth(),
    createTime.getDate(),
  );
  const timeGap = nowDate.getTime() - createTime.getTime();
  const timeGap_cut = nowDate.getTime() - createTime_cut.getTime();
  // 시간 표현 기준 어레이 1시간 / 하루 / 8일 이하(render 표현식에서)
  const gapTerm = [3600000, 86400000];

  let lastComments = ObjectCopy(comments);
  lastComments.sort(function (a, b) {
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();
    return bDate - aDate;
  });
  lastComments = lastComments.slice(0, 2);

  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  const commentTotalDiv = (comment) => (
    <Comment key={comment.id}>
      <CommetIn>
        <FatText text={comment.user.username} />
        {comment.text}
      </CommetIn>
      {isSelf && (
        <DeleteDiv>
          <Delete_12 onClick={() => onDeleteComment(comment.id)} />
        </DeleteDiv>
      )}
    </Comment>
  );

  return (
    <Post>
      <Header>
        <HeaderL>
          <Link to={`/${username}`}>
            <Avatar size="sm" url={avatar} />
          </Link>
          <UserColumn>
            <Link to={`/${username}`}>
              <FatText text={username} />
            </Link>
            <Location>{location}</Location>
          </UserColumn>
        </HeaderL>
        {isSelf && (
          <HeaderR>
            <Edit
              onClick={() => {
                setEditPostId(id);
                locationInput.setValue(location);
                captionInput.setValue(caption);
                feedCategory.setOption(category);
                setMyTabs(2);
              }}
            />
            <span style={{ width: '15px' }} />
            <Delete onClick={() => onDelete()} />
          </HeaderR>
        )}
      </Header>
      <Files>
        <Swiper {...params}>
          {files &&
            files.map((file, index) => (
              <File
                key={file.id}
                src={file.url}
                showing={index === currentItem}
              />
            ))}
        </Swiper>
      </Files>
      <Meta>
        <Buttons>
          <LikeWrap>
            <Button onClick={toggleLike}>
              {isLiked ? <HeartFull /> : <HeartEmpty />}
            </Button>
            <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
          </LikeWrap>
          <Timestamp>
            {timeGap < gapTerm[0]
              ? `${Math.floor(timeGap / 60000)}분 전`
              : timeGap < gapTerm[1]
              ? `${Math.floor(timeGap / 3600000)}시간 전`
              : Math.floor(timeGap_cut / 86400000) < 8
              ? `${Math.floor(timeGap_cut / 86400000)}일 전`
              : createTime.getFullYear() === nowDate.getFullYear()
              ? `${moment(createdAt).format('MM월 DD일')}`
              : `${moment(createdAt).format('YYYY년 MM월 DD일')}`}
          </Timestamp>
        </Buttons>
        <Caption>
          <FatText margin={'0 5px 0 0'} text={username} />
          {moreBool ? (
            <span>
              {shortCatption}
              <span
                style={{ cursor: 'pointer', color: '#999' }}
                onClick={() => setMoreBool(false)}
              >
                &nbsp;더 보기
              </span>
            </span>
          ) : (
            <span style={{ display: 'inlineBlock', wordWrap: 'break-word' }}>
              {caption}
            </span>
          )}
        </Caption>
        {comments && (
          <Comments>
            {moreComment ? (
              <>
                <span
                  style={{
                    cursor: 'pointer',
                    color: '#999',
                  }}
                  onClick={() => setMoreComment(false)}
                >
                  댓글 {comments.length}개 모두 보기
                </span>
                <div style={{ height: '10px' }} />
                {lastComments.map((comment) => commentTotalDiv(comment))}
              </>
            ) : (
              <>{comments.map((comment) => commentTotalDiv(comment))}</>
            )}
            {selfComments.map((comment) => commentTotalDiv(comment))}
          </Comments>
        )}
        <TextareaWrap>
          {commentLoad && <Loader_lotate position={'absolute'} />}
          <Textarea
            onKeyPress={onKeyPress}
            placeholder={'댓글 달기...'}
            value={newComment.value}
            onChange={newComment.onChange}
          />
        </TextareaWrap>
      </Meta>
    </Post>
  );
};
