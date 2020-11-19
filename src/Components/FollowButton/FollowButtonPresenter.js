import React from 'react';
import Button_custom from '../Buttons/Button_custom';

export default ({ isFollowing, onClick, loading }) => (
  <Button_custom
    text={isFollowing ? '팔로잉' : '팔로우'}
    onClick={onClick}
    bgColor={isFollowing ? '#c7c7c7' : '#7BA9EB'}
    width={'100px'}
    height={'32.5px'}
    margin={'0'}
    color={isFollowing ? 'black' : 'white'}
    loading={loading}
  />
);
