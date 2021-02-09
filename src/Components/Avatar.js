import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const getSize = (size) => {
  let number;
  if (size === 'sm') {
    number = 30;
  } else if (size === 'sm2') {
    number = 40;
  } else if (size === 'md') {
    number = 50;
  } else if (size === 'md2') {
    number = 100;
  } else if (size === 'lg') {
    number = 150;
  }
  return `
        width:${number}px;
        height:${number}px;
        `;
};

const Container = styled.div`
  cursor: ${(props) => props.cursor};
  ${(props) => getSize(props.size)}
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
`;

const Border = styled(Container)`
  border: 4px solid ${(props) => (props.exist ? '#7BD5F5' : 'white')};
  box-shadow: 0 0 0 0 #c7c7c7;
`;

const Animation = keyframes`
    0%{
        border:4px solid #7BD5F5;
    }
    50%{
        border:4px solid white;
    }
    100%{
        border:4px solid #7BD5F5;
    }
`;

const Border_Ani = styled(Border)`
  animation: ${Animation} 2s linear;
  animation-iteration-count: infinite;
`;

const Avatar = ({
  size = 'sm',
  url,
  className,
  onClick,
  cursor = 'normal',
  confirmSet = false,
  exist = false,
  aniBool = false,
}) => {
  if (confirmSet && aniBool) {
    return (
      <Border_Ani
        className={className}
        size={size}
        url={url}
        onClick={onClick}
        cursor={cursor}
        exist={exist}
      />
    );
  } else if (confirmSet) {
    return (
      <Border
        className={className}
        size={size}
        url={url}
        onClick={onClick}
        cursor={cursor}
        exist={exist}
      />
    );
  } else {
    return (
      <Container
        className={className}
        size={size}
        url={url}
        onClick={onClick}
        cursor={cursor}
      />
    );
  }
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'sm2', 'md', 'md2', 'lg']),
  url: PropTypes.string.isRequired,
};

export default Avatar;
