import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: black;
  font-weight: 600;
  background-color: #e74c3c;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ type, text, onClick }) => (
  <Container type={type} onClick={onClick}>
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
