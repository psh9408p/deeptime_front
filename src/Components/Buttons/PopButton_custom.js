import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Container = styled.button`
  border: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  margin: ${(props) => props.margin};
  cursor: pointer;
`;

const PopButton = forwardRef(
  (
    {
      type,
      text,
      onClick,
      bgColor,
      color,
      width = '100px',
      height = '100%',
      margin,
    },
    ref,
  ) => {
    return (
      <Container
        ref={ref}
        type={type}
        onClick={onClick}
        width={width}
        height={height}
        margin={margin}
        bgColor={bgColor}
        color={color}
      >
        {text}
      </Container>
    );
  },
);

export default PopButton;
