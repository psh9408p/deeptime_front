import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  border: 0;
  width: 100px;
  height: 35px;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 12px;
  outline-color: black;
  margin: 0px 0px 7px 10px;
  cursor: pointer;
`;

const PopButton_auth = forwardRef(({ type, text, onClick }, ref) => {
  return (
    <Container ref={ref} type={type} onClick={onClick}>
      {text}
    </Container>
  );
});

PopButton_auth.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PopButton_auth;
