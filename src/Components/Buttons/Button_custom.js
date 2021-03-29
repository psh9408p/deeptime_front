import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-weight: 600;
  text-align: center;
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
  margin: ${(props) => props.margin};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 3px solid #00ff0000; /* Light grey */
  border-top: 3px solid #555;
  border-bottom: 3px solid #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`;

const Button = ({
  text,
  onClick,
  width = '50px',
  height = '30px',
  margin = '0 0 0 20px',
  padding = '7px 0px',
  bgColor = '#efefef',
  color = 'black',
  fontSize = '14px',
  loading = false,
}) => (
  <Container
    type="button"
    onClick={onClick}
    width={width}
    height={height}
    margin={margin}
    padding={padding}
    bgColor={bgColor}
    color={color}
    fontSize={fontSize}
  >
    {loading ? <Loader /> : text}
  </Container>
);

export default Button;
