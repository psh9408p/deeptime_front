import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';
import { useMutation } from '@apollo/react-hooks';
import {
  TOGGLE_LIKE,
  ADD_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
} from './PostQueries';
import { toast } from 'react-toastify';
import { FEED_ALL_QUERY } from '../../Routes/Feed/FeedQueries';
import ObjectCopy from '../ObjectCopy';

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  isSelf,
  comments,
  createdAt,
  caption,
  location,
  fileKey,
  setMyTabs,
  setEditPostId,
  locationInput,
  captionInput,
  variables,
}) => {
  const checkLineBreak = /\r|\n/;
  let shortCatption = caption.slice(0, 8);
  let morecheck = false;
  const checkResult = checkLineBreak.exec(shortCatption);
  if (checkResult) {
    shortCatption = caption.slice(0, checkResult.index) + '...';
    morecheck = true;
  } else if (caption.length > 15) {
    shortCatption = caption.slice(0, 8) + '...';
    morecheck = true;
  }

  const [commentLoad, setCommentLoad] = useState(false);
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const [moreBool, setMoreBool] = useState(morecheck);
  const [moreComment, setMoreComment] = useState(
    comments.length > 2 ? true : false,
  );
  const comment = useInput('');
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });
  const [deletePostMutation] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: FEED_ALL_QUERY, variables }],
  });
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: FEED_ALL_QUERY, variables }],
  });
  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  const onKeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      try {
        setCommentLoad(true);
        const {
          data: { addComment },
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue('');
      } catch {
        toast.error('댓글을 작성할 수 없습니다.');
      } finally {
        setCommentLoad(false);
      }
    }
  };

  const onDelete = async () => {
    if (window.confirm('정말로 게시물을 삭제하시겠습니까?') === false) {
      return;
    }

    try {
      toast.info('게시물 삭제 중...');
      const {
        data: { deletePost },
      } = await deletePostMutation({
        variables: {
          postId: id,
          fileKey,
        },
      });
      if (!deletePost) {
        alert('게시물을 삭제할 수 없습니다.');
      } else {
        toast.success('게시물이 삭제 되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onDeleteComment = async (commentId) => {
    try {
      const {
        data: { deleteComment },
      } = await deleteCommentMutation({
        variables: {
          commentId,
        },
      });
      if (!deleteComment) {
        alert('댓글을 삭제할 수 없습니다.');
      } else {
        // selfComment 즉석에서 만들어진거 local에서도 지우기
        const checkSelfId = (a) => a.id === commentId;
        const index = selfComments.findIndex(checkSelfId);
        if (index !== -1) {
          const newSelfComments = ObjectCopy(selfComments);
          newSelfComments.splice(index, 1);
          setSelfComments(newSelfComments);
        }
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  return (
    <PostPresenter
      id={id}
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      shortCatption={shortCatption}
      isLiked={isLikedS}
      isSelf={isSelf}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      moreBool={moreBool}
      setMoreBool={setMoreBool}
      onDelete={onDelete}
      setMyTabs={setMyTabs}
      setEditPostId={setEditPostId}
      locationInput={locationInput}
      captionInput={captionInput}
      moreComment={moreComment}
      setMoreComment={setMoreComment}
      onDeleteComment={onDeleteComment}
      commentLoad={commentLoad}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
