import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  outline-color: black;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const PopButton = forwardRef(({ type, text, onClick }, ref) => {
  return (
    <Container ref={ref} type={type} onClick={onClick}>
      {text}
    </Container>
  );
});

PopButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PopButton;
