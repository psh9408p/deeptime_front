import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.classicBlue};
  text-align: center;
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
`;

const Button = ({ text, onClick, fontSize = '14px' }) => (
  <Container onClick={onClick} fontSize={fontSize}>
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
