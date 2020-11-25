import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
import FatText from '../FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons';
import moment from 'moment';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
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
  height: 600px;
  /* position: absolute; */
  top: 0;
  /* background-image: url(${(props) => props.src}); */
  background-size: cover;
  background-position: center;
  /* opacity: ${(props) => (props.showing ? 1 : 0)}; */
  /* transition: opacity 0.5s linear; */
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
  span {
    margin-right: 5px;
  }
  p {
    cursor: pointer;
    color: #999;
  }
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption,
  moreBool,
  setMoreBool,
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
  let shortCatption = '';
  if (caption.length > 15) {
    shortCatption = caption.slice(0, 8) + '...';
  }

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

  return (
    <Post>
      <Header>
        <Link to={`/${username}`}>
          <Avatar size="sm" url={avatar} />
        </Link>
        <UserColumn>
          <Link to={`/${username}`}>
            <FatText text={username} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
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
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          {/* <Button>
          <CommentIcon />
        </Button> */}
        </Buttons>
        <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
        <Caption>
          <FatText text={username} />
          {moreBool ? (
            <>
              {shortCatption}
              <p onClick={() => setMoreBool(false)}>&nbsp;더 보기</p>
            </>
          ) : (
            caption
          )}
        </Caption>
        {comments && (
          <Comments>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
            {selfComments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}
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
        <Textarea
          onKeyPress={onKeyPress}
          placeholder={'댓글 달기...'}
          value={newComment.value}
          onChange={newComment.onChange}
        />
      </Meta>
    </Post>
  );
};
