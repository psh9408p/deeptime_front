import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from './FollowButtonPresenter';

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = async () => {
    if (isFollowingS === true) {
      if (window.confirm('정말로 팔로우를 취소하시겠습니까?') === false) {
        return;
      }

      try {
        setLoading(true);
        const {
          data: { unfollow },
        } = await unfollowMutation();
        if (!unfollow) {
          alert('팔로우를 취소할 수 없습니다.');
        } else {
          setIsFollowing(false);
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const {
          data: { follow },
        } = await followMutation();
        if (!follow) {
          alert('팔로우를 추가할 수 없습니다.');
        } else {
          setIsFollowing(true);
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <FollowButtonPresenter
      onClick={onClick}
      isFollowing={isFollowingS}
      loading={loading}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;
