import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-weight: 600;
  text-align: center;
  padding: ${(props) => props.padding};
  font-size: 14px;
  cursor: pointer;
  margin: ${(props) => props.margin};
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
  >
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
