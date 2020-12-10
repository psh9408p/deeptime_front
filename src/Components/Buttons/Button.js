import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.bgColor};
  text-align: center;
  padding: ${(props) => props.padding};
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ text, onClick, bgColor = '#0F4C82', padding = '7px 0' }) => (
  <Container onClick={onClick} bgColor={bgColor} padding={padding}>
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
